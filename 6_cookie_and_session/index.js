const express = require('express')
const app = express()
const path = require('path')

app.use(express.json())
// 1 使用 session
const session = require('express-session')
app.use(session({
    secret: 'session screte',
    resave: false,
    saveUninitialized: true,
}))

// 2 托管静态页面
app.use(express.static('pages'))

app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send('home page')
})

app.post('/api/login', (req, res) => {
    const body = req.body
    if (body.username === 'admin') {
        req.session.isLogin = true
        req.session.password = body.password
    }
    res.send(body)
})

app.get('/api/password', (req, res) => {
    if (!req.session.isLogin){
        return res.send('not login')
    }
    res.send(req.session.password)
})

app.listen(3000, () => {
    console.log('express server is running...');
})