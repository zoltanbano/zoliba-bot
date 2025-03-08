import config from '../config/config.js';

const strings = config.language.strings.commands.gif;

class GifCommand {
    async execute(message) {
        const tokens = message.content.split(" ");
        const keywords = tokens.length > 1 ? tokens.slice(1).join(" ") : "the office us";
        
        try {
            const url = `https://g.tenor.com/v1/search?q=${encodeURIComponent(keywords)}&key=${config.tenor.apiKey}&contentfilter=medium`;
            const response = await fetch(url); // Using native fetch
            const json = await response.json();
            
            if (!json.results?.length) {
                return message.channel.send(`${strings.noResults}`);
            }

            const index = Math.floor(Math.random() * json.results.length);
            return message.channel.send(json.results[index].url);
        } catch (error) {
            console.error('Error fetching GIF:', error);
            return message.channel.send(`${strings.error}`);
        }
    }
}

export default new GifCommand();
