const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const fetch = require("node-fetch");
const { codeBlock } = require("@discordjs/builders");
const functions = require('../functions');
const { NASA_API_KEY } = require('../config.json');
const todayDate = new Date().toISOString().split("T")[0];
const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${todayDate}&end_date=${todayDate}&api_key=${NASA_API_KEY}`;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('neo')
		.setDescription('Near earth objects'),
	async execute(interaction, client) {
		interaction.reply("There's just alot hold on");
		let data = await fetch(url).then((res) => res.json());
		// console.log(data)
		//  console.log(data.near_earth_objects["2022-10-16"])

		const neoEmbed = new EmbedBuilder()
			.setTitle("Current Near Earth Objects")
			.setColor(functions.randomColor);

		data.near_earth_objects[todayDate].forEach((value) => {
			let rawValue = `Name: ${value.name}\nDiameter: ${value.estimated_diameter.kilometers.estimated_diameter_min
				} KM\nVelocity: ${~~value.close_approach_data[0].relative_velocity
					.kilometers_per_second} km/s\nMissed By: ${~~value
						.close_approach_data[0].miss_distance.kilometers} KM\nOrbiting Body: ${value.close_approach_data[0]?.orbiting_body
				}\nis hazardous?: ${value.is_potentially_hazardous_asteroid ? "Yes" : "No"
				}`;

			let fieldValue = codeBlock(rawValue);

			neoEmbed.addFields([{name: value.name, value: fieldValue}]);
		});

		interaction.editReply({
			content: "There!",
			embeds: [neoEmbed],
		});
	}
}