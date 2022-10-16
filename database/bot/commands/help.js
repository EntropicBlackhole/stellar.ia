const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { codeBlock } = require("@discordjs/builders");
const functions = require('../functions');
const path = require('node:path');
const fs = require('fs');

module.exports = {
	name: "Help",
	description: "Shows this description of commands!",
	usage: "None",
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Shows this description of commands!"),
	async execute(interaction, client) {
		const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));
		const helpEmbed = new EmbedBuilder()
			.setTitle('List of commands!')
			.setColor(functions.randomColor())
			.setTimestamp()
			.setFooter({ text: "Please report any bugs! Thanks! ^^", iconURL: client.user.avatarURL() });
		for (const file of commandFiles) {
			const filePath = path.join(__dirname, file);
			const command = require(filePath);
			helpEmbed.addFields([{
				name: command.name,
				value: codeBlock(`Description: ${command.description}\nUsage: ${command.usage}`)
			}])
		}
		interaction.reply({ embeds: [helpEmbed] })
	}
}