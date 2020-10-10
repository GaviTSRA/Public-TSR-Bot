module.exports =
{
    name: "lotto",
    description: "A 1 in 1000 chance to get the rich rang",
    execute(message, args)
    {
        randomNum = Math.floor(Math.random() * 1001); //Getting a number between 0 and 1000...
        if (randomNum > 999) //...and checking if it is 1000
        {
            var role = message.member.guild.roles.cache.find(role => role.name === "Rich"); //Getting the rich role
            message.member.roles.add(role).catch(); //Giving the rich role to the user
            message.channel.send("Deine Nummer:" + randomNum + "\nDu bist jetzt RICH!!!"); //Telling the user that he has won
        } else //If the user didnt win...
        {
            message.channel.send("Deine Nummer:" + randomNum + "\nDas war nix, schade...."); //...tell him he lost
        }
    }
}