class NumberGame {
    constructor() {
        this.random = this.generateNumber();
    }

    generateNumber() {
        return Math.floor(Math.random() * 10) + 1;
    }

    handleStart(message) {
        return message.channel.send('Gondoltam egy számra 1 és 10 között. Találd ki, melyik az! Tippelni a !tipp utasítás után tudsz. (pl: !tipp 9) Hajrá!');
    }

    handleGuess(message) {
        const guess = parseInt(message.content.split(' ')[1]);
        
        if (isNaN(guess)) {
            return message.channel.send('Kérlek adj meg egy számot!');
        }

        if (guess === this.random) {
            this.random = this.generateNumber();
            return message.channel.send('Gratulálok! Kitaláltad a számot! Jutalmad egy képzeletbeli vállonveregetés!');
        }

        return message.channel.send(guess < this.random ? 'Ennél nagyobb számra gondoltam.' : 'Ennél kisebb számra gondoltam.');
    }
}

module.exports = new NumberGame();
