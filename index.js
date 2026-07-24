const { 
  Client, GatewayIntentBits, EmbedBuilder, 
  ActionRowBuilder, ButtonBuilder, ButtonStyle 
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

  const updateData = {
    map: 'Violence District',
    rankType: 'Service Provider | Premium',
    version: '1.0.0',
    tag: '@Service Provider | @Premium Script', 
    added: ['Game Violence District'],
    fixed: [],
    removed: [],
  };

  const embed = new EmbedBuilder()
    .setAuthor({ 
      name: 'Zuperming Bot', 
      iconURL: client.user.displayAvatarURL() 
    })
    .setTitle('🗂️ Zuperming Update Logs')
    .setColor(0x5865F2)
    .addFields(
      { name: '🗺️ Map', value: `\`${updateData.map}\``, inline: true },
      { name: '🏅 Rank Type', value: `\`${updateData.rankType}\``, inline: true },
      { name: '\u200B', value: '\u200B', inline: true },
      { name: '🔢 Version', value: `\`${updateData.version}\``, inline: true },
      { name: '🏷️ Tag', value: updateData.tag, inline: true },
      { name: '\u200B', value: '\u200B', inline: true },
    )
    .setTimestamp()
    .setFooter({ text: 'Zuperming Bot • Update System' });

  const embedLog = new EmbedBuilder()
    .setTitle('📝 Logs Update!')
    .setColor(0x2B2D31)
    .addFields(
      { 
        name: '✅ Added', 
        value: updateData.added.length 
          ? updateData.added.map(i => `\`[+]\` ${i}`).join('\n') 
          : '`-`' 
      },
      { 
        name: '🔧 Fixed', 
        value: updateData.fixed.length 
          ? updateData.fixed.map(i => `\`[~]\` ${i}`).join('\n') 
          : '`-`' 
      },
      { 
        name: '❌ Removed', 
        value: updateData.removed.length 
          ? updateData.removed.map(i => `\`[-]\` ${i}`).join('\n') 
          : '`-`' 
      },
    )
    .setColor(0x5865F2);

  await message.channel.send({
    content: '> 🔔 **Rejoin to apply update!**\n> Report Bugs and Suggestions to admin.',
    embeds: [embed, embedLog],
  });
});

client.login(process.env.DISCORD_TOKEN);
