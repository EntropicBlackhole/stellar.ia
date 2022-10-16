const { SlashCommandBuilder } = require('discord.js');
const functions = require('../functions');
const Astronomy = require('astronomy-engine/astronomy.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('seasons')
		.setDescription('Finds the equinoxes and solstices (seasons) for a given calendar year (WIP)')
		.addNumberOption(option => option
			.setName('year')
			.setDescription('Year for what seasons I\'ll display')
			.setRequired(true)),
	async execute(interaction) {
		let year = interaction.options.getNumber('year')
		if (!Number.isSafeInteger(year))
			interaction.reply(`ERROR: Not a valid year: "${year}"`);
		let seasons = Astronomy.Seasons(year);
		out = "";
		out += DisplayEvent('March equinox (Spring start)', seasons.mar_equinox) + "\n";
		out += DisplayEvent('June solstice (Summer start', seasons.jun_solstice) + "\n";
		out += DisplayEvent('September equinox (Fall start)', seasons.sep_equinox) + "\n";
		out += DisplayEvent('December solstice (Winter start)', seasons.dec_solstice);
		interaction.reply(out);
	},
}; 

function DisplayEvent(name, evt) {
	let text = evt ? evt.date.toISOString() : '';
	return (name.padEnd(32) + ' : ' + functions.ParseDate(text));
}