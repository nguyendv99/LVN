const sql = require('./db.js')

const Syllables = function (Syllable) {
    this.SyllableTitle = Syllable.SyllableTitle;
    this.Syllable = Syllable.Syllable;
    this.SyllableVocabulary = Syllable.SyllableVocabulary;
    this.NumSyllable = Syllable.NumSyllable;
    this.SyllableSentences = Syllable.SyllableSentences;
    this.CoursesId = Syllable.CoursesId;
}

Syllables.getAll = result => {
    sql.query("SELECT * FROM Syllables", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Syllables: ", res);
        result(null, res);
    });
};

Syllables.getById = (SyllableId, result) => {
    sql.query(`SELECT * FROM Syllables WHERE SyllableId = ${SyllableId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Syllables: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Syllables with the id
        result({ kind: "not_found" }, null);
    });
};

Syllables.getByCourses = (CoursesId, result) => {
    sql.query(`SELECT * FROM Syllables WHERE CoursesId = ${CoursesId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Syllables: ", res);
        result(null, res);
    });
};

Syllables.create = (newSyllables, result) => {
    sql.query("INSERT INTO Syllables SET ?", newSyllables, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Syllables: ", { SyllablesId: res.insertId, ...newSyllables });
        result(null, { SyllablesId: res.insertId, ...newSyllables });
    });
};

Syllables.update = (SyllableId, Syllables, result) => {
    sql.query(
        "UPDATE Syllables SET ? WHERE SyllableId = ?",
        [Syllables, SyllableId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Syllables with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated Syllables: ", { SyllablesId: SyllableId, ...Syllables });
            result(null, { SyllableId: SyllableId, ...Syllables });
        }
    );
};

Syllables.deleteById = (SyllableId, result) => {
    sql.query("DELETE FROM Syllables WHERE SyllableId = ?", SyllableId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Syllables with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted Syllables with id: ", SyllableId);
        result(null, res);
    });
};

Syllables.deleteByCourses = (CoursesId, result) => {
    sql.query("DELETE FROM Syllables WHERE CoursesId = ?", CoursesId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Syllables with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted Syllables with CoursesId: ", CoursesId);
        result(null, res);
    });
};


Syllables.deleteAll = result => {
    sql.query("DELETE FROM Syllables", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} Syllables`);
        result(null, res);
    });
};
module.exports = Syllables;