const sql = require('./db.js')

const Courses = function (courses) {
    this.CoursesTitle = courses.CoursesTitle;
    this.CoursesLevel = courses.CoursesLevel;
    this.CoursesImage = courses.CoursesImage;
}

Courses.getAll = result => {
    sql.query("SELECT * FROM Courses", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Courses: ", res);
        result(null, res);
    });
};

Courses.getById = (CoursesId, result) => {
    sql.query(`SELECT * FROM Courses WHERE CoursesId = ${CoursesId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Courses: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Courses with the id
        result({ kind: "not_found" }, null);
    });
};

Courses.create = (newCourses, result) => {
    sql.query("INSERT INTO Courses SET ?", newCourses, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Courses: ", { CoursesId: res.insertId, ...newCourses });
        result(null, { CoursesId: res.insertId, ...newCourses });
    });
};

Courses.update = (CoursesId, Courses, result) => {
    sql.query(
        "UPDATE Courses SET ? WHERE CoursesId = ?",
        [Courses, CoursesId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Courses with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated Courses: ", { CoursesId: CoursesId, ...Courses });
            result(null, { CoursesId: CoursesId, ...Courses });
        }
    );
};

Courses.deleteById = (CoursesId, result) => {
    sql.query("DELETE FROM Courses WHERE CoursesId = ?", CoursesId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Courses with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted Courses with id: ", CoursesId);
        result(null, res);
    });
};


Courses.deleteAll = result => {
    sql.query("DELETE FROM Courses", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} Courses`);
        result(null, res);
    });
};
module.exports = Courses;