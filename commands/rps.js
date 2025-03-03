export async function playRPS(message, args) {
    const choices = ['kő', 'papír', 'olló'];
    const choice = args[0]?.toLowerCase();

    if (!choices.includes(choice)) {
        return message.reply('Használat: !rps <kő/papír/olló>');
    }

    const botChoice = choices[Math.floor(Math.random() * choices.length)];
    
    const result = getWinner(choice, botChoice);
    const emoji = getEmoji(result);

    await message.reply(`${emoji}\n> Te: ${choice}\n> Én: ${botChoice}\n> ${result}`);
}

function getWinner(playerChoice, botChoice) {
    if (playerChoice === botChoice) return 'Döntetlen! 🤝';
    
    if (
        (playerChoice === 'kő' && botChoice === 'olló') ||
        (playerChoice === 'papír' && botChoice === 'kő') ||
        (playerChoice === 'olló' && botChoice === 'papír')
    ) {
        return 'Nyertél! 🎉';
    }
    
    return 'Én nyertem! 😎';
}

function getEmoji(result) {
    if (result.includes('Nyertél')) return '🎮';
    if (result.includes('nyertem')) return '🤖';
    return '🎲';
}