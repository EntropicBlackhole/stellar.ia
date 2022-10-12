const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('seasons')
		.setDescription('Finds the equinoxes and solstices for a given calendar year (WIP)'),
	async execute(interaction) {
		await interaction.reply('WIP');
		// await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	},
};