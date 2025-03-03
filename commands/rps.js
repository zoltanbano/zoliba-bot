import { rpsCollection } from '../utils/database.js';

function getWinner(playerChoice, botChoice) {
    if (playerChoice === botChoice) {
        return 'Döntetlen! 🤝';
    }
    
    const winConditions = {
        'kő': 'olló',
        'papír': 'kő',
        'olló': 'papír'
    };
    
    return winConditions[playerChoice] === botChoice ? 
        'Nyertél! 🎉' : 
        'Vesztettél! 😎';
}

export async function playRPS(message, args) {
    const choices = ['kő', 'papír', 'olló'];
    const choice = args[0]?.toLowerCase();

    if (!choices.includes(choice)) {
        return message.reply('Használat: !rps <kő/papír/olló>');
    }

    const botChoice = choices[Math.floor(Math.random() * choices.length)];
    const result = getWinner(choice, botChoice);
    
    // Simplified result mapping
    let scoreResult;
    if (result.includes('Nyertél')) {
        scoreResult = 'win';
    } else if (result.includes('Döntetlen')) {
        scoreResult = 'draw';
    } else {
        scoreResult = 'loss';
    }

    // Add debug logging
    console.log(`Game Result - Player: ${choice}, Bot: ${botChoice}, Result: ${result}, Score: ${scoreResult}`);
    
    await rpsCollection.updateScore(
        message.author.id,
        message.author.username,
        scoreResult
    );

    const userScore = await rpsCollection.getScore(message.author.id);
    console.log('Updated Score:', userScore); // Debug log

    await message.reply(
        `🎮 **RPS Eredmény**\n` +
        `> Te: ${choice}\n` +
        `> Én: ${botChoice}\n` +
        `> ${result}\n\n` +
        `📊 **Statisztikád**\n` +
        `Nyert: ${userScore.wins} | Döntetlen: ${userScore.draws} | Vesztett: ${userScore.losses}`
    );
}