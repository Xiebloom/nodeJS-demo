const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('hello express!')
})

// http://localhost:3000/static_txt.txt 来访问
app.use(express.static('public'))

app.listen(3000, () => {
    console.log('express server runing at localhost:3000');
})

