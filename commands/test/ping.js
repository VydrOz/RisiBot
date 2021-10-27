const Discord = require('discord.js');
const RisiCommand = require('../RisiCommand.js');

module.exports = class pingTestCommand extends RisiCommand {
    constructor(client) {
        super(client, {
            name: 'pong',
            group: 'test',
            memberName: 'pong',
            description: 'Ping Pong',
            format: 'pong',
            aliases: ['pong'],
            examples: ['pong'],
            clientpermissions: ['SEND_MESSAGES'],
            userpermissions: [],
            shortDescription: 'Test',
            dashboardsettings: true
        });
    }

    async run(msg) {
        let embed = new Discord.MessageEmbed()
			.setColor(msg.guild.members.cache.get(client.user.id).displayColor) //display color bot
			.setTitle('[TEST Command]')
			.setDescription(`Discord Latency: \`${(Math.round(client.ws.ping))}ms\``);
    	return msg.channel.send({ embed });
	}
};