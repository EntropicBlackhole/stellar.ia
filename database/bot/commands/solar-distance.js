const Astronomy = require('astronomy-engine/astronomy.js');
const { SlashCommandBuilder } = require('discord.js'); 
module.exports = {
	name: "Solar-Distance",
	description: "Shows the distance between a body and the Sun! You can choose between km, miles, or AU (Astronomical Unit, aka the distance of the Sun to the Earth)",
	usage: "<body>",
	data: new SlashCommandBuilder()
		.setName('solar-distance')
		.setDescription('Distance of a planet to the Sun!')
		.addStringOption(option => option
			.setName('planet')
			.setDescription('The planets! (and Pluto)')
			.setRequired(true)
			.addChoices(
				{ name: 'Mercury', value: 'Mercury' },
				{ name: 'Venus', value: 'Venus' },
				{ name: 'Earth', value: 'Earth' },
				{ name: 'Mars', value: 'Mars' },
				{ name: 'Jupiter', value: 'Jupiter' },
				{ name: 'Saturn', value: 'Saturn' },
				{ name: 'Uranus', value: 'Uranus' },
				{ name: 'Neptune', value: 'Neptune' },
				{ name: 'Pluto', value: 'Pluto' },
			))
		.addStringOption(option => option
			.setName('distance-type')
			.setDescription('Km, Miles or AU? (Default is Km)')
			.addChoices(
				{ name: 'km', value: 'kilometers' },
				{ name: 'miles', value: 'miles' },
				{ name: 'AU', value: 'AU' }
			)),
	async execute(interaction, client) {
		var planet = interaction.options.getString('planet')
		var distanceType = interaction.options.getString('distance-type')
		let time = Astronomy.MakeTime(new Date());
		var distance = Astronomy.HelioDistance(planet, time)
		if (distanceType === null) distanceType = 'AU'
		if (distanceType === 'kilometers') distance = distance * 1.496e+8
		else if (distanceType === 'miles') distance = distance * 9.296e+7
		interaction.reply(`${planet} is ${distance.toFixed(4)} ${distanceType} away from ${(planet == 'Uranus' && interaction.user.id == '841822347932598303') ? 'Myanus' : 'the Sun'}!!`)
	}
}
