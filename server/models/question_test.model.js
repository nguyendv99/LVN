const sql = require('./db.js')

const QuestionTest = function (QuestionTest) {
    this.Question = QuestionTest.Question;
    this.Choice = QuestionTest.Choice;
    this.Answer = QuestionTest.Answer;
    this.TestId = QuestionTest.TestId;
    this.ExplainAnswer = QuestionTest.ExplainAnswer;
}

QuestionTest.getAll = result => {
    sql.query("SELECT * FROM QuestionsTest", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("QuestionsTest: ", res);
        result(null, res);
    });
};

QuestionTest.getById = (QuestionTestId, result) => {
    sql.query(`SELECT * FROM QuestionsTest WHERE QuestionTestId = ${QuestionTestId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found QuestionsTest: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found QuestionTest with the id
        result({ kind: "not_found" }, null);
    });
};

QuestionTest.getByTest = (TestId, result) => {
    sql.query(`SELECT * FROM QuestionsTest WHERE TestId = ${TestId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("QuestionTest: ", res);
        result(null, res);
    });
};

QuestionTest.create = (newQuestionTest, result) => {
    sql.query("INSERT INTO QuestionsTest SET ?", newQuestionTest, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created QuestionsTest: ", { QuestionTestId: res.insertId, ...newQuestionTest });
        result(null, { QuestionTestId: res.insertId, ...newQuestionTest });
    });
};

QuestionTest.update = (QuestionTestId, QuestionTest, result) => {
    sql.query(
        "UPDATE QuestionsTest SET ? WHERE QuestionTestId = ?",
        [QuestionTest, QuestionTestId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found QuestionTest with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated QuestionsTest: ", { QuestionTestId: QuestionTestId, ...QuestionTest });
            result(null, { QuestionTestId: QuestionTestId, ...QuestionTest });
        }
    );
};

QuestionTest.deleteById = (QuestionTestId, result) => {
    sql.query("DELETE FROM QuestionsTest WHERE QuestionTestId = ?", QuestionTestId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found QuestionTest with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted QuestionTest with id: ", QuestionTestId);
        result(null, res);
    });
};

QuestionTest.deleteByTest = (TestId, result) => {
    sql.query("DELETE FROM QuestionsTest WHERE TestId = ?", TestId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found QuestionTest with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted QuestionTest with TestId: ", TestId);
        result(null, res);
    });
};


QuestionTest.deleteAll = result => {
    sql.query("DELETE FROM QuestionsTest", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} QuestionTest`);
        result(null, res);
    });
};
module.exports = QuestionTest;