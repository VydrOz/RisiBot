exports.run = (client, guild) => {
	const defaultSettings = {
		prefix: 'r!',
		//modlog: 'false',
		//modlogchannel: '',
		//welcome: 'false',
		//bye: 'false',
		//welcomebyechannel: ''
	};
	//guild.owner.send('TEST');
	client.guildconfs.set(guild.id, defaultSettings);
};