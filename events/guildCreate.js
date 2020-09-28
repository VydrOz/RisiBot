const defaultSettings = require('../util/defaultsettings.json');

exports.run = (client, guild) => {
	client.guildconfs.set(guild.id, defaultSettings);
};