const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "userinfo",

    run: async (client, message, args) => {
const mainVars = require("../../index")
    const embedColor = mainVars.getembedColor(client, message.guild)

const mention = message.mentions.members.first();
const lol = args.join().replace(/false/g, "is not");

if(!args[0]) {
return message.channel.send("You must mention a member to inspect.")};

if(!mention) {
return message.channel.send("Mention a valid user.");};

let userInfoEmbed = new MessageEmbed()
.setTitle(`${mention.user.username}'s information`)
.addFields({
name: 'Created At:',
value: '`' + `${mention.user.createdAt.toDateString()}` + '`',
inline: true
},{
name: 'ID:',
value: '`' + `${mention.user.id}` + '`',
inline: true
},{
name: 'Is a bot?',
value: '`' + `${mention.user.bot ? '✔️' : '❌'}` + '`',
inline: true
})
.setFooter("Requested by: " + message.author.tag, message.author.displayAvatarURL())
.setColor(embedColor)
.setTimestamp();

message.reply({ embeds: [userInfoEmbed]});}};
