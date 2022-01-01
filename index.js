const { Client, Intents, MessageEmbed, Collection } = require('discord.js');
const path = require ('path');
const Dashboard = require('discord-easy-dashboard');
const axios = require("axios");
const discordToken = process.env['DISCORD_TOKEN'];
const discordSecret = process.env['DISCORD_SECRET']
const fs = require("fs")
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

//Login
client.login(discordToken)

//Command Handler
module.exports = client;

//Initialize Dashboard
client.dashboard = new Dashboard(client, {
injectCSS:`
body {
 background-color: #121212;
}
h2, p {
  text-align: center;

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

.form-control {
  height: 40px
}
.form-control-color {
  width: 3rem;
  padding: 0rem;
  height: 1.7rem!important;
  border-color: #121212
}
tr, td, th, tbody, table { 
  color: white!important; 
}
`,
  name: 'Derpy\'s', //Bot Name
  description: 'Welcome to Derpy\'s dashboard. Here you can control everything you need!', // Bot Description
  baseUrl: 'https://dashboard.maxwastak3n.repl.co',
  serverUrl: 'https://discord.gg/EypBUFA3Rm',
  noPortIncallbackUrl: true,
  faviconPath: path.join(__dirname, 'assets', 'conecat-pfp.png'),
  secret: discordSecret,
});

//We' ll store the settings of each server here
client.prefixes = {}; 
client.welcomeMsg = {};
client.iswelcomeMsgTrue = {};
client.embedColor = {};
client.welcomeChannel = {};
client.commands = new Collection()
client.aliases = new Collection()

//Validator, Setter and Getter
const validatePrefix = prefix => prefix.length <= 5;
const setPrefix = (discordClient, guild, value) => discordClient.prefixes[guild.id] = value;
const getPrefix = (discordClient, guild) => discordClient.prefixes[guild.id] || '!';

const validateWelcomeMsg = prefix => prefix.length <= 2000;
const setWelcomeMsg = (discordClient, guild, value) => discordClient.welcomeMsg[guild.id] = value;
const getWelcomeMsg = (discordClient, guild) => discordClient.welcomeMsg[guild.id] || '%user.name% just joined the server!';

const setisWelcomeMsgTrue = (discordClient, guild, value) => discordClient.iswelcomeMsgTrue[guild.id] = value;
const getisWelcomeMsgTrue = (discordClient, guild) => discordClient.iswelcomeMsgTrue[guild.id] || false;

const setwelcomeChannel = (discordClient, guild, value) => discordClient.welcomeChannel[guild.id] = value;
const getwelcomeChannel = (discordClient, guild) => discordClient.welcomeChannel[guild.id] || '';
const getSelectorEntries = (discordClient, guild) => guild.channels.cache.map(ch => [ch.id, ch.name]);

const setembedColor = (discordClient, guild, value) => discordClient.embedColor[guild.id] = value;
const getembedColor = (discordClient, guild) => discordClient.embedColor[guild.id] || '#74E84A';

//Inputs on the Dashboard
client.dashboard.addTextInput('Prefix', 'The bot\'s prefix for the server. (Max 5 chars)', validatePrefix, setPrefix, getPrefix);

client.dashboard.addTextInput('Welcome Message', 'The message the bot will send when someone joins your server. (Max 2000 chars)', validateWelcomeMsg, setWelcomeMsg, getWelcomeMsg)

client.dashboard.addBooleanInput('Welcome Message Toggle', 'Toggles wether the welcome command gets triggered when someone joins.', setisWelcomeMsgTrue, getisWelcomeMsgTrue)

client.dashboard.addColorInput('Embed Color', 'The color of the embeds the bot will send.', setembedColor, getembedColor)

