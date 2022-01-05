const { MessageEmbed } = require("discord.js")
const warns = require("../../models/warnSchema")

module.exports = {
  name: "warn",
  run: (client, message, args) => {
    const mainVars = require("../../index")
    const embedColor = mainVars.getembedColor(client, message.guild)
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("You can't use this command since you do not have the `ADMINISTRATOR` permissions.")
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!user) return message.channel.send("User not found.")
    let reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason provided."
    
    warns.findOne({ guildId: message.guild.id, user: user.user.id }, async(err, data) => {
      if(err) throw err;
      if (!data) {
        data = new warns({
          guildId: message.guild.id,
          user: user.user.id,
          content: [
            {
              moderator: message.author.id,
              reason: reason
            }
          ]
        })
      } else {
        const obj = {
          moderator: message.author.id,
          reason: reason
        }
        data.content.push(obj)
      }
      data.save()
    });
    try {
      user.send({embeds: [new MessageEmbed()
        .setDescription(`You have been warned in **${message.guild.name}** for: "${reason}"`)
        .setColor("RED")]
      });
    } catch(err) {
      console.log(err)
    }
    message.channel.send({ embeds: [new MessageEmbed()
      .setDescription(`Warned ${user} for: "${reason}"`)
      .setColor(embedColor)]
    })
  }
}