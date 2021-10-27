const Discord = require('discord.js');
const RisiCommand = require('../RisiCommand.js');
const fetch = require('node-fetch');
const URL = 'https://jsonplaceholder.typicode.com/todos/1';


module.exports = class apiTestCommand extends RisiCommand {
    constructor(client) {
        super(client, {
            name: 'api',
            group: 'test',
            memberName: 'api',
            description: 'Simple Api call',
            format: 'api {userId/id/title/completed}',
            aliases: ['api'],
            examples: ['api title'],
            clientpermissions: ['SEND_MESSAGES'],
            userpermissions: [],
            shortDescription: 'Test',
            dashboardsettings: true,
        });
    }

    async run(msg, args) {
        const prefix = msg.client.provider.getGuild(msg.guild.id, 'prefix');
        const margs = args.split(' ');
        let embed = new Discord.MessageEmbed().setColor("#95A5A6");
        //.setColor(msg.guild.members.cache.get(client.user.id).displayColor);//display color bot

        if (!margs[0]) return msg.channel.send('Parameters needed !');
    
        try {
            //api call
            const json = await fetch(URL)
                .then(res => res.json())
                .catch(err => {
                    console.error(err);
                    embed.setTitle('ERROR');
                    embed.setDescription("⚠ An error occurred with the api call");
                    return {}; //dodge undefined
                });

            const validation = Object.keys(json);
        
            if (Object.keys(json).length !== 0) {
                //reply section
                for (let i = 0; i < margs.length; i += 1) {
                    if (validation.indexOf(margs[i].toLowerCase()) >= 0) {
                        embed.setTitle('[TEST Command]');
                        embed.setDescription(`${margs[0]} = ${String(json[margs[0]])}`);
                        return msg.channel.send({ embed });
                    }
                }
                embed.setTitle('ERROR');
                embed.setDescription(`Parameter needed \`${prefix}api {param}\``);
                embed.addFields({ name: 'Parameters', value: `${validation}` });
            }
            return msg.channel.send({ embed });
        }
        catch (error) {
            return msg.channel.send('Api call error');
        }
    }
};