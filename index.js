const { token, mongo_url, prefix } = require('./config.json')
const { Client, Intents, Collection, MessageEmbed } = require('discord.js')
const client = new Client({ intents: 32767 })
const fs = require("fs")
module.exports = client;
client.login(token)
const mongoose = require("mongoose")
client.slashcommands = new Collection()
mongoose.connect(mongo_url, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(console.log("데이터베이스 연결 완료"))
client.once('ready', () => {
    console.log("봇이 준비되었습니다")
})
//일커 핸들
client.commands = new Collection()

const commandsFile = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandsFile) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const commandName = args.shift()
    const command = client.commands.get(commandName)
    if (!command) return
    try {
        command.execute(message, args)
    } catch (error) {
        console.error(error)
    }
})

//독도
const Dokdo = require("dokdo");
const DokdoHandler = new Dokdo(client, {
    aliases: ['독도','dok','dokdo','서버','독'], prefix: "?",
  owners: ["691094674789630004", "798742139340980224"],
noPerm: (message) => message.reply("🚫 dokdo를 사용할 권한이 없습니다."),
});
client.on("message", async (message) => {
  await DokdoHandler.run(message);
});
