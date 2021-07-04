const sql = require('./db.js')

const QuestionCourses = function (QuestionCourses) {
    this.Question = QuestionCourses.Question;
    this.Choice = QuestionCourses.Choice;
    this.Answer = QuestionCourses.Answer;
    this.CoursesId = QuestionCourses.CoursesId;
}

QuestionCourses.getAll = result => {
    sql.query("SELECT * FROM QuestionsCourses", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("QuestionsCourses: ", res);
        result(null, res);
    });
};

QuestionCourses.getById = (QuestionCoursesId, result) => {
    sql.query(`SELECT * FROM QuestionsCourses WHERE QuestionCouesesId = ${QuestionCoursesId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found QuestionsCourses: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found QuestionCourses with the id
        result({ kind: "not_found" }, null);
    });
};

QuestionCourses.getByCourses = (CoursesId, result) => {
    sql.query(`SELECT * FROM QuestionsCourses WHERE CoursesId = ${CoursesId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("QuestionCourses: ", res);
        result(null, res);
    });
};

QuestionCourses.create = (newQuestionCourses, result) => {
    sql.query("INSERT INTO QuestionsCourses SET ?", newQuestionCourses, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created QuestionsCourses: ", { QuestionCoursesId: res.insertId, ...newQuestionCourses });
        result(null, { QuestionCoursesId: res.insertId, ...newQuestionCourses });
    });
};

QuestionCourses.update = (QuestionCoursesId, QuestionCourses, result) => {
    sql.query(
        "UPDATE QuestionsCourses SET ? WHERE QuestionCouesesId = ?",
        [QuestionCourses, QuestionCoursesId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found QuestionCourses with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated QuestionsCourses: ", { QuestionCoursesId: QuestionCoursesId, ...QuestionCourses });
            result(null, { QuestionCoursesId: QuestionCoursesId, ...QuestionCourses });
        }
    );
};

QuestionCourses.deleteById = (QuestionCoursesId, result) => {
    sql.query("DELETE FROM QuestionsCourses WHERE QuestionCouesesId = ?", QuestionCoursesId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found QuestionCourses with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted QuestionCourses with id: ", QuestionCoursesId);
        result(null, res);
    });
};

QuestionCourses.deleteByCourses = (CoursesId, result) => {
    sql.query("DELETE FROM QuestionsCourses WHERE CoursesId = ?", CoursesId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found QuestionCourses with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted QuestionCourses with CoursesId: ", CoursesId);
        result(null, res);
    });
};


QuestionCourses.deleteAll = result => {
    sql.query("DELETE FROM QuestionsCourses", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} QuestionCourses`);
        result(null, res);
    });
};
module.exports = QuestionCourses;