const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'my_db_01'
})

// 测试连接是否成功
function testConnection() {
    db.query('SELECT 1', (err, res) => {
        if (err) return console.error(err.message)
        // console.log(res);
    })
}


// 查询数据
function queryData() {
    db.query('SELECT * FROM users', (err, res) => {
        if (err) return console.error(err.message)
        // console.log(res);
    })
}


// 插入数据
const userInfo = {
    username: 'user_inserted_by_node_3',
    password: '111111'
}

// - 复杂写法
function inserData() {
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [userInfo.username, userInfo.password], (err, res) => {
        if (err) return console.error(err.message)

        // 可以通过 res.affectedRows === 1 来判断是否成功
        console.log(res)
        if (res.affectedRows) console.log('插入成功');
    })
}


// - 特殊情况下的简便写法（属性和字段分别对应）
function insertDataSimply() {
    db.query('INSERT INTO users SET ?', userInfo, (err, res) => {
        if (err) return console.error(err.message)
        if (res.affectedRows) console.log('插入成功');
    })
}

function updateData () {
    const userInfo = {
        username: 'zs',
        password: '123457',
        id: 1
    }
    const sqlStr = `UPDATE users SET username=?, password=? where id=?`
    db.query(sqlStr, [userInfo.username, userInfo.password, userInfo.id], (err, res) => {
        if (err) return console.error(err.message)
        console.log(res)
        if (res.affectedRows) console.log('更改');
    })
}

function updateDataSimply () {
    const userInfo = {
        username: 'zs',
        password: '1234589',
        id: 1
    }
    const sqlStr = `UPDATE users SET ? where id=?`
    db.query(sqlStr, [userInfo, userInfo.id], (err, res) => {
        if (err) return console.error(err.message)
        console.log(res)
        if (res.affectedRows) console.log('更改成功');
    })
}

function deleteData () {
    const deleteUserId = [7,9]
    const sqlStr = `DELETE FROM users where id = ?`
    db.query(sqlStr, deleteUserId, (err, res) => {
        if (err) return console.error(err.message)
        console.log(res)
        // if (res.affectedRows) console.log('更改成功');
    })
}

function markAsDelete() {
    const sqlStr = 'UPDATE users SET status=1 where id=?'
    const userId = 1
    db.query(sqlStr, userId, (err, res) => {
        if (err) return console.error(err.message)
        console.log(res)
        if (res.affectedRows) console.log('更改成功');
    })
}

markAsDelete()