import { rpsCollection } from '../utils/database.js';
import config from '../config/config.js';

const strings = config.language.strings.commands.rps;

export async function showRPSScore(message) {
    const score = await rpsCollection.getScore(message.author.id);
    
    if (!score) {
        return message.reply(`${strings.noGames}`);
    }

    const total = score.wins + score.losses + score.draws;
    const winRate = ((score.wins / total) * 100).toFixed(1);

    await message.reply(
        `🎮 **${message.author.username} ${strings.stats.title}**\n\n` +
        `✨ ${strings.stats.wins}: ${score.wins}\n` +
        `🤝 ${strings.stats.draws}: ${score.draws}\n` +
        `💔 ${strings.stats.losses}: ${score.losses}\n` +
        `📊 ${strings.stats.winRate}: ${winRate}%`
    );
}