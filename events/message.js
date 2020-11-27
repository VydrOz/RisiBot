exports.run = (client, msg) => {
	if (msg.author.bot) return;
	if (msg.channel.type !== 'text') return msg.reply('You must run the commands on a Discord server on which the Discord Bot is available');

	const prefix = client.guildconfs.get(msg.guild.id).prefix;
	if (!msg.content.startsWith(prefix)) return;
    
	const args = msg.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	if (!client.commands.has(command)) return;	
	try {
		client.commands.get(command).run(client, msg, args);
	} catch (error) {
		console.error(error);
	}
};