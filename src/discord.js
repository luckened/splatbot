require("dotenv/config");

const { Client } = require("discord.js");
const { maps, emojis } = require("./maps");
const { capital, randomizeBO3, randomizeBO5 } = require("./helpers");
const splatbotChannel = "864314233511870478";

const client = new Client();

const mapTypes = Object.keys(emojis).map((mapType) => capital(mapType));

const filter = (reaction, user) => {
    const valid = Object.values(emojis).indexOf(`:${reaction.emoji.name}:${reaction.emoji.id}`) > -1 && !user.bot;

    return valid;
};

client.on("ready", (a) => {
    client.channels.fetch(splatbotChannel).then((channel) => {
        channel.send("Ready");
    });
});

client.on("message", (message) => {
    const content = message.content;

    if (content === "/listar") {
        message.channel.send(`Deseja listar os mapas de qual tipo?\n${mapTypes.join(", ")}`);
    }

    if (message.author.bot && message.content === `Deseja listar os mapas de qual tipo?\n${mapTypes.join(", ")}`) {
        message.react(emojis.zones);
        message.react(emojis.tower);
        message.react(emojis.rainmaker);
        message.react(emojis.clam);

        const collector = message.createReactionCollector(filter, { time: 15000 });

        collector.on("collect", (reaction, user) => {
            console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
            message.channel.send(`Mapas do modo ${capital(reaction.emoji.name)}:`);
            message.channel.send("\u200B");
            message.channel.send(maps[emojis[reaction.emoji.name]]);

            collector.stop();
        });
    }

    if (content === "/mapas") {
        message.reply("Deseja\n/listar?");
    }

    if (content === "/randomizar") {
        message.reply("Digite '/3' para melhor de 3");
        message.reply("ou '/5' para melhor de 5");
    }

    if (content === "/3") {
        message.reply("Randomizando para melhor de 3...");
        const arranged = randomizeBO3(maps);
        message.channel.send("Mapas sorteados:");
        message.channel.send("\u200B");
        message.channel.send(arranged.map((item) => `${mapTypes[item.index]} -> ${item.map}`));
    }

    if (content === "/5") {
        message.reply("Randomizando para melhor de 5..");
        const arranged = randomizeBO5(maps);
        message.channel.send("Mapas sorteados:");
        message.channel.send("\u200B");
        message.channel.send(arranged.map((item) => `${mapTypes[item.index]} -> ${item.map}`));
    }
});

client.login(process.env.TOKEN);
