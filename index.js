const { 
  Client, GatewayIntentBits, EmbedBuilder
} = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

client.once('clientReady', () => {
  console.log(`✅ Bot aktif: ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith('!update')) return;

  const BANNER_URL = 'https://i.imgur.com/alKA95k.png';

  const updateData = {
    map: 'Violence District',
    rankType: 'Service Provider | Premium',
    version: '1.0.0',
    tag: '@Service Provider | @Premium',
    added: ['Game Violence District'],
    fixed: [],
    removed: [],
  };

  const embed = new EmbedBuilder()
    .setAuthor({ 
      name: '⚡ ZUPERMING BOT', 
      iconURL: client.user.displayAvatarURL() 
    })
    .setTitle('```\n[ ZUPERMING UPDATE LOGS ]\n```')
    .setColor(0x00FFFF)
    .setImage(BANNER_URL)
    .addFields(
      { 
        name: '🗺️ MAP', 
        value: `\`\`\`fix\n${updateData.map}\n\`\`\``, 
        inline: true 
      },
      { 
        name: '🏅 RANK TYPE', 
        value: `\`\`\`fix\n${updateData.rankType}\n\`\`\``, 
        inline: true 
      },
      { 
        name: '🔢 VERSION', 
        value: `\`\`\`fix\n${updateData.version}\n\`\`\``, 
        inline: true 
      },
      { 
        name: '🏷️ TAG', 
        value: `\`\`\`fix\n${updateData.tag}\n\`\`\``, 
        inline: true 
      },
    )
    .setTimestamp()
    .setFooter({ 
      text: '⚡ Zuperming System • Powered by Neon', 
      iconURL: client.user.displayAvatarURL() 
    });

  const embedLog = new EmbedBuilder()
    .setTitle('```\n[ LOGS UPDATE ]\n```')
    .setColor(0xFF00FF)
    .addFields(
      { 
        name: '✅ ADDED', 
        value: updateData.added.length 
          ? updateData.added.map(i => `\`\`\`diff\n+ ${i}\n\`\`\``).join('') 
          : '```diff\n- None\n```'
      },
      { 
        name: '🔧 FIXED', 
        value: updateData.fixed.length 
          ? updateData.fixed.map(i => `\`\`\`diff\n~ ${i}\n\`\`\``).join('') 
          : '```diff\n- None\n```'
      },
      { 
        name: '❌ REMOVED', 
        value: updateData.removed.length 
          ? updateData.removed.map(i => `\`\`\`diff\n- ${i}\n\`\`\``).join('') 
          : '```diff\n- None\n```'
      },
    )
    .setFooter({ text: '⚡ Zuperming • Cyber Edition' });

  await message.channel.send({
    content: '> ⚡ **[ SYSTEM UPDATE DETECTED ]**\n> `Rejoin to apply the latest update!`',
    embeds: [embed, embedLog],
  });
});

client.login(process.env.DISCORD_TOKEN);