//Commands
client.on('message', message => {
  let prefix = getPrefix(client, message.guild)
  let embedColor = getembedColor(client, message.guild)

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
        .setColor(embedColor)
        .setTitle("Here's the cat you asked for!")
        .setImage(response['data'][0]['url'])
        .setFooter("Aww")
        .setTimestamp();

        message.reply({embeds: [catEmbed]})
      })
    } 
    
    else if(message.content.startsWith(prefix + 'pussy')){
      axios.get("https://api.thecatapi.com/v1/images/search", {headers: {
        'x-api-key':'05b0be56-10e1-427f-b0c7-d0c25479c865'
      }}).then(response => {
        const catEmbed = new MessageEmbed()
        .setColor(embedColor)
        .setTitle("Here's the cat you asked for!")
        .setImage(response['data'][0]['url'])
        .setFooter("Aww")
        .setTimestamp();

        message.reply({embeds: [catEmbed]})
      })
    }
    
    else if(message.content.startsWith(prefix + 'serverinfo')) {
        const serverInfoEmbed = new MessageEmbed()
        .setColor(embedColor)
        .setTitle("Server info for " + message.guild.name)
        	.addFields(
		{ name: 'Created At', value: "" + message.guild.createdAt, inline: true },
		{ name: 'Owner', value: '<@' + message.guild.ownerId + '>', inline: true })
        .setThumbnail(message.guild.iconURL())
        .setFooter("Requested by " + message.author.tag)
        .setTimestamp();
        message.reply({embeds: [serverInfoEmbed]})
    }
});

//Welcomer Message
client.on('guildMemberAdd', member => {
  let welcomeMsg = getWelcomeMsg(client, member.guild)
  let iswelcomeMsgTrue = getisWelcomeMsgTrue(client, member.guild)
  let welcomeChannel = getwelcomeChannel(client, member.guild)
  let embedColor = getembedColor(client, member.guild)

 if (iswelcomeMsgTrue === true) {
const exampleEmbed = new MessageEmbed()
.setColor(embedColor)
.setTitle(member.user.username + ' has joined the server!')
.setTimestamp()
.setThumbnail(member.user.avatarURL())
.setFooter("Welcome!", client.user.avatarURL());

 if (welcomeMsg.includes("%user.mention%")) {
welcomeMsg = welcomeMsg.replace("%user.mention%", `<@${member.id}>`)
exampleEmbed.setDescription((welcomeMsg))}
        
 if (welcomeMsg.includes("%user.name%")) {
welcomeMsg = welcomeMsg.replace("%user.name%", `${member.user.username}`)
exampleEmbed.setDescription((welcomeMsg))}

 if (welcomeMsg.includes("%membercount%")) { 
welcomeMsg = welcomeMsg.replace("%membercount%", client.guilds.cache.get(member.guild.id).memberCount)
exampleEmbed.setDescription((welcomeMsg))}

client.channels.cache.get(welcomeChannel).send({ embeds: [exampleEmbed]})}})

//Goodbye Message
client.on('guildMemberRemove', member => {
 let welcomeMsg = getWelcomeMsg(client, member.guild)
 let iswelcomeMsgTrue = getisWelcomeMsgTrue(client, member.guild)
 let welcomeChannel = getwelcomeChannel(client, member.guild)
 let embedColor = getembedColor(client, member.guild)

  if (iswelcomeMsgTrue === true) {
        const exampleEmbed = new MessageEmbed()
.setColor(embedColor)
.setTitle(member.user.username + ' has left the server.')
.setTimestamp()
.setThumbnail(member.user.avatarURL())
.setFooter("Goodbye!", client.user.avatarURL());
  if (welcomeMsg.includes("%user.name%")) {
welcomeMsg = welcomeMsg.replace("%user.name%", `${member.user.username}`)
exampleEmbed.setDescription((welcomeMsg))}

  if (welcomeMsg.includes("%membercount%")) { 
welcomeMsg = welcomeMsg.replace("%membercount%", client.guilds.cache.get(member.guild.id).memberCount)
exampleEmbed.setDescription((welcomeMsg))}

client.channels.cache.get(welcomeChannel).send({
embeds: [exampleEmbed]})}})

client.on('ready', () => console.log(`${client.user.tag} is ready!`));

module.exports.getPrefix = getPrefix;
module.exports.getembedColor = getembedColor;
module.exports.getWelcomeMsg = getWelcomeMsg;
module.exports.getwelcomeChannel = getwelcomeChannel;
  
require("./handler")(client)