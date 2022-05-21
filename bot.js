console.log('Beep beep!');

const Discord = require('discord.js');
const fs = require('fs');
const got = require('got');
const jsdom = require("jsdom");
const schedule = require("node-schedule");
const { JSDOM } = jsdom;
let dom;
const vgmUrl= 'http://www.bolyaigimnazium.elte.hu/index.php/szuloknek/program3/month.calendar';
const client = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]});
client.login('OTc1MDI0NTkxODQxOTQ3Njc4.GF3egj.Mo06l6h2c2Kb7Mvk5aJC8nJN1fiRuicNKPo5UM');

client.on('ready', readyDiscord);
function readyDiscord() {
    console.log('<3');
}

got(vgmUrl).then(response => {
    dom = new JSDOM(response.body);
}).catch(err => {
    console.log(err);
});

client.on('message', gotMessage);

function gotMessage(msg) {
    if (msg.content.endsWith('?')) {
        msg.reply('Fogalmam sincs!');
    } else if (msg.content.includes('Zolibá')) {
        msg.reply('Jól van, gyerekek...');
    } else if (msg.content === 'nextevent') {
        
        let valasz = 'A következő esemény időpontja:\n'

        let datumok = dom.window.document.querySelectorAll('.mod_events_latest_first .mod_events_latest_date');
        datumok.forEach(n => {
            valasz += n.textContent;
            if (datumok.length > 1 && !valasz.includes('-')) {
                valasz += " - ";
            }
        });
        valasz += '\nAz esemény neve:\n';
        let esemeny = dom.window.document.querySelectorAll('.mod_events_latest_first .mod_events_latest_content');
        esemeny.forEach(n => {
            valasz += n.textContent;
        });
        msg.reply(valasz);
    }
}
