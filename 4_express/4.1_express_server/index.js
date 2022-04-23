const express = require('express')
const app = express()

// 3 JSONP 接口
// - 这个要写在最前面，否则就是使用 cors 跨域方法实现的了
app.get('/api/jsonp', (req, res) => {
    const functionName = req.query.callback
    const data = { a:1, b:2}
    res.send(`${functionName}(${JSON.stringify(data)})`)
})


// 2 跨域
const cors = require('cors')
app.use(cors())

// 1 将请求体以键值对形式封装到 req.body 上
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res)=> {
    res.send('home page')
})
app.use('/api', require('./apiRouter'))

app.listen(3001, () => {
    console.log('express server running at localhost:3000...');
})