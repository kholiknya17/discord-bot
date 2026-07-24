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

client.once('ready', () => {
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
    added: ['New Game Violence District'],
    fixed: [],
    removed: [],
  };

  const embed = new EmbedBuilder()
    .setTitle('📋 Zuperming Logs')
    .setColor(0x5865F2)
    .addFields(
      { name: '🗺️ Map', value: updateData.map, inline: true },
      { name: '🏅 Rank Type', value: updateData.rankType, inline: true },
      { name: '🔢 Version', value: updateData.version, inline: true },
      { name: '🏷️ Tag', value: updateData.tag, inline: true },
    )
    .setTimestamp();

  const embedLog = new EmbedBuilder()
    .setTitle('📝 Added Game!')
    .setColor(0x2B2D31)
    .addFields(
      { name: '✅ Added', value: updateData.added.map(i=>`\`[+]\` ${i}`).join('\n') || '-' },
    );

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setLabel('Report Bug')
      .setStyle(ButtonStyle.Link)
      .setURL('https://discord.gg/AGxYsayeGz'),
    new ButtonBuilder()
      .setLabel('Suggestions')
      .setStyle(ButtonStyle.Link)
      .setURL('https://discord.gg/AGxYsayeGz'),
  );

  await message.channel.send({
    content: '> 🔔 **Enjoy the Script!**\n> Report Bugs and Suggestions?',
    embeds: [embed, embedLog],
    components: [row],
  });
});

client.login(process.env.DISCORD_TOKEN);
