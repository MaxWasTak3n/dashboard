const { MessageEmbed } = require("discord.js")
const warns = require("../../models/warnSchema")

module.exports = {
  name: "clearwarns",
  aliases: ["clrwarn", "clear-warns"],
  run: (client, message, args) => {
    const mainVars = require("../../index")
    const embedColor = mainVars.getembedColor(client, message.guild)
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("You can't use this command since you do not have the `ADMINISTRATOR` permissions.")
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!user) return message.channel.send("User not found.")
    
    warns.findOne({ guildId: message.guild.id, user: user.user.id }, async(err, data) => {
      if(err) throw err;
      if (data) {
        data.content = []
        data.save()
        message.channel.send(`Successfully cleared ${user.user}'s warns.`)
      } else {
        message.channel.send("This user doesn't have any warns in this server.")
      }
    })
  }
}