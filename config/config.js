import 'dotenv/config';
import { languages } from './languages.js';

const selectedLanguage = process.env.BOT_LANGUAGE || 'Hungarian';

if (!languages[selectedLanguage]) {
    throw new Error(`Invalid language: ${selectedLanguage}. Supported languages: ${Object.keys(languages).join(', ')}`);
}

export default {
    discord: {
        token: process.env.DISCORD_TOKEN,
        voteChannelId: process.env.VOTE_CHANNEL_ID
    },
    tenor: {
        apiKey: process.env.TENOR_API_KEY
    },
    language: {
        current: selectedLanguage,
        strings: languages[selectedLanguage]
    }
};
