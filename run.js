const { channel } = require("diagnostics_channel");
const { Client, ChannelType } = require("discord.js");
require('dotenv').config();
const { run } = require("node:test");
const client = new Client({ intents: 32767 });
const token = process.env.TOKEN;

const runeterra = ["Bandle", "Bilgewater", "Demacia", "Freljord", "Ionia", "Ixtal", "The Void", "Noxus", "Piltover", "Shurima", "Targon", "Zaun", "Shadow Isles"];
const outposts = ["Sanctuary", "New Golden Sands", "New Golden Sands", "Ancient Spire", "Galleon's Grave", "Dagger Tooth", "Morrow's Peak"];
const maps = ["Lotus", "Pearl", "Fracture", "Breeze", "Icebox", "Bind", "Haven", "Split", "Ascent"];

let tempChannel = [];
const createChannel = ["816337879172775997", "931250672563814440", "944655482767962182", "943602133448663070"]

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('voiceStateUpdate', async (oldState, newState) => {
    
    if (tempChannel.includes(oldState.channelId) && oldState.channel.members.size == 0) {
        oldState.channel.delete();
        tempChannel.splice(tempChannel.indexOf(oldState.channelId), 1);
    }

    if (newState.channelId == null) return;
    else if (!createChannel.includes(newState.channelId))
        console.log(newState.member.user.username + " moved to " + newState.channel.name);

    switch (newState.channelId) {
        //LoL
        case "816337879172775997":
            //choose a random voice channel name that is not already taken
            let _draftname = runeterra[getRandomInt(runeterra.length)];
            while (newState.guild.channels.cache.find(channel => channel.name === _draftname)) {
                _draftname = runeterra[getRandomInt(runeterra.length)];
            }

            //create a new voice temp channel
            const _draft = await newState.guild.channels.create({
                name: _draftname,
                type: ChannelType.GuildVoice,
                parent: '722169722526892132',
            });
            tempChannel.push(_draft.id);
            //move the member to the new channel
            newState.member.voice.setChannel(_draft);
            break;
        //TFT
        case "931250672563814440":
            //choose a random voice channel name that is not already taken
            let _tftname = runeterra[getRandomInt(runeterra.length)];
            while (newState.guild.channels.cache.find(channel => channel.name === _tftname)) {
                _tftname = runeterra[getRandomInt(runeterra.length)];
            }
            
            //create a new voice temp channel
            const _tft = await newState.guild.channels.create({
                name: _tftname,
                type: ChannelType.GuildVoice,
                parent: '931250400504467507',
            });
            tempChannel.push(_tft.id);
            //move the member to the new channel
            newState.member.voice.setChannel(_tft);
            break;
        //SoT
        case "944655482767962182":
            //choose a random voice channel name that is not already taken
            let _sotname = outposts[getRandomInt(outposts.length)];
            while (newState.guild.channels.cache.find(channel => channel.name === _sotname)) {
                _sotname = outposts[getRandomInt(outposts.length)];
            }

            //create a new voice temp channel
            const _sot = await newState.guild.channels.create({
                name: _sotname,
                type: ChannelType.GuildVoice,
                parent: '774323822580203521',
            });
            tempChannel.push(_sot.id);
            //move the member to the new channel
            newState.member.voice.setChannel(_sot);
            break;
        //Valorant
        case "943602133448663070":
            //choose a random voice channel name that is not already taken
            let _valorantname = maps[getRandomInt(maps.length)];
            while (newState.guild.channels.cache.find(channel => channel.name === _valorantname)) {
                _valorantname = maps[getRandomInt(maps.length)];
            }

            //create a new voice temp channel
            const _valorant = await newState.guild.channels.create({
                name: _valorantname,
                type: ChannelType.GuildVoice,
                parent: '943601357124960296',
            });
            tempChannel.push(_valorant.id);
            //move the member to the new channel
            newState.member.voice.setChannel(_valorant);
            break;
    }
});

client.login(token);