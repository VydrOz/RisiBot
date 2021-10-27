module.exports = {
	run: async (guild) => {
		if (!client.provider.isReady) return;
		
		await client.provider.clearGuild(guild.id);
	}
};