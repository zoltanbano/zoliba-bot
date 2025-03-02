const config = require('../config/config');

class GifCommand {
    async execute(message) {
        const tokens = message.content.split(" ");
        const keywords = tokens.length > 1 ? tokens.slice(1).join(" ") : "office";
        
        try {
            const url = `https://g.tenor.com/v1/search?q=${encodeURIComponent(keywords)}&key=${config.tenor.apiKey}&contentfilter=medium`;
            const response = await fetch(url); // Using native fetch
            const json = await response.json();
            
            if (!json.results?.length) {
                return message.channel.send('Nem találtam GIF-et a megadott kulcsszóra.');
            }

            const index = Math.floor(Math.random() * json.results.length);
            return message.channel.send(json.results[index].url);
        } catch (error) {
            console.error('Error fetching GIF:', error);
            return message.channel.send('Hiba történt a GIF lekérése közben.');
        }
    }
}

module.exports = new GifCommand();
