const mysql = require('mysql');

// require('.dotenv')config()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "lvndb"
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = db