const numberGame = require('./commands/numberGame');
const gifCommand = require('./commands/gif');
const votingCommand = require('./commands/voting');

class CommandHandler {
    async handle(message, client) {
        if (message.author.bot) return;

        const content = message.content.toLowerCase();

        // Handle commands first
        if (content === '!start') {
            return numberGame.handleStart(message);
        }
        
        if (content.startsWith('!tipp')) {
            return numberGame.handleGuess(message);
        }
        
        if (content.startsWith('!gif')) {
            return gifCommand.execute(message);
        }
        
        if (content.startsWith('!votestart')) {
            return votingCommand.execute(message, client);
        }

        // Handle question mark responses last
        if (message.content.endsWith('?')) {
            return message.reply('Fogalmam sincs!');
        }
    }
}

module.exports = new CommandHandler();
