const sql = require('./db.js')

const Lesson = function (Lesson) {
    this.LessonTitle = Lesson.LessonTitle;
    this.LessonIntroduction = Lesson.LessonIntroduction;
    this.LessonVocabulary = Lesson.LessonVocabulary;
    this.LessonTranscript = Lesson.LessonTranscript;
    this.LessonImage = Lesson.LessonImage;
    this.LessonAudio = Lesson.LessonAudio;
    this.CoursesId = Lesson.CoursesId;
}

Lesson.getAll = result => {
    sql.query("SELECT * FROM Lessons", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Lesson: ", res);
        result(null, res);
    });
};

Lesson.getById = (LessonId, result) => {
    sql.query(`SELECT * FROM Lessons WHERE LessonId = ${LessonId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Lesson: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Lesson with the id
        result({ kind: "not_found" }, null);
    });
};

Lesson.getByCourses = (CoursesId, result) => {
    sql.query(`SELECT * FROM Lessons WHERE CoursesId = ${CoursesId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Lesson: ", res);
        result(null, res);
    });
};

Lesson.create = (newLesson, result) => {
    sql.query("INSERT INTO Lessons SET ?", newLesson, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Lesson: ", { LessonId: res.insertId, ...newLesson });
        result(null, { LessonId: res.insertId, ...newLesson });
    });
};

Lesson.update = (LessonId, Lesson, result) => {
    sql.query(
        "UPDATE Lessons SET ? WHERE LessonId = ?",
        [Lesson, LessonId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Lesson with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated Lesson: ", { LessonId: LessonId, ...Lesson });
            result(null, { LessonId: LessonId, ...Lesson });
        }
    );
};

Lesson.deleteById = (LessonId, result) => {
    sql.query("DELETE FROM Lessons WHERE LessonId = ?", LessonId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Lesson with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted Lesson with id: ", LessonId);
        result(null, res);
    });
};

Lesson.deleteByCourses = (CoursesId, result) => {
    sql.query("DELETE FROM Lessons WHERE CoursesId = ?", CoursesId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Lesson with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted Lesson with CoursesId: ", CoursesId);
        result(null, res);
    });
};


Lesson.deleteAll = result => {
    sql.query("DELETE FROM Lessons", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} Lesson`);
        result(null, res);
    });
};
module.exports = Lesson;