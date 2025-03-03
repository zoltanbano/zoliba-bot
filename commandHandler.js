import numberGame from './commands/numberGame.js';
import gifCommand from './commands/gif.js';
import votingCommand from './commands/voting.js';
import { playRPS } from './commands/rps.js';
import { showRPSScore } from './commands/rpsScore.js';
import { showRPSLeaderboard } from './commands/rpsLeaderboard.js';

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

        if (content === '!rps') {
            return message.reply('Használat: !rps <kő/papír/olló>');
        }

        if (content.startsWith('!rps ')) {
            const args = content.split(' ').slice(1);
            await playRPS(message, args);
            return;
        }

        if (content === '!rpsscore') {
            await showRPSScore(message);
            return;
        }

        if (content === '!rpsrank') {
            await showRPSLeaderboard(message);
            return;
        }

        // Handle question mark responses last
        if (message.content.endsWith('?')) {
            return message.reply('Fogalmam sincs!');
        }
    }
}

export default new CommandHandler();
