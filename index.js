const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config/config');
const commandHandler = require('./commandHandler');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log('Bot is ready!');
});

client.on('messageCreate', async message => {
    try {
        await commandHandler.handle(message, client);
    } catch (error) {
        console.error('Error handling command:', error);
    }
});

client.login(config.discord.token);
