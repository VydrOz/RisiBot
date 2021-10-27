const Discord = require('discord.js');
const brawlstars = require("brawlstars.js");
const settings = require('../../settings.json').brawlstars;
const api = new brawlstars.Client(settings.token);
const RisiCommand = require('../RisiCommand.js');
const fs = require('fs')

module.exports = class brawlstarsCommand extends RisiCommand {
    constructor(client) {
        super(client, {
            name: 'brawlstars',
            group: 'searches',
            memberName: 'brawlstars',
            description: 'Shows you Brawl Stars stats about a player or a clan',
            format: 'brawlstars {tag}',
            aliases: ['bs'],
            examples: ['brawlstars profile 99CY2JJ'],
            clientpermissions: ['SEND_MESSAGES'],
            userpermissions: [],
            shortDescription: 'Games',
            dashboardsettings: true
        });
    }

    async run(msg, args) {
        const validation = ['profile'];
        const margs = args.split(' ');

        if (!margs[0] && !margs[1]) return msg.channel.send('Parameters needed !');

        for (let i = 0; i < margs.length; i += 1) {
            if (validation.indexOf(margs[i].toLowerCase()) >= 0) {
                if (margs[0].toLowerCase() === 'profile') {
                    try {
                        const profileResult = await api.getPlayer(margs[1]);

                        const _portraitPath = `${settings.asset}/portrait/player/${profileResult.data.icon.id}.png`;
                        let portrait = new Discord.MessageAttachment(_portraitPath, `${profileResult.data.icon.id}.png`);
                        
                        const embed = new Discord.MessageEmbed()
                            //.setColor(msg.guild.members.cache.get(client.user.id).displayColor)
                            .setColor('#FFEF00')
                            .setAuthor(`${profileResult.name} (${profileResult.tag})`)
                            .addFields(
                                {name: "<:icon_trophy_medium:855840917588279336> Trophies", value: profileResult.trophies, inline: true},
                                {name: "<:icon_trophy_medium:855840917588279336> Highest Trophies", value: profileResult.highestTrophies, inline: true} 
                            )
                            .addField( '<:icon_player_level:855840926621761547> Level', profileResult.expLevel)
                        
                        if(fs.existsSync(_portraitPath))
                        {
                            embed
                                .attachFiles(portrait)
                                .setThumbnail(`attachment://${portrait.name}`)
                        }
                        return msg. channel.send({ embed });
                    }
                    catch (error) {
                        return msg.channel.send('Could not find the Brawlstars profile. Please make sure you have entered the correct ID of your profile!');
                    }
                }
            }
        }
        return msg.channel.send('It looks like you were looking for something invalid. You have the choice of having statistics displayed by a Brawl Stars profile or clan!');
    }
};