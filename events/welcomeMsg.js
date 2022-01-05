//Welcomer Message
const client = require("../index")
const mainVars = require("../index")
const { MessageEmbed } = require("discord.js")

client.on('guildMemberAdd', member => {
  let welcomeMsg = mainVars.getWelcomeMsg(client, member.guild)
  let iswelcomeMsgTrue = mainVars.getisWelcomeMsgTrue(client, member.guild)
  let welcomeChannel = client.channels.cache.get("922212777907605534")
  let embedColor = mainVars.getembedColor(client, member.guild)

  if (iswelcomeMsgTrue === true) {
    const exampleEmbed = new MessageEmbed()
    .setColor(embedColor)
    .setTitle(member.user.username + ' has joined the server!')
    .setTimestamp()
    .setThumbnail(member.user.avatarURL())
    .setFooter("Welcome!", client.user.avatarURL());

    if (welcomeMsg.includes("%user.mention%")) {
      welcomeMsg = welcomeMsg.replace("%user.mention%", `<@${member.id}>`)
      exampleEmbed.setDescription((welcomeMsg))
    }
        
    if (welcomeMsg.includes("%user.name%")) {
      welcomeMsg = welcomeMsg.replace("%user.name%", `${member.user.username}`)
      exampleEmbed.setDescription((welcomeMsg))
    }

    if (welcomeMsg.includes("%membercount%")) { 
      welcomeMsg = welcomeMsg.replace("%membercount%", client.guilds.cache.get(member.guild.id).memberCount)
      exampleEmbed.setDescription((welcomeMsg))
    }

  client.channels.cache.get("922212777907605534").send({ embeds: [exampleEmbed]})}})