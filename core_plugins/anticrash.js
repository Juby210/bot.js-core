module.exports = (message, err, send = true) => {
    Core.console.error(err)
    if(!message && !send) return
    const code = Math.floor(1000 + Math.random() * 9000)

    const eb = new Core.embeds.erreb()
    eb.setDescription(`This shouldn't have happened.\nSend this code to developer: **#${code}**\n\n[Support server](https://discord.gg/6bfpCCt)\n\n\`${err}\``)
    if(message) {
        message.channel.send(eb)
        if(send) eb.addField('Command', message.content)
    }
    if(send) Core.errorChannel.send(eb)
}