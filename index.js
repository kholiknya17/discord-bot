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
      name: 'Zuperming Bot', 
      iconURL: client.user.displayAvatarURL() 
    })
    .setTitle('🟣 Zuperming Update Logs')
    .setColor(0x6A0DAD)
    .setDescription(
      `• **Map :** ${updateData.map}\n` +
      `• **Rank Type :** ${updateData.rankType}\n` +
      `• **Version :** ${updateData.version}\n` +
      `• **Tag :** ${updateData.tag}`
    )
    .setTimestamp()
    .setFooter({ 
      text: 'Zuperming Bot • Update System', 
      iconURL: client.user.displayAvatarURL() 
    });

  const embedLog = new EmbedBuilder()
    .setTitle('📝 Logs Update!')
    .setColor(0x3B0764)
    .setDescription(
      (updateData.added.length ? 
        '**Added**\n' + updateData.added.map(i => `\`[ + ]\` ${i}`).join('\n') : '') +
      (updateData.fixed.length ? 
        '\n\n**Fixed**\n' + updateData.fixed.map(i => `\`[ ~ ]\` ${i}`).join('\n') : '') +
      (updateData.removed.length ? 
        '\n\n**Removed**\n' + updateData.removed.map(i => `\`[ - ]\` ${i}`).join('\n') : '') ||
      '`[ - ]` No changes'
    );

  await message.channel.send({
    content: '> 🔔 **Rejoin to apply update!**\n> Report Bugs and Suggestions to admin.',
    embeds: [embed, embedLog],
  });
});

client.login(process.env.DISCORD_TOKEN);
