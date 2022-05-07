const db = require('../db')
const bcrypt = require('bcryptjs')

exports.getUserInfo = (req, res) => {
    const selectSqlStr = 'select username, nickname, email from ev_users where id = ?'
    db.query(selectSqlStr, req.user.id, (err, results) => {
        if (err) return res.cc(err)

        if (results.length !== 1) return res.cc('results.length !== 1')

        res.send(results[0])
    })
}

exports.updateUserInfo = (req, res) => {

    const sqlStr = 'update ev_users set ? where id = ?'
    db.query(sqlStr, [ req.body, req.user.id], (err, results) => {
        // catch error
        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('修改信息失败', 0)

        res.send(results[0])
    })
}

exports.updatePwd = (req, res) => {
    const selectSqlStr = 'select * from ev_users where id=?'
    const { oldPwd, newPwd } = req.body
    db.query(selectSqlStr, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc ('results.length !== 1')

        // check oldPwd
        const isMatched = bcrypt.compareSync(oldPwd, results[0].password)
        if (!isMatched) return res.cc('oldPwd is not corrected!')
        // return res.send(results)

        // update newPwd
        const hashedNewPwd = bcrypt.hashSync(newPwd)
        const updatePwdSqlStr = 'update ev_users set password = ? where id = ?'
        db.query(updatePwdSqlStr, [hashedNewPwd, req.user.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc ('affectedRows !== 1')

            return res.send(results)
        })
    })
}

exports.updateAvatar = (req, res) => {
    const sqlStr = 'update ev_users set user_pic=? where id=?'
    db.query(sqlStr, [req.body.avatar, req.user.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc ('affectedRows !== 1')
        return res.send({status: 'ok', ...results})
    })
    
    
}