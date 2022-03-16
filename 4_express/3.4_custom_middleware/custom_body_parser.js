const qs = require('query-string')

const bodyParser =  (req, res, next) => {
    console.log('bodyparse')
    // req 的 data 事件
    let str = ''
    req.on('data', chunk => {
        str += chunk
    })
    req.on('end', () => {
        console.log(str);
        const body = qs.parse(str)
        req.body = body
        console.log(body);
        next()
    })
}

module.exports = bodyParser