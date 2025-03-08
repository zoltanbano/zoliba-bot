import { rpsCollection } from '../utils/database.js';
import config from '../config/config.js';

const strings = config.language.strings.commands.rps;

function getWinner(playerChoice, botChoice) {
    if (playerChoice === botChoice) {
        return strings.draw;
    }
    
    const winConditions = {};
    winConditions[strings.choices[0]] = strings.choices[2]; // rock beats scissors
    winConditions[strings.choices[1]] = strings.choices[0]; // paper beats rock
    winConditions[strings.choices[2]] = strings.choices[1]; // scissors beats paper
    
    return winConditions[playerChoice] === botChoice ? strings.win : strings.loss;
}

export async function playRPS(message, args) {
    const choice = args[0]?.toLowerCase();

    if (!strings.choices.includes(choice)) {
        return message.reply(strings.usage);
    }

    const botChoice = strings.choices[Math.floor(Math.random() * strings.choices.length)];
    const result = getWinner(choice, botChoice);
    
    let scoreResult;
    if (result === strings.win) {
        scoreResult = 'win';
    } else if (result === strings.draw) {
        scoreResult = 'draw';
    } else {
        scoreResult = 'loss';
    }
    
    await rpsCollection.updateScore(
        message.author.id,
        message.author.username,
        scoreResult
    );

    const userScore = await rpsCollection.getScore(message.author.id);

    await message.reply(
        `🎮 ${strings.stats.title}\n` +
        `> ${strings.you}: ${choice}\n` +
        `> ${strings.me}: ${botChoice}\n` +
        `> ${result}\n\n` +
        `📊 **${strings.stats.title}**\n` +
        `${strings.stats.wins}: ${userScore.wins} | ` +
        `${strings.stats.draws}: ${userScore.draws} | ` +
        `${strings.stats.losses}: ${userScore.losses}`
    );
}