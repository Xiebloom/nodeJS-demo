const express = require('express')
const app = express()
const articleRouter = require('./router/artcate')

app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
    res.cc = function(err, status = 1) {
        res.send({
            message: err instanceof Error ? err.message : err,
            status
        })
    }
    next()
})

app.use('/my/article', articleRouter)

app.use((err, req, res, next) => {
    console.log('错误级别中间件捕获了错误')
    res.cc(err)
})

app.listen(3008, function () {
    console.log('api server running at http://127.0.0.1:3008')
})