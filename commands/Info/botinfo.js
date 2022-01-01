const { MessageEmbed } = require("discord.js")

module.exports = {
  "name": "botinfo",
  run: (client, message) => {
    const mainVars = require("../../index")
    const embedColor = mainVars.getembedColor(client, message.guild)
    console.log(client.ws.ping)

    const botInfoEmbed = new MessageEmbed()
        .setColor(embedColor)
        .setTitle("Bot Information")
        .addFields(
		{ name: 'Websocket Ping', value: client.ws.ping + " ms", inline: true },
		{ name: 'Server Count', value: client.guilds.cache.size + " servers", inline: true },
    { name: 'la madonna 🥳🤩🤩🤩🤩', value: "sesso gay", inline: true})
	
        .setThumbnail(message.guild.iconURL())
        .setFooter("Requested by " + message.author.tag)
        .setTimestamp();
        message.reply({embeds: [botInfoEmbed]})
    } 
}