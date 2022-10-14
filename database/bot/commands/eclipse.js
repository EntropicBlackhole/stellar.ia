const { SlashCommandBuilder } = require('discord.js');
const functions = require('../functions');
const Astronomy = require('astronomy-engine/astronomy.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('eclipse')
		.setDescription('Outputs the next eclipse (solar/lunar) after a given date or current date')
		.addSubcommand(subcommand => subcommand
			.setName('solar-local')
			.setDescription('Local solar eclipses!')
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
				.setRequired(true))
			.addStringOption(option => option
				.setName('sol-loc-date')
				.setDescription('Input a date if you wanna see the next eclipse after that date')
			))
		.addSubcommand(subcommand => subcommand
			.setName('solar-global')
			.setDescription('Global solar eclipses!')
			.addStringOption(option => option
				.setName('sol-glo-date')
				.setDescription('Input a date if you wanna see the next eclipse after that date')
			))
		.addSubcommand(subcommand => subcommand
			.setName('lunar')
			.setDescription('Lunar eclipses!')
			.addStringOption(option => option 
				.setName('lun-date')
				.setDescription('Input a date if you wanna see the next eclipse after that date')
			)),
	async execute(interaction) {
		// await interaction.reply('WIP');
		let subCommand = interaction.options.getSubcommand()
		if (subCommand == 'solar-local') {
			const date = (interaction.options.getString('sol-loc-date') != undefined) ? functions.ParseDate(interaction.options.getString('sol-loc-date')) : new Date();
			let latitude = interaction.options.getNumber('latitude')
			let longitude = interaction.options.getNumber('longitude')
			const observer = new Astronomy.Observer(latitude, longitude, 0);
			let eclipse = Astronomy.SearchLocalSolarEclipse(date, observer);
			return interaction.reply(functions.printEclipse(eclipse, 'solar-local'));
		}
		else if (subCommand == 'solar-global') {
			const date = (interaction.options.getString('sol-glo-date') != undefined) ? functions.ParseDate(interaction.options.getString('sol-glo-date')) : new Date();
			let eclipse = Astronomy.SearchGlobalSolarEclipse(date);
			return interaction.reply(functions.printEclipse(eclipse, 'solar-global'));
		}
		else if (subCommand == 'lunar') {
			const date = (interaction.options.getString('lun-date') != undefined) ? functions.ParseDate(interaction.options.getString('lun-date')) : new Date();
			let eclipse = Astronomy.SearchLunarEclipse(date)
			return interaction.reply(functions.printEclipse(eclipse, 'lunar'))
		}

	},
};

// function printEclipse(e) {
// 	let out = ""
// 	// Calculate beginning/ending of different phases
// 	// of an eclipse by subtracting/adding the peak time
// 	// with the number of minutes indicated by the "semi-duration"
// 	// fields sd_partial and sd_total.
// 	const MINUTES_PER_DAY = 24 * 60;

// 	const p1 = e.peak.AddDays(-e.sd_partial / MINUTES_PER_DAY);
// 	out += (`${FormatDate(p1)} - Partial eclipse begins.\n`);

// 	if (e.sd_total > 0) {
// 		const t1 = e.peak.AddDays(-e.sd_total / MINUTES_PER_DAY);
// 		out += (`${FormatDate(t1)} - Total eclipse begins.\n`);
// 	}

// 	out += (`${FormatDate(e.peak)} - Peak of ${e.kind} eclipse.\n`);

// 	if (e.sd_total > 0) {
// 		const t2 = e.peak.AddDays(+e.sd_total / MINUTES_PER_DAY);
// 		out += (`${FormatDate(t2)} - Total eclipse ends.\n`);
// 	}

// 	const p2 = e.peak.AddDays(+e.sd_partial / MINUTES_PER_DAY);
// 	out += (`${FormatDate(p2)} - Partial eclipse ends.\n`);
// 	out += '\n';
// }