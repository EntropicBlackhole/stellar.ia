const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { codeBlock } = require("@discordjs/builders");
const functions = require('../functions');
const Astronomy = require('astronomy-engine/astronomy.js');

module.exports = {
	name: "Seasons",
	description: "Shows the start of each season given a year! The year is required btw",
	usage: "<year>",
	data: new SlashCommandBuilder()
		.setName('seasons')
		.setDescription('Finds the equinoxes and solstices (seasons) for a given calendar year (WIP)')
		.addNumberOption(option => option
			.setName('year')
			.setDescription('Year for what seasons I\'ll display')
			.setRequired(true)),
	async execute(interaction, client) {
		let year = interaction.options.getNumber('year')
		if (!Number.isSafeInteger(year))
			interaction.reply(`ERROR: Not a valid year: "${year}"`);
		let seasons = Astronomy.Seasons(year);
		out = "";
		out += functions.DisplayEvent('March equinox (Spring)', seasons.mar_equinox) + "\n";
		out += functions.DisplayEvent('June solstice (Summer)', seasons.jun_solstice) + "\n";
		out += functions.DisplayEvent('September equinox (Fall)', seasons.sep_equinox) + "\n";
		out += functions.DisplayEvent('December solstice (Winter)', seasons.dec_solstice);
		const seasonEmbed = new EmbedBuilder()
			.setTitle('Seasons!')
			.setDescription(codeBlock(out))
			.setColor(functions.randomColor())
			.setTimestamp()
			.setFooter({ text: "Please report any bugs! Thanks! ^^", iconURL: client.user.avatarURL() });
		interaction.reply({ embeds: [seasonEmbed] });
	},
}; 
