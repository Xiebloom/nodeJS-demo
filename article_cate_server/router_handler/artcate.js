const db = require('../db')


exports.homePage = (req, res) => {
    console.log('home page accessed')
    res.send('home page')
}

exports.getArticleCates = (req, res) => {
    const sqlStr = 'select * from ev_article_cate'
    db.query(sqlStr, (err, results) => {
        if (err) return res.cc(err)
        res.send(results)
    })
}

exports.addArticleCates = (req, res) => {
    const { name, alias } = req.body
    const selectSqlStr = 'select * from ev_article_cate where name=? or alias=?'
    db.query(selectSqlStr, [name, alias], (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 0) return res.cc('this name or alias are occupied')
        const sqlStr = 'insert into ev_article_cate set ?'
        db.query(sqlStr, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('results.affectedRows !== 1!')
            res.send(results)
        })
    })

}

exports.deleteCateById = (req, res) => {
    
    const sqlStr = 'delete from ev_article_cate where id=?' 
    db.query(sqlStr, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        // if (results.affectedRows !== 1) return res.cc('results.affectedRows !== 1!')
        res.send(results)
    })
}

exports.getArticleById = (req, res) => {
    res.send('ok')
}