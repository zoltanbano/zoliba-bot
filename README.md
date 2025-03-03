# Zolibá megmondja Discord BOT

## General Information

This is a simple Discord bot for my server that provides various interactive features and commands.

## Features

### Question Responses
- Replies "Fogalmam sincs!" to any message ending with "?"

### Number Game (!start, !tipp)
- Start a new number guessing game with `!start`
- Guess numbers using `!tipp <number>`
- Bot provides feedback if the guess is too high or too low

### GIF Command (!gif)
- Use `!gif <search term>` to get a random GIF related to your search

### Voting System (!votestart)
- Create yes/no polls using `!votestart <question>`
- Automatically adds ✅ and ❌ reactions for voting
- Polls are posted in a dedicated voting channel

### Rock Paper Scissors (!rps, !rpsscore, !rpsrank)
- Play rock paper scissors with `!rps <kő/papír/olló>`
- View personal statistics with `!rpsscore`
- Check server leaderboard with `!rpsrank`
- Persistent score tracking with MongoDB
- Real-time statistics and rankings

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Configure your `config.js` with:
   - Discord bot token
   - Voting channel ID
   - Tenor API key
4. Configure `config/database.js` with:
   - MongoDB Atlas connection string
   - Database name
5. Start the bot: `npm start`

## Technologies

- JavaScript/Node.js
- Discord.js
- MongoDB Atlas

## Contact

Created by Zoltan Bano
banozoltan@gmail.com