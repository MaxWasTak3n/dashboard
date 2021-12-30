/* Require discord.js and discord-easy-dashboard */
const { Client, Intents, MessageEmbed } = require('discord.js');
const path = require ('path');
const Dashboard = require('discord-easy-dashboard');
const axios = require("axios");

const discordToken = process.env['DISCORD_TOKEN'];
const discordSecret = process.env['DISCORD_SECRET']

/* create the discord client */
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

/* Initiate the Dashboard class and attach it to the discord client for easy access */
client.dashboard = new Dashboard(client, {
injectCSS:`
body {
 background-color: #121212;
}
.d-grid {
 color: white;
}
.navbar {
  background-color: #121212!important;
}
.navbar-toggler {
  background-color: white!important;
  border-radius: 10%;
}
a {
  color: white!important;
}
p {
 color: white;
}
h2 {
 color: white;
}
h1 {
 color: white;
}
a:active {
 color: white!important;
}
.card {
 background-color: #121212
}
.card-body {
 color: white;
}
.form-control {
 color: white;
 background-color: #121212;
}
.btn {
  background-color: white!important;
  border-color: white!important;
  color: black!important;
}
.text-white {
  color: black!important;
}
img {
  border-radius: 50%!important;
}
div {
  align-items: center;
}
button {
  align-self: center;
}
.alert-success {
  background-color: white;
  color: black;
  border-color: white;
}
.alert-danger {
  background-color: white;
  color: black;
  border-color: white;
}
.dropdown-item {
  color: black!important;
}
.dropdown-item {
  background-color: white!important;
}
`,
  name: 'Derpy\'s', // Bot's name
  description: 'Welcome to Derpy\'s dashboard. Here you can control everything!', // Bot's description
  baseUrl: 'https://o.maxwastak3n.repl.co',
  serverUrl: 'https://discord.gg/EypBUFA3Rm',
  noPortIncallbackUrl: true,
  faviconPath: path.join(__dirname, 'assets', 'conecat-pfp.png'),
  secret: discordSecret,
});
client.prefixes = {}; 
client.welcomeMsg = {};
client.iswelcomeMsgTrue = {};
client.embedColor = {};
// We' ll store the things of each server here

const validatePrefix = prefix => prefix.length <= 5; // Only accepts prefixes of up to 5 characters
const setPrefix = (discordClient, guild, value) => discordClient.prefixes[guild.id] = value; // Stores the prefix in the client.prefixes object
const getPrefix = (discordClient, guild) => discordClient.prefixes[guild.id] || '!';

const validateWelcomeMsg = prefix => prefix.length <= 2000; // Only accepts prefixes of up to 2000 characters
const setWelcomeMsg = (discordClient, guild, value) => discordClient.welcomeMsg[guild.id] = value; // Stores the prefix in the client.welcomeMsg object
const getWelcomeMsg = (discordClient, guild) => discordClient.welcomeMsg[guild.id] || 'Someone just joined the server!';

const setisWelcomeMsgTrue = (discordClient, guild, value) => discordClient.iswelcomeMsgTrue[guild.id] = value; // Stores the prefix in the client.iswelcomeMsgTrue object
const getisWelcomeMsgTrue = (discordClient, guild) => discordClient.iswelcomeMsgTrue[guild.id] || false;

client.dashboard.addTextInput('Prefix', 'The bot\'s prefix for the server.', validatePrefix, setPrefix, getPrefix);


client.dashboard.addTextInput('Welcome Message', 'The message the bot will send when someone joins your server.', validateWelcomeMsg, setWelcomeMsg, getWelcomeMsg);

client.dashboard.addBooleanInput('Welcome Message Toggle', 'Toggles wether the welcome command gets triggered when someone joins.', setisWelcomeMsgTrue, getisWelcomeMsgTrue)

client.on('ready', () => console.log(`${client.user.tag} is ready!`));

client.on('messageCreate', message => {
    let prefix = getPrefix(client, message.guild);
    if (message.content.startsWith(prefix + 'ping')) message.reply('Pong!');
});

client.on('messageCreate', message => {
    let prefix = getPrefix(client, message.guild);
    let welcomeMsg = getWelcomeMsg(client, message.guild)
    let iswelcomeMsgTrue = getisWelcomeMsgTrue(client, message.guild)

    if (message.content.startsWith(prefix + 'test'))
https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js
    if(iswelcomeMsgTrue === true) {
    message.reply(welcomeMsg);}

    else {
    message.reply(':x: Command not enabled!');}

    if(message.content.startsWith(prefix + 'eval')) {
        const [cmd, ...args] = message.content
          .slice(prefix.length)
          .trim()
          .split(" ");

      function clean(text) {
        if (typeof(text) === "string")
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
          return text;
      }

      if(message.author.id !== "846669251989340171") return;
        try {
          const code = args.join(" ");
          let evaled = eval(code);
    
          if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
    
          message.channel.send(clean(evaled), {code:"xl"});
        } catch (err) {
          message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
    else if(message.content.startsWith(prefix + 'cat')) {
      axios.get("https://api.thecatapi.com/v1/images/search", {headers: {
        'x-api-key':'05b0be56-10e1-427f-b0c7-d0c25479c865'
      }}).then(response => {
        const catEmbed = new MessageEmbed()
        .setColor("#6bbaff")
        .setTitle("Here's the cat you asked for!")
        .setImage(response['data'][0]['url'])
        .setFooter("Aww")
        .setTimestamp();

        message.reply({embeds: [catEmbed]})
      })
    } 
    
    else if(message.content.startsWith(prefix + 'pussy')) {
      axios.get("https://api.thecatapi.com/v1/images/search", {headers: {
        'x-api-key':'05b0be56-10e1-427f-b0c7-d0c25479c865'
      }}).then(response => {
        const catEmbed = new MessageEmbed()
        .setColor("#6bbaff")
        .setTitle("Here's the pussy you asked for!")
        .setImage(response['data'][0]['url'])
        .setFooter("Aww")
        .setTimestamp();

        message.reply({embeds: [catEmbed]})
      })
    }
});

client.login(discordToken);