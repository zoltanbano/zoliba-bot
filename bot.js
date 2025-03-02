console.log('Beep beep!');

const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const fs = require('fs');

let discordkey = "";

try {
    const data = fs.readFileSync('./discordkey.txt', 'utf8');
    discordkey = data;
} catch (err) {
    console.error(err);
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.login(discordkey);

client.on('ready', readyDiscord);
function readyDiscord() {
    console.log('<3');
}

const commandHandler = require("./commands");

client.on('messageCreate', commandHandler);
