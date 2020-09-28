const Discord = require('discord.js');

exports.run = async(client, msg) => {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
    aliases: ['ping']
};
exports.help = {
	name: 'ping',
	description: 'Gives you the bot latency',
};