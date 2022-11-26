const client = require("../index")
const comma = require('comma-number')
const Schema = require("../models/도박")


module.exports = {
    name: "잔액",
    async execute(message, args) {
        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author
        const wjdqh = await Schema.findOne({ userid: user.id })
        //const wjdqh1 = await Schema1.findOne({ userid1: user.id})
        if (!wjdqh) return message.reply("**등록된 정보가 없어!  ?돈줘로 돈과 코인을 둘다 받아줘!**")
        const t = new Date()
        const date = "" + t.getFullYear() + t.getMonth() + t.getDate();
        let i
        if (wjdqh.date == date) i = ":white_check_mark:"
        else i = ":x:"
        //let d
        //if (wjdqh1.date1 == date) d = ":white_check_mark:"
        //else d = ":x:"
        const embed = new (require("discord.js")).MessageEmbed()
            .setTitle(`${user.tag || user.user.tag}님의 도박 정보`)
            .addField("남은 돈 :", `**${comma(wjdqh.money)}원!**`)
            .addField("오늘 돈을 받았는가 :", `${i}`)
            .setThumbnail(user.displayAvatarURL())
            .setTimestamp()
            .setColor("YELLOW")
        message.channel.send({ embeds: [embed] })
    }
}