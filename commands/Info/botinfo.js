const {Message, Client } = require("discord.js");

const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: "botinfo",

run: async (client, message, args) => {
const mainVars = require("../../index")
const embedColor = mainVars.getembedColor(client, message.guild)

      let days = Math.floor(client.uptime / 86400000);
      let hours = Math.floor(client.uptime / 3600000) % 24;
      let minutes = Math.floor(client.uptime / 60000) % 60;
      let seconds = Math.floor(client.uptime / 1000) % 60;
  const example = new MessageEmbed()
            .setColor(embedColor)
            .setTitle(message.guild.name + ' Info')
            .setThumbnail(message.guild.iconURL())
            .addFields({
                name: 'Client Ping:',
                value: '`' + `${client.ws.ping}` + '`',
                inline: true
            }, {
                name: 'Bot Count:',
                value: '`' + `${message.guild.members.cache.filter(member => member.user.bot).size}` + '`',
                inline: true
            }, {
                name: 'Uptime:',
                value: "`" + `${days}d ${hours}h ${minutes}m ${seconds}s` + "`",
                inline: true
            })
            .setFooter('Requested by: ' + message.author.tag);
       await message.channel.send({
            embeds: [example]
        }); }
       
    }