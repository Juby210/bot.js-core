const colors = require('cli-colors')

module.exports.dbg = msg => {
    console.log(colors.bgCyan(colors.black(' DEBUG ')) + '  ' + msg)
}

module.exports.info = msg => {
    console.log(colors.bgGreen(colors.black(' INFO  ')) + '  ' + msg)
}

module.exports.warn = msg => {
    console.log(colors.bgYellow(colors.black(' WARN  ')) + '  ' + msg)
}

module.exports.error = msg => {
    console.error(colors.bgRed(colors.white(' ERROR ')) + '  ' + msg)
}