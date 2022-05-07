
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

const config = require('./config')

// - 配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }))

// - error handling middleware
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

// - token 解析
const expressJWT = require('express-jwt')
app.use(expressJWT({ secret: config.jswSecretKey }).unless({ path: [/^\/api\//] }))

// - 导入并注册用户路由模块和路由处理函数模块 
const apiRouter = require('./router/api')
app.use('/api', apiRouter)
const myRouter = require('./router/my')
app.use('/my', myRouter)

const joi = require('joi')
// 错误级别的中间件
app.use((err, req, res, next) => {
    // 验证失败的错误
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 身分认证错误
    if (err.name === 'UnauthorizedError') return res.cc('身分认证失败')
    // 未知错误
    res.cc('unknown error')
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3007, function () {
    console.log('api server running at http://127.0.0.1:3007')
})
