const settings = require('../settings.json');
const guildsettingskeys = require('../guildsettings-keys.json');

module.exports = {
	run: async (guild) => {
		if (!client.provider.isReady) return;

		guildsettingskeys.prefix = settings.prefix;

		if (client.provider.getGuild(guild.id, 'prefix')) { // Everything can be requested here
			const guildSettings = client.provider.guildSettings.get(guild.id);
			for (const key in guildsettingskeys) {
			  if (!guildSettings[key] && guildSettings[key] === 'undefined') {
				guildSettings[key] = guildsettingskeys[key];
			  }
			}
			await client.provider.setGuildComplete(guild.id, guildSettings);
		}
		else {
			await client.provider.reloadGuild(guild.id);
		}
	}
};