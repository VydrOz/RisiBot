const Discord = require('discord.js');

exports.run = async(client, msg) => {
    await msg.channel.send("```API Latency: " + (Math.round(client.ping)) + "ms```");
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