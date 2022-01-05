const { Message, Client } = require("discord.js");

module.exports = {
    name: "clear",
    run: async (client, message, args) => {
        
        const bruh = args[0];

        if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("You're missing the `MANAGE_MESSAGES` permission!");

        if(!bruh) return message.channel.send("Enter an amount of messages to delete!");

        if(isNaN(bruh)) return message.channel.send("Enter a valid number!");

        if(bruh > 100 || bruh < 1) return message.channel.send("You can only delete from 1 to 100 messages.");

        try {
            message.channel.bulkDelete(bruh).then(_message => message.channel.send(`I have cleared ${_message.size} messages!`).then(sent => setTimeout(function (){
                sent.delete();
            }, 2500)));
        } catch (err) {
            console.log(err)
            message.channel.send("There was an error while executing the command!");
        }


    },
};