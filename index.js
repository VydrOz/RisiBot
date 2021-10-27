const Commando = require('discord.js-commando');
const fs = require('fs');
const path = require('path');

//const Discord = require('discord.js');
const settings = require('./settings.json');
const RisibotSettingsProvider = require('./utils/SettingsProvider');

if (!settings.token) {
  console.error('You forgot to enter your Discord super secret token! You can get this token from the following page: https://discordapp.com/developers/applications/');
  process.exit(42);
}

if (!settings.prefix) {
  console.error('You can\'t start the bot without setting a standard prefix');
  process.exit(42);
}

const client = global.client = new Commando.Client({
  commandPrefix: settings.prefix,
  owner: '358653201513447465',
  presence: {
    activity: {
      name: `https://www.youtube.com/watch?v=W5BxWMD8f_w`,
      type: 0
    }
  }
});

/* Custom Client Properties */
client.ready = false;
client.settings = settings;

/* Events */
fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const eventFunction = require(`./events/${file}`);
    if (eventFunction.disabled) return;
    const event = eventFunction.event || file.split('.')[0];
    const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client;
    const { once } = eventFunction;
    try {
      emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(...args));
    }
    catch (error) {
      console.error(error.stack);
    }
  });
});

client.setProvider(new RisibotSettingsProvider(settings));
client.login(settings.token);

/* Commands */
client.registry
  .registerDefaults()
	.registerGroups([
    ['searches', 'Searches'],
		['test', 'Test']
	])
	.registerCommandsIn(path.join(__dirname, 'commands'));
