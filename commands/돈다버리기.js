const Schema = require("../models/도박")

module.exports = {
    name: "돈버리기올",
    async execute(message) {
        const ehqkrduqn = await Schema.findOne({
            userid: message.author.id
        })
        await Schema.findOneAndUpdate({ userid: message.author.id }, {
            money: ehqkrduqn.money - ehqkrduqn.money,
            userid: message.author.id,
            date: ehqkrduqn.date
        })
        message.reply(`**이럴수가! 돈을 다 버렸어! 현재 잔액: 0원**`)

    }
}