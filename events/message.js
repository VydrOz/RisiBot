const Discord = require('discord.js');
const guildsettingskeys = require('../guildsettings-keys.json');
const usersettingskeys = require('../usersettings-keys.json');

module.exports = {
	run: async (msg) => {
		if (msg.author.bot) return;
		if (msg.channel.type !== 'text') return msg.reply('You must run the commands on a Discord server on which the Discord Bot is available');
		if (!client.provider.isReady) return;

		if(client.provider.getGuild(msg.guild.id))
		{
			const settings = client.provider.guildSettings.get(msg.guild.id);
			for (const key in guildsettingskeys) {
				if (!settings[key] && typeof settings[key] === 'undefined') {
				  settings[key] = guildsettingskeys[key];
				}
			}
			await client.provider.setGuildComplete(msg.guild.id, settings);
		}
		else{
			await msg.client.provider.reloadGuild(msg.guild.id);
      		await msg.client.provider.setGuild(msg.guild.id);
		}



		if (client.provider.getUser(msg.author.id)) {
			const settings = client.provider.userSettings.get(msg.author.id);
			// eslint-disable-next-line guard-for-in
			for (const key in usersettingskeys) {
			  if (!settings[key] && typeof settings[key] === 'undefined') {
				settings[key] = usersettingskeys[key];
			  }
	  
			  if (typeof usersettingskeys[key] === 'object') {
				for (const key2 in usersettingskeys[key]) {
				  if (!settings[key][key2]) {
					settings[key][key2] = usersettingskeys[key][key2];
				  }
				}
			  }
			}
			await msg.client.provider.setUserComplete(msg.author.id, settings);
		}
		else {
			await msg.client.provider.reloadUser(msg.author.id);
		}

		if (!client.provider.getUser(msg.author.id, 'userId')) {
			await client.provider.setUser(msg.author.id, 'userId', msg.author.id);
		}

		/*const prefix = client.provider.getGuild(msg.guild.id, 'prefix');

		if (!msg.content.startsWith(prefix)) return;
		
		const args = msg.content.slice(prefix.length).trim().split(/ +/);
		const command = args.shift().toLowerCase();
		
		if (!client.registry.commands.has(command)) return;	
		try {
			client.registry.commands.get(command).run(client, msg, args);
		} catch (error) {
			console.error(error);
		}*/
	}
};