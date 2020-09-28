exports.run = (client, msg) => {
	if (msg.author.bot) return;
	if (msg.channel.type !== 'text') return msg.reply('You must run the commands on a Discord server on which the Discord Bot is available');
	    const prefix = client.guildconfs.get(msg.guild.id).prefix;
	if (!msg.content.startsWith(prefix)) return;
    
	const args = msg.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();
	let cmd;
	if (client.commands.has(command)) {
	    cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
	    cmd = client.commands.get(client.aliases.get(command));
    }
	if (cmd) {
	    cmd.run(client, msg, args);
    }
};