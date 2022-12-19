const config = require('./database/bot/config.json');
const fs = require('node:fs');
const path = require('node:path');
const Discord = require('discord.js');
const client = new Discord.Client({
	intents: [
		Discord.GatewayIntentBits.Guilds,
		Discord.GatewayIntentBits.GuildMessages,
		Discord.GatewayIntentBits.GuildMembers,
		Discord.GatewayIntentBits.MessageContent,
		Discord.GatewayIntentBits.DirectMessages
	]
});
const commands = [];
const commandsPath = path.join(__dirname, './database/bot/commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
client.commands = new Discord.Collection();

// Deploying commands 
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
}
const rest = new Discord.REST({ version: '10' }).setToken(config.token);
rest.put(Discord.Routes.applicationCommands(config.clientId), { body: commands })
	.then(data => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);

//Deployed all commands

client.once("ready", () => {
	console.log(client.user.tag + " is online!");
});

client.on('interactionCreate', async interaction => {
	var d = new Date();
	var n = d.toLocaleString();
	console.log(interaction.user.id + "|" + n)
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction, client);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(config.token);