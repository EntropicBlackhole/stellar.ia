const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const fetch = require("node-fetch");
const functions = require('../functions');
const { NASA_API_KEY } = require('../config.json');
const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`

module.exports = {
	name: "APOD",
	description: "Shows you the Astronomy Picture Of the Day!",
	usage: "None",
	data: new SlashCommandBuilder()
		.setName('apod')
		.setDescription('Astronomy picture of the day'),
	async execute(interaction, client) {
		// await interaction.deferReply();
		let data = await fetch(url).then(res => res.json());
		const apodEmbed = new EmbedBuilder()
			.setTitle(data.title)
			//.setAuthor({ text: "Astronomy Picture of The Day" })
			.addFields([{
				name: "Explanation",
				value: functions.shortenText(data.explanation, ". ", 1024)
			}])
			.setImage(data.hdurl)
			.setColor(functions.randomColor())
			.setTimestamp()
			.setFooter({ text: "Please report any bugs! Thanks! ^^", iconURL: client.user.avatarURL() });
		interaction.reply({
			embeds: [apodEmbed]
		})
	}
}