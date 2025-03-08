import config from '../config/config.js';

const strings = config.language.strings.commands.numberGame;

class NumberGame {
    constructor() {
        this.random = this.generateNumber();
    }

    generateNumber() {
        return Math.floor(Math.random() * 10) + 1;
    }

    handleStart(message) {
        return message.channel.send(`${strings.start}`);
    }

    handleGuess(message) {
        const guess = parseInt(message.content.split(' ')[1]);
        
        if (isNaN(guess)) {
            return message.channel.send(`${strings.enterNumber}`);
        }

        if (guess === this.random) {
            this.random = this.generateNumber();
            return message.channel.send(`${strings.victory}`);
        }

        return message.channel.send(guess < this.random ? `${strings.higher}` : `${strings.lower}`);
    }
}

export default new NumberGame();
