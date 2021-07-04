const db = require('../models/db.js')
const jwt = require('jsonwebtoken')

exports.login = (req, res) => {

    let username = req.body.username;
    let password = req.body.password;

    let sql = 'SELECT * FROM user WHERE Username = ? AND Password = ?'
    db.query(sql, [username, password], (err, data) => {
        if (data.length > 0) {
            let token = jwt.sign({
                username: data[0].Username,
            }, 'nguyen')
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

exports.signup = (req, res) => {

    let Username = req.body.Username;
    let Email = req.body.Email;
    // let password = req.body.password;

    let sql = 'SELECT * FROM user WHERE Username = ? AND Email = ?'
    db.query(sql, [Username, Email], (err, data) => {
        if (data.length > 0) {
            console.log(data);
            return res.send("Tên đăng nhập hoặc email đã tồn tại")
        } else {
            let sql = 'INSERT INTO User SET ?'
            db.query(sql, req.body, (err, res) => {
                if(res){
                }
                // if(err){
                //     console.log("error: ", err);
                //     return res.send("Tên đăng nhập hoặc email đã tồn tại")
                // }
                
            })
            console.log("tạo tài khoản thành công");
            res.send("SignUpEd");
            
        }
    })

}

exports.getAll = (req, res) => {

    let sql = 'SELECT * FROM user'
    db.query(sql, (err, data) => {
        if (data.length > 0) {
            console.log(data);
            return res.send(data)
        } else {
            let sql = 'INSERT INTO User SET ?'
            db.query(sql, req.body, (err, res) => {
                if(res){
                }
                // if(err){
                //     console.log("error: ", err);
                //     return res.send("Tên đăng nhập hoặc email đã tồn tại")
                // }
                
            })
            console.log("tạo tài khoản thành công");
            res.send("SignUpEd");
            
        }
    })

}
exports.getAll = (req, res) => {

    let sql = 'SELECT * FROM user'
    db.query(sql, (err, data) => {
        if (data.length > 0) {
            console.log(data);
            return res.send(data)
        } else {
            let sql = 'INSERT INTO User SET ?'
            db.query(sql, req.body, (err, res) => {
                if(res){
                }
                // if(err){
                //     console.log("error: ", err);
                //     return res.send("Tên đăng nhập hoặc email đã tồn tại")
                // }
                
            })
            console.log("tạo tài khoản thành công");
            res.send("SignUpEd");
            
        }
    })

}