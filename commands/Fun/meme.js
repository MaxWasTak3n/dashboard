const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "meme",
    description: "Sends A Random Meme",
    aliases: 'mm',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const mainVars = require("../../index")
        const embedColor = mainVars.getembedColor(client, message.guild)
        if (!args[0]) {
            fetch('https://meme-api.herokuapp.com/gimme')
                .then(res => res.json())
                .then(async json => {
                    const memeEmbed = new MessageEmbed()
                        .setTitle(json.title)
                        .setImage(json.url)
                        .setFooter(json.subreddit, json.postLink)
                        .setTimestamp()
                        .setColor(embedColor);

                    let msg = await message.channel.send("Finding you a meme...");
                    msg.edit({
                        embeds: [memeEmbed],
                    });
                });
        } else if (args[0]) {
            const number = args[0]
            if (isNaN(number)) return message.channel.send("Please specify a valid number of memes to send.");
            if (number > 3) return message.channel.send("You cannot request more than 3 memes at a time.")

            fetch(`https://meme-api.herokuapp.com/gimme/${number}`)
                .then(res => res.json())
                .then(async json => {
                    const memeEmbed = new MessageEmbed()

                        .setTimestamp()
                        .setColor(embedColor);

                    for (let i = 0; i < number; i++) {
                        memeEmbed
                            .setTitle(json['memes'][i]['title'])
                            .setImage(json['memes'][i]['url'])
                            .setFooter(json['memes'][i]['subreddit'], json['memes'][i]['postLink']);
                        
                        message.channel.send( { embeds: [memeEmbed]

                      })
                    }
                })
        }
    },
};