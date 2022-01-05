const { MessageEmbed } = require("discord.js")
const warns = require("../../models/warnSchema")

module.exports = {
  name: "warns",
  run: (client, message, args) => {
    const mainVars = require("../../index")
    const embedColor = mainVars.getembedColor(client, message.guild)
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("You can't use this command since you do not have the `ADMINISTRATOR` permissions.")
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!user) return message.channel.send("User not found.")

    
    warns.findOne({ guildId: message.guild.id, user: user.user.id }, async(err, data) => {

      if(err) throw err;
      if (data.content.length) {
        message.channel.send({ embeds: [new MessageEmbed()
        .setTitle(`${user.user.tag}'s warns'`)
        .setDescription(
          data.content.map(
            (w, i) =>
            `\`${i + 1}\` | Moderator : ${message.guild.members.cache.get(w.moderator).user.tag}\nReason : ${w.reason}\n`
          ).toString().replace(",", "")
        )
        .setColor(embedColor)] 
        })
      } else {
        message.channel.send("User has no data.")
      }
    })
  }
}