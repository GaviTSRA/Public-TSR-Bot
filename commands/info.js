module.exports =
{
    name: "info",
    description: "Give's you all the information about the bot you need",
    execute(message, args, package)
    {
        const Discord = require("discord.js");
        const bot = new Discord.Client();
        const fs = require("fs");
        bot.commands = new Discord.Collection();

        const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));

        message.channel.send("TSR Bot info:"); //Sending Title
        message.channel.send("Version: " + package.version); //Sending the version

        for(const file of commandFiles) //Looping throw all .js files
        {
            if (file.name != "index.js") //Checking if the file is not the index file
            {
                const command = require(`./${file}`);
                bot.commands.set(command.name, command);
                console.log(command.name); 
                console.log(command.description);
                message.channel.send(command.name + ": " + command.description); //Sending the name and desc of the currend command
            }
        }
    }
}