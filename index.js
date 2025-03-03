import { Client, GatewayIntentBits } from 'discord.js';
import config from './config/config.js';
import commandHandler from './commandHandler.js';
import { connectDB } from './utils/database.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Initialize bot and database
async function init() {
    try {
        await connectDB();
        console.log('Connected to MongoDB successfully');
        
        await client.login(config.discord.token);
        console.log('Bot logged in successfully');
    } catch (error) {
        console.error('Initialization error:', error);
        process.exit(1);
    }
}

client.once('ready', () => {
    console.log('Bot is ready!');
});

client.on('messageCreate', async message => {
    try {
        await commandHandler.handle(message, client);
    } catch (error) {
        console.error('Error handling command:', error);
    }
});

init();
