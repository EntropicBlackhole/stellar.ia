const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const functions = require('../functions');
const { codeBlock } = require("@discordjs/builders");
const fetch = require("node-fetch");

module.exports = {
	name: "Planets",
	description: "Show all the positions of the planets, Sun and Moon included, given a latitude and a longitude! Not sure what they are? https://www.gps-coordinates.net/my-location",
	usage: "None",
	data: new SlashCommandBuilder()
		.setName('planets')
		.setDescription('See the Sun, Moon and planet\'s positions given a latitude and longitude')
		.addNumberOption(option => option
			.setName('latitude')
			.setDescription('Your latitude!')
			.setMinValue(-90)
			.setMaxValue(90)
			.setRequired(true))
		.addNumberOption(option => option
			.setName('longitude')
			.setDescription('Your longitude')
			.setMinValue(-180)
			.setMaxValue(180)
			.setRequired(true)),
	async execute(interaction, client) {
		await interaction.deferReply()
		var latitude = interaction.options.getNumber('latitude');
		var longitude = interaction.options.getNumber('longitude');
		var url = `https://visible-planets-api.herokuapp.com/v3?latitude=${latitude}&longitude=${longitude}}`
		let data = await fetch(url).then(res => res.json());
		const planetEmbed = new EmbedBuilder()
			.setTitle(`Planets visible at ${latitude} and ${longitude}`)
			.setDescription(data.meta.time.split("T")[0] + " at " + data.meta.time.split("T")[1].split("+")[0] + " UTC")
			.setColor(functions.randomColor())
			.setTimestamp()
			.setFooter({ text: "Please report any bugs! Thanks! ^^", iconURL: client.user.avatarURL() });
		for (body of data.data) {
			out = "";
			out += (`Constellation: ${body.constellation}\n`)
			out += (`Altitude: ${body.altitude.toFixed(5)}\n`)
			out += (`Azimuth: ${body.azimuth.toFixed(5)}\n`)
			out += (`Magnitude: ${body.magnitude.toFixed(5)}\n`)
			out += (`Is visible to the naked eye: ${body.nakedEyeObject ? "Yes" : "No"}`)
			let fieldValue = codeBlock(out);
			planetEmbed.addFields([{ name: body.name, value: fieldValue }]);
		}
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('show-more-planets-visible')
					.setLabel('Show advanced info')
					.setStyle(ButtonStyle.Primary),
			);
		let cache = JSON.parse(fs.readFileSync('./database/bot/cache.json', 'utf8'))
		if (!cache[interaction.channel.id]) cache[interaction.channel.id] = {};
		cache[interaction.channel.id].planets_visible = data;
		fs.writeFileSync('./database/bot/cache.json', JSON.stringify(cache, null, 2))
		await interaction.editReply({ content: `All planets visible in the sky!`, embeds: [planetEmbed], components: [row] });

		client.on('interactionCreate', async interaction => {
			if (!interaction.isButton()) return;
			if (interaction.customId == 'show-more-planets-visible') {
				await interaction.reply({ content: 'Showing more advanced data!', ephemeral: true })
				let data = JSON.parse(fs.readFileSync('./database/bot/cache.json', 'utf8'))[interaction.channel.id].planets_visible;
				// console.log(data)
				const planetEmbed = new EmbedBuilder()
					.setTitle(`Planets visible at ${latitude} and ${longitude}`)
					.setDescription(data.meta.time.split("T")[0] + " at " + data.meta.time.split("T")[1].split("+")[0] + " UCT")
					.setColor(functions.randomColor())
					.setTimestamp()
					.setFooter({ text: "Please report any bugs! Thanks! ^^", iconURL: client.user.avatarURL() });
				for (body of data.data) {
					out = "";
					out += (`Name: ${body.name}`)
					out += (`\nConstellation: ${body.constellation}`)
					out += (`\nRight Ascension:`)
					out += (`\n-Negative: ${body.rightAscension.negative}`)
					out += (`\n-Hours: ${body.rightAscension.hours}`)
					out += (`\n-Minutes: ${body.rightAscension.minutes}`)
					out += (`\n-Seconds: ${body.rightAscension.seconds}`)
					out += (`\n-Raw: ${body.rightAscension.raw}`)
					out += (`\nDeclination:`)
					out += (`\n-Negative: ${body.declination.negative}`)
					out += (`\n-Degrees: ${body.declination.degrees}`)
					out += (`\n-Arc Minutes: ${body.declination.arcminutes}`)
					out += (`\n-Arc Seconds: ${body.declination.arcseconds}`)
					out += (`\n-Raw: ${body.declination.raw}`)
					out += (`\nAltitude: ${body.altitude}`)
					out += (`\nAzimuth: ${body.azimuth}`)
					out += (`\nAbove Horizon: ${body.aboveHorizon}`)
					out += (`\nMagnitude: ${body.magnitude}`)
					out += (`\nNaked Eye Object: ${body.nakedEyeObject}`)
					let fieldValue = codeBlock(out);
					planetEmbed.addFields([{ name: body.name, value: fieldValue }]);
				}
				await interaction.editReply({ embeds: [planetEmbed], ephemeral: true });
			}
		});
	},
};

