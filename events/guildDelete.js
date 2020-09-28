exports.run = (client, guild) => {
	client.guildconfs.delete(guild.id);
};