/**
 * 在这里定义和用户相关的路由处理函数，供 /router/api.js 模块进行调用
 */
const db = require('../db')
const bcrypt = require('bcryptjs')
const jwtToken = require('jsonwebtoken')
const config = require('../config')

// 注册用户的处理函数
exports.regUser = (req, res) => {
    const userinfo = req.body

    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr, userinfo.username, (err, results) => {
        // catch error
        if (err) return res.cc(err)

        // check if username is occupied
        if (results.length > 0) return res.cc('username is occupied')

        // insert new user
        // - encrypt password by bcryptjs
        userinfo.password = bcrypt.hashSync(userinfo.password)
        // - query sql
        const sqlInsertStr = 'insert into ev_users set ?'
        db.query(sqlInsertStr, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            if (err) return res.send({ status: 1, message: err.message })
            if (results.affectedRows !== 1) return res.send({ results, status: 1, message: 'affectedRows != 1' })

            res.send({ status: 0, message: 'Registered user successfully' })
        })
    })
    // res.send('reguser OK')
}

// 登录的处理函数
exports.login = (req, res) => {
    // 接受表单数据
    const userinfo = req.body

    // 去 db 查询
    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr, userinfo.username, (err, results) => {
        // catch error
        if (err) return res.cc(err)

        // check if username is registed
        if (results.length !== 1) return res.cc('a not registed user')

        // chech if password is same with that in db
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareResult) return res.cc('密码错误')

        // generate a Token in server
        const user = { ...results[0], password: '', user_pic: '' }
        const tokenStr = jwtToken.sign(user, config.jswSecretKey, { expiresIn: config.expiresIn} )
        res.send({
            status: 0,
            message: 'successfully logined',
            token: 'Bearer ' + tokenStr
        })
    })
}
