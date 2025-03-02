require('dotenv').config();

module.exports = {
    discord: {
        token: process.env.DISCORD_TOKEN,
        voteChannelId: process.env.VOTE_CHANNEL_ID
    },
    tenor: {
        apiKey: process.env.TENOR_API_KEY
    }
};
