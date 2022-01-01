const client = require("../index");
const mainVars = require("../index");


client.on("messageCreate", async (message) => {
    const prefix = mainVars.getPrefix(client, message.guild)
    if (message.author.bot) return;
    if (!message.content.toLowerCase().startsWith(prefix)) return;

    const [cmd, ...args] = message.content
        .slice(prefix.length)
        .trim()
        .split(" ");

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run(client, message, args);
});
