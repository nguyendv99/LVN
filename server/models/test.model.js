const sql = require('./db.js')

const Test = function (Test) {
    this.TestTitle = Test.TestTitle;
    this.TestLevel = Test.TestLevel;
    this.TestIntroduction = Test.TestIntroduction;
}

Test.getAll = result => {
    sql.query("SELECT * FROM Tests", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Test: ", res);
        result(null, res);
    });
};

Test.getById = (TestId, result) => {
    sql.query(`SELECT * FROM Tests WHERE TestId = ${TestId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Test: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Test with the id
        result({ kind: "not_found" }, null);
    });
};

Test.create = (newTest, result) => {
    sql.query("INSERT INTO Tests SET ?", newTest, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Test: ", { TestId: res.insertId, ...newTest });
        result(null, { TestId: res.insertId, ...newTest });
    });
};

Test.update = (TestId, Test, result) => {
    sql.query(
        "UPDATE Tests SET ? WHERE TestId = ?",
        [Test, TestId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Test with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated Test: ", { TestId: TestId, ...Test });
            result(null, { TestId: TestId, ...Test });
        }
    );
};

Test.deleteById = (TestId, result) => {
    sql.query("DELETE FROM Tests WHERE TestId = ?", TestId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Test with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted Test with id: ", TestId);
        result(null, res);
    });
};


Test.deleteAll = result => {
    sql.query("DELETE FROM Tests", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} Test`);
        result(null, res);
    });
};
module.exports = Test;