import { rpsCollection } from '../utils/database.js';

export async function showRPSLeaderboard(message) {
    const leaders = await rpsCollection.getLeaderboard();
    
    if (!leaders.length) {
        return message.reply('Még senki nem játszott RPS-t a szerveren.');
    }

    const leaderboardText = leaders.map((player, index) => 
        `${index + 1}. **${player.username}**\n` +
        `   🏆 ${player.wins} nyert | 🤝 ${player.draws} döntetlen | 💔 ${player.losses} vesztett\n` +
        `   📊 Nyerési arány: ${player.winRate.toFixed(1)}%`
    ).join('\n\n');

    await message.reply(`🏆 **RPS Ranglista**\n\n${leaderboardText}`);
}