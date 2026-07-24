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

// Kirim update log dengan !update
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith('!update')) return;

  // Contoh data update
  const updateData = {
    map: 'Violencr District',
    rankType: 'Service Provider, Premium', 
    version: '1.0.0',
    tag: '@Service Provider', '@Premium Script',
    added: ['New Game Violence District],
    fixed: ['Bug login'],
    removed: [],
  };

  // Buat embed utama
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

  // Embed logs update
  let logsText = '';
  if (updateData.added.length)
    logsText += updateData.added.map(i => `[+] ${i}`).join('\n') + '\n';
  if (updateData.fixed.length)
    logsText += updateData.fixed.map(i => `[~] ${i}`).join('\n') + '\n';
  if (updateData.removed.length)
    logsText += updateData.removed.map(i => `[-] ${i}`).join('\n');

  const embedLog = new EmbedBuilder()
    .setTitle('📝 Logs Update!')
    .setColor(0x2B2D31)
    .addFields(
      { name: '✅ Added', value: updateData.added.map(i=>`\`[+]\` ${i}`).join('\n') || '-' },
      { name: '🔧 Fixed', value: updateData.fixed.map(i=>`\`[~]\` ${i}`).join('\n') || '-' },
      { name: '❌ Removed', value: updateData.removed.map(i=>`\`[-]\` ${i}`).join('\n') || '-' },
    );

  // Tombol
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setLabel('Report Bug')
      .setStyle(ButtonStyle.Link)
      .setURL('https://discord.com/channels/https://discord.gg/AGxYsayeGz'),
    new ButtonBuilder()
      .setLabel('Suggestions')
      .setStyle(ButtonStyle.Link)
      .setURL('https://discord.com/channels/https://discord.gg/AGxYsayeGz'),
  );

  await message.channel.send({
    content: '> 🔔 **Enjoy the Script**\n> Report Bugs and Suggestions?',
    embeds: [embed, embedLog],
    components: [row],
  });
});

client.login(process.env.MTUyNjQyOTI2MjQyNzQ1OTYwNQ.GOuIvQ.5-MghcNyVCEYLkbpyPb3pqs15P5wEE2BMWN4Xw);
