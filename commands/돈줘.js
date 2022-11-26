const comma = require("comma-number")

module.exports = {
    name: "가입",
    async execute(message) {
        const t = new Date()
        const date = "" + t.getFullYear() + t.getMonth() + t.getDate();
        const schema = require("../models/도박")
        const ehqkrduqn = await schema.findOne({
            userid: message.author.id
        })
        if (!ehqkrduqn) {
            let newData = new schema({
                money: parseInt(1),
                userid: message.author.id,
                date: date
            })
            newData.save()
            message.reply("**기념으로 1원을 줬어!**")
        } else {
            if (ehqkrduqn.date == date) return message.reply("**이미 오늘 돈을 받았어!**")
            const money = parseInt(ehqkrduqn.money)
            await schema.findOneAndUpdate({ userid: message.author.id }, {
                money: money + 1,
                userid: message.author.id,
                date: date
            })
            const f = money + 1
            message.reply(`**1원을 줬어! \n현재잔액 : ${comma(f)}**`)
        }
    }
}