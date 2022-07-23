console.log('Beep beep!');

const Discord = require('discord.js');
const fs = require('fs');
const got = require('got');
const jsdom = require("jsdom");
const schedule = require("node-schedule");
const fetch = require("node-fetch-commonjs");
const { MessageEmbed } = require('discord.js');

let discordkey = "";
let tenorkey = "";
let voteid = "";

try {
    const data = fs.readFileSync('../discordkey.txt', 'utf8');
    discordkey = data;
  } catch (err) {
    console.error(err);
  }

  try {
    const data = fs.readFileSync('../tenorkey.txt', 'utf8');
    tenorkey = data;
  } catch (err) {
    console.error(err);
  }

  try {
    const data = fs.readFileSync('../voteid.txt', 'utf8');
    voteid = data.toString();
  } catch (err) {
    console.error(err);
  }

const { JSDOM } = jsdom;
let dom;
const vgmUrl= 'http://www.bolyaigimnazium.elte.hu/index.php/szuloknek/program3/month.calendar';
const client = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]});

client.login(discordkey);

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

async function gotMessage(msg) {
    if (msg.content === 'nextevent') {
        
        let valasz = 'A következő esemény időpontja:\n';

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
    } else if (msg.content.startsWith("!gif")) {
        let tokens = msg.content.split(" ");
        let keywords = "office";

        if (tokens.length > 1) {
            keywords = tokens.slice(1, tokens.length).join(" ");
        }

        let url = `https://g.tenor.com/v1/search?q=${keywords}&key=${tenorkey}&contentfilter=medium`;
        let response = await fetch(url);
        let json = await response.json();
        let index = Math.floor(Math.random() * json.results.length);

        msg.channel.send(json.results[index].url);
    } else if (msg.content.startsWith("!votestart")) {
        let kerdesszavak = msg.content.split(" ");
        let kerdes = "Ez egy próba?";

        if(kerdesszavak.length > 1) {
            kerdes = kerdesszavak.slice(1, kerdesszavak.length).join(" ");
        }
        
        let szavazas = kerdes + " IGEN: :white_check_mark: , NEM: :x:";

        msg.delete();
        
        let vchannel = client.channels.cache.get(voteid);
        vchannel.send(szavazas).then(function(message){
            message.react("✅")
            .then(message.react("❌"))
        });
    } else if (msg.content.includes('Zolibá')) {
        msg.reply('Jól van, gyerekek...');
    } else if (msg.content.endsWith('?')) {
        msg.reply('Fogalmam sincs!');
    }
}
