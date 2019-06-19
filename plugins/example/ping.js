module.exports.run = async ({message}) => {
    const m = await message.channel.send(`Pinging...`)
    m.edit(`:ping_pong: | Ping: **${m.createdTimestamp - message.createdTimestamp}**ms. Gateway (API): **${Math.round(Core.ping)}**ms`)
}

module.exports.info = {
    triggers: ['ping'],
    description: 'Shows bot ping',
    perms: [],
    botperms: []
}