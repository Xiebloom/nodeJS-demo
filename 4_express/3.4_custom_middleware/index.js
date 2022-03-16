const express = require('express')
const app = express()

// 2 中间件
const myBodyParser = require('./custom_body_parser')
app.use(myBodyParser)

// 1 注册路由模块
// * 注意路由的注册一定要放在最后
const router = require('./router')
// - 添加前缀 app.use('/api', router)
app.use(router)

app.listen(
    3000,
    () => {
        console.log('express server running at localhost:3000')
    }
)