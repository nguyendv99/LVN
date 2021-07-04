const sql = require('./db.js')

const Sentences = function (Sentences) {
    this.SentencesTitle = Sentences.SentencesTitle;
    this.Sentences = Sentences.Sentences;
    this.SentencesVocabulary = Sentences.SentencesVocabulary;
    this.CoursesId = Sentences.CoursesId;
}

Sentences.getAll = result => {
    sql.query("SELECT * FROM Sentences", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Sentences: ", res);
        result(null, res);
    });
};

Sentences.getById = (SentencesId, result) => {
    sql.query(`SELECT * FROM Sentences WHERE SentencesId = ${SentencesId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Sentences: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Sentences with the id
        result({ kind: "not_found" }, null);
    });
};

Sentences.getByCourses = (CoursesId, result) => {
    sql.query(`SELECT * FROM Sentences WHERE CoursesId = ${CoursesId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Sentences: ", res);
        result(null, res);
    });
};

Sentences.create = (newSentences, result) => {
    sql.query("INSERT INTO Sentences SET ?", newSentences, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Sentences: ", { SentencesId: res.insertId, ...newSentences });
        result(null, { SentencesId: res.insertId, ...newSentences });
    });
};

Sentences.update = (SentencesId, Sentences, result) => {
    sql.query(
        "UPDATE Sentences SET ? WHERE SentencesId = ?",
        [Sentences, SentencesId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Sentences with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated Sentences: ", { SentencesId: SentencesId, ...Sentences });
            result(null, { SentencesId: SentencesId, ...Sentences });
        }
    );
};

Sentences.deleteById = (SentencesId, result) => {
    sql.query("DELETE FROM Sentences WHERE SentencesId = ?", SentencesId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Sentences with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted Sentences with id: ", SentencesId);
        result(null, res);
    });
};

Sentences.deleteByCourses = (CoursesId, result) => {
    sql.query("DELETE FROM Sentences WHERE CoursesId = ?", CoursesId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Sentences with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted Sentences with CoursesId: ", CoursesId);
        result(null, res);
    });
};


Sentences.deleteAll = result => {
    sql.query("DELETE FROM Sentences", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} Sentences`);
        result(null, res);
    });
};
module.exports = Sentences;