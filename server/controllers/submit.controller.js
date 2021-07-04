const db = require('../models/db.js')
const jwt = require('jsonwebtoken')

exports.getSubmit = (req, res) => {
    let UserId =  req.params.UserId;

    let sql = "SELECT submit.SubmitId, user.UserId, user.Username, tests.TestId, tests.TestTitle, submit.Scores FROM submit INNER JOIN user ON submit.UserId = user.UserId INNER JOIN tests ON tests.TestId = submit.TestId WHERE user.UserId = ?"
    db.query(sql, [UserId],  (err, data) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        return res.send(data);
    })
}

exports.checkScore = (req, res) => {

    let UserId = req.body.UserId;
    let TestId = req.body.TestId;

    let sql = 'SELECT * FROM submit WHERE UserId = ? AND TestId = ?'
    db.query(sql, [UserId, TestId], (err, data) => {
        if (err) {
            console.log("error: ", err);
            return res.send(err);
        }
        if (data.length > 0) {
            return res.send(data[0])
        } else {
            return res.send(false)
        }
    })

}

exports.add = (req, res) => {

    let UserId = req.body.UserId;
    let TestId = req.body.TestId;
    let Scores = req.body.Scores;

    let sql = 'INSERT INTO submit SET UserId = ?, TestId = ?, Scores = ?'
    db.query(sql, [UserId, TestId, Scores], (err, data) => {
        if(err){
            console.log("error: ", err);
                return;
        }
        return res.send("Add submit")
    })

}

exports.update = (req, res) => {

    let UserId = req.body.UserId;
    let TestId = req.body.TestId;
    let Scores = req.body.Scores;
    let SubmitId = req.params.SubmitId;

    let sql = 'UPDATE submit SET UserId = ?, TestId = ?, Scores = ? WHERE SubmitId = ?'
    db.query(sql, [UserId, TestId, Scores, SubmitId], (err, data) => {
        if(err){
            console.log("error: ", err);
            return res.send(err);
        }
        return res.send("update submit")
    })

}


