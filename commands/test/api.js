const Discord = require('discord.js');
const fetch = require('node-fetch');
const URL = 'https://jsonplaceholder.typicode.com/todos/1';

exports.run = async (client, msg, args) => {
    const prefix = client.guildconfs.get(msg.guild.id).prefix;
    let embed = new Discord.MessageEmbed()
        .setColor(msg.guild.members.cache.get(client.user.id).displayColor);//display color bot
    
    //api call
    const json = await fetch(URL)
        .then(res => res.json())
        .catch(err => {
            console.error(err);
            embed.setTitle('ERROR');
            embed.setDescription("⚠ An error occurred with the api call");
            return {}; //dodge undefined
        });
    
    if (Object.keys(json).length !== 0) {
        let params = Object.keys(json).join(', ');
        //reply section
        if (json[args[0]] === undefined) {
            embed.setTitle('ERROR');
            if (!args[0]) {
                embed.setDescription(`Parameter needed \`${prefix}api {param}\``);
                embed.addFields(
                    { name: 'Parameters', value: `${params}` }
                );
            }
            else {
                embed.setDescription(`Parameter \`${args[0]}\` doesn't exist`);
            }
        }
        else {
            embed.setTitle('[TEST Command]');
            embed.setDescription(`${args[0]} = ${String(json[args[0]])}`);
        }
    }
    await msg.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['api']
};
exports.help = {
    name: 'api',
    description: 'basic API ' + URL,
};