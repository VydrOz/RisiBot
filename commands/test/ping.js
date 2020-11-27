const Discord = require('discord.js');

exports.run = async(client, msg, args) => {
	let embed = new Discord.MessageEmbed()
		.setColor(msg.guild.members.cache.get(client.user.id).displayColor) //display color bot
		.setTitle('[TEST Command]')
		.setDescription(`Discord Latency: \`${(Math.round(client.ws.ping))}ms\``);
    await msg.channel.send(embed);
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