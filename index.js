require('dotenv').config();
const config = require("./config.json");
const Discord = require("discord.js");
const package = require("./package.json");
const bot = new Discord.Client();

const fs = require("fs");
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for(const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command); //getting all commands
}

if (process.env.BOT == "ON") //Check if the bot should turn on
{
    bot.on("ready", () => {
        console.log(`${bot.user.username} is online!`); 
        bot.user.setPresence({activity: { name: "Discord", type: "PLAYING" }, status: "online"}); //"Online presence
    });

    bot.on("message", message => {
        if (!message.author.bot) //Check if the author of the message is not a bot
        {
            let args = message.content.substring(config.prefix.length).split(" ");

            if (message.content.startsWith(config.prefix)) //"!" check
            {
                switch(args[0]) //Fuctions for every channel
                { 
                    case 'hype':
                        bot.commands.get('hype').execute(message, args); //!hype function
                    break; 

                    case 'ping':
                        bot.commands.get('ping').execute(message, args); //!ping function
                    break;

		            case 'oh':
                        bot.commands.get('oh').execute(message, args); //!oh function
                    break; 

		            case 'uff':
                        bot.commands.get('uff').execute(message, args); //!uff function
                    break; 
                } 

                if(message.channel.name == "bot-channel") //Channelcheck
                {
                    switch(args[0]) //Fuction for only the bot channel
                    {
                        case 'lotto':
                            bot.commands.get('lotto').execute(message, args); //!lotto function
                        break;

                        case 'info':
                            bot.commands.get('info').execute(message, args, package); //!info function
                        break;
                    }
                }
            }
            if (message.content == "Hi") //"Hi" check
            {
                message.channel.send("Hi"); //Hi reply
            }

            if (message.content == "bb") //"bb" check
            {
                message.channel.send("Tschau!"); //bb reply
            }  
        }
    });

    bot.login(process.env.token);
} else if (process.env.BOT == "TEST") //Check if the bot should enter testing mode
{
    console.log("Bot is in testing mode");
    bot.on("ready", () =>
    {
        bot.user.setPresence({activity: { name: "TESTING", type: "PLAYING" }, status: "online"}); //Testing presence
    });
    bot.login(process.env.token);
} else 
{
    console.log("Bot is offline"); //Check if the bot should enter offline mode
    bot.on("ready", () => 
    {
        bot.user.setPresence({activity: { name: "OFFLINE", type: "PLAYING" }, status: "online"}); //Offline presence
    });
    bot.login(process.env.token);
}
