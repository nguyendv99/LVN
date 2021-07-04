const sql = require('./db.js')



exports.login = (req, res) => {

    let username = req.body.username;
    let password = req.body.password;
    let sql = 'SELECT * FROM user WHERE Username = ? AND Password = ?'
    db.query(sql, [username, password], (err, data) => {
        if (data.length > 0) {
            let token = jwt.sign({
                username: data[0].Username,
            }, 'nguyen')
            console.log(Username);
            return res.status(200).json({
                UserId: data[0].UserId,
                username: data[0].Username,
                token: token
            })
        } else {
            return res.send("Tài khoản hoặc mật khẩu không chính xác")
        }
    })

}