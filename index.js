const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./config.json').token;
const fs = require('fs'); // Require fs to go throw all folder and files
const PersistentCollection = require('djs-collection-persistent');
client.guildconfs = new PersistentCollection({ name: 'guildsettings' });

fs.readdir('./events/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		let eventFunction = require(`./events/${file}`);
		let eventName = file.split('.')[0];
		client.on(eventName, (...args) => eventFunction.run(client, ...args));
	});
});

client.commands = new Discord.Collection(); // Collection for all commands
client.aliases = new Discord.Collection(); // Collection for all aliases of every command
const modules = ['Test']; // This will be the list of the names of all modules (folder) your bot owns

modules.forEach(c => {
  fs.readdir(`./commands/${c}/`, (err, files) => { // Here we go through all folders (modules)
    if (err) throw err; // If there is error, throw an error in the console
    console.log(`[Commandlogs] Loaded ${files.length} commands of module ${c}`); // When commands of a module are successfully loaded, you can see it in the console
    files.forEach(f => { // Now we go through all files of a folder (module)
      const props = require(`./commands/${c}/${f}`); // Location of the current command file
      client.commands.set(props.help.name, props); // Now we add the commmand in the client.commands Collection which we defined in previous code
      props.conf.aliases.forEach(alias => { // It could be that the command has aliases, so we go through them too
        client.aliases.set(alias, props.name); // If we find one, we add it to the client.aliases Collection
      });
    });
  });
});

client.login(token);