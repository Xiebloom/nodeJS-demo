const router = require('express').Router()

router.get('/get', (req, res) => {
    const query = req.query
    res.send({
        status: 0,
        msg: 'get successed',
        data: query
    })
})

router.post('/post', (req, res) => {
    const body = req.body
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.send({
        status: 0,
        msg: 'get successed', 
        data: body
    })
})

module.exports = router