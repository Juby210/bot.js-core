module.exports = {
    id: 'example',
    author: '324622488644616195',
    load: () => {
        Core.commands.set("ping", require('./ping'))
    },
    unload: () => {
        Core.commands.delete("ping")
        delete require.cache[require.resolve('./ping')]
    }
}