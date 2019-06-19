const { WebhookClient } = require('discord.js')

module.exports.log = (cmd, message) => {
    if(message.author.id == Core.config.core.owner) return
    const wh = new WebhookClient(Core.config.logs.commands.id, Core.config.logs.commands.token)
    const embed = new Core.embeds.embed()
    embed.setTitle(`Used command: ${cmd} - ${message.content}`)
    embed.setDescription(`By: ${message.author.tag} (${message.author.id}) | Message ID: ${message.id} \n\n\`${message.author.avatarURL}\``)
    embed.setFooter(`GuildID: ${message.guild.id} | ChannelID: ${message.channel.id}`)
    embed.setColor('#79fa05')
    wh.send(embed)
}

module.exports.serverlog = (server, joined) => {
    const wh = new WebhookClient(Core.config.logs.servers.id, Core.config.logs.servers.token)
    const embed = new Core.embeds.embed()
    if(joined) {
        embed.setColor("#00ff00")
        embed.setTitle(`Joined to server: ${server.name} (${server.id})`)
    } else {
        embed.setColor("#ff0000")
        embed.setTitle(`Kicked from server: ${server.name} (${server.id})`)
    }
    embed.setDescription(`Owner: ${server.owner.user.tag} (${server.owner.user.id}) | Members: ${server.members.size} | Bots: ${server.members.filter(m=>m.user.bot).size} \n\n\`${server.iconURL}\``)
    embed.setThumbnail(server.iconURL)
    wh.send(embed)
}