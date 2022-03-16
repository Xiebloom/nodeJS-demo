// 单独的路由文件以创建路由模块

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('home page')
})

router.get('/about', (req, res) => {
    res.send('about page')
})

router.post('/post-test', (req, res) => {
    res.send(req.body)
})

module.exports = router