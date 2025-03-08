import { rpsCollection } from '../utils/database.js';
import config from '../config/config.js';

const strings = config.language.strings.commands.rps;

export async function showRPSLeaderboard(message) {
    const leaders = await rpsCollection.getLeaderboard();
    
    if (!leaders.length) {
        return message.reply(`${strings.leaderboard.nodData}`);
    }

    const leaderboardText = leaders.map((player, index) => 
        `${index + 1}. **${player.username}**\n` +
        `   🏆 ${player.wins} ${strings.stats.wins} | 🤝 ${player.draws} ${strings.stats.draws} | 💔 ${player.losses} ${strings.stats.losses}\n` +
        `   📊 ${strings.stats.winRate}: ${player.winRate.toFixed(1)}%`
    ).join('\n\n');

    await message.reply(`🏆 **${strings.leaderboard.title}**\n\n${leaderboardText}`);
}