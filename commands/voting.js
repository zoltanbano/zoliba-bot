import { ChannelType } from 'discord.js';
import config from '../config/config.js';

const strings = config.language.strings.commands.voting;

class VotingCommand {
    async execute(message, client) {
        await message.delete();
        
        const question = message.content.split(" ").slice(1).join(" ") || `${strings.defaultQuestion}`;
        const pollMessage = `${question}\n${strings.format}`;
        
        const channel = client.channels.cache.get(config.discord.voteChannelId);
        
        if (!channel || channel.type !== ChannelType.GuildText) {
            return message.author.send(`${strings.channelError}`);
        }

        try {
            const votingMessage = await channel.send(pollMessage);
            await Promise.all([
                votingMessage.react("✅"),
                votingMessage.react("❌")
            ]);
        } catch (error) {
            console.error('Error creating vote:', error);
            message.author.send(`${strings.error}`);
        }
    }
}

export default new VotingCommand();
