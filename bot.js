console.log('Beep beep!');

const Discord = require('discord.js');
const fs = require('fs');

const { MessageEmbed } = require('discord.js');

let discordkey = "";

try {
    const data = fs.readFileSync('./discordkey.txt', 'utf8');
    discordkey = data;
  } catch (err) {
    console.error(err);
  }

const client = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]});

client.login(discordkey);

client.on('ready', readyDiscord);
function readyDiscord() {
    console.log('<3');
}

const commandHandler = require("./commands");

client.on('message', commandHandler);
