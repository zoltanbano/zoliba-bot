import { rpsCollection } from '../utils/database.js';

export async function showRPSScore(message) {
    const score = await rpsCollection.getScore(message.author.id);
    
    if (!score) {
        return message.reply('Még nem játszottál RPS-t. Próbáld ki: `!rps <kő/papír/olló>`');
    }

    const total = score.wins + score.losses + score.draws;
    const winRate = ((score.wins / total) * 100).toFixed(1);

    await message.reply(
        `🎮 **${message.author.username} RPS Statisztika**\n\n` +
        `✨ Nyert: ${score.wins}\n` +
        `🤝 Döntetlen: ${score.draws}\n` +
        `💔 Vesztett: ${score.losses}\n` +
        `📊 Nyerési arány: ${winRate}%`
    );
}