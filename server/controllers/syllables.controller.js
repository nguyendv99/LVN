const Syllables = require("../models/Syllables.model.js");

exports.getAll = (req, res) => {
    Syllables.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Syllabless."
            });
        else res.send(data);
    });
};

exports.getById = (req, res) => {
    Syllables.getById(req.params.SyllableId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Syllables with id ${req.params.SyllableId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Syllables with id " + req.params.SyllablesId
                });
            }
        } else res.send(data);
    });
};

exports.getByCourses = (req, res) => {
    Syllables.getByCourses(req.params.CoursesId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Syllables with id ${req.params.CoursesId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Syllables with id " + req.params.CoursesId
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body);
    Syllables.update(req.params.SyllableId, new Syllables(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Syllables with id ${req.params.SyllableId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating Syllables with id " + req.params.SyllableId
                });
            }
        } else res.send(data);
    }
    );
};


exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const syllables = new Syllables({
        SyllableTitle: req.body.SyllableTitle,
        Syllable: req.body.Syllable,
        SyllableVocabulary: req.body.SyllableVocabulary,
        NumSyllable: req.body.NumSyllable,
        SyllableSentences: req.body.SyllableSentences,
        CoursesId: req.body.CoursesId
    });
    Syllables.create(syllables, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Syllables."
            });
        else res.send(data);
    });
};

exports.deleteById = (req, res) => {
    Syllables.deleteById(req.params.SyllableId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Syllables with id ${req.params.SyllableId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Syllables with id " + req.params.SyllableId
                });
            }
        } else res.send({ message: `Syllables was deleted successfully!` });
    });
};

exports.deleteByCourses = (req, res) => {
    Syllables.deleteByCourses(req.params.CoursesId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Syllables with id ${req.params.CoursesId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Syllables with id " + req.params.CoursesId
                });
            }
        } else res.send({ message: `Syllables was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Syllables.deleteAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Syllables."
            });
        else res.send({ message: `All Syllabless were deleted successfully!` });
    });
};