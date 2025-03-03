import { ChannelType } from 'discord.js';
import config from '../config/config.js';

class VotingCommand {
    async execute(message, client) {
        await message.delete();
        
        const question = message.content.split(" ").slice(1).join(" ") || "Ez egy próba?";
        const pollMessage = `${question}\nIGEN: :white_check_mark: , NEM: :x:`;
        
        const channel = client.channels.cache.get(config.discord.voteChannelId);
        
        if (!channel || channel.type !== ChannelType.GuildText) {
            return message.author.send('Nem találom a szavazó csatornát!');
        }

        try {
            const votingMessage = await channel.send(pollMessage);
            await Promise.all([
                votingMessage.react("✅"),
                votingMessage.react("❌")
            ]);
        } catch (error) {
            console.error('Error creating vote:', error);
            message.author.send('Hiba történt a szavazás létrehozása közben.');
        }
    }
}

export default new VotingCommand();
