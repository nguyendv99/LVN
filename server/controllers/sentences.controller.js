const Sentences = require("../models/Sentences.model.js");

exports.getAll = (req, res) => {
    Sentences.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Sentences."
            });
        else res.send(data);
    });
};

exports.getById = (req, res) => {
    Sentences.getById(req.params.SentencesId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Sentences with id ${req.params.SentencesId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Sentences with id " + req.params.SentencesId
                });
            }
        } else res.send(data);
    });
};

exports.getByCourses = (req, res) => {
    Sentences.getByCourses(req.params.CoursesId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Sentences with id ${req.params.CoursesId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Sentences with id " + req.params.CoursesId
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
    Sentences.update(req.params.SentencesId, new Sentences(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Sentences with id ${req.params.SentencesId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating Sentences with id " + req.params.SentencesId
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
    const syllables = new Sentences({
        SentencesTitle: req.body.SentencesTitle,
        Sentences: req.body.Sentences,
        SentencesVocabulary: req.body.SentencesVocabulary,
        CoursesId: req.body.CoursesId
    });
    Sentences.create(syllables, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Sentences."
            });
        else res.send(data);
    });
};

exports.deleteById = (req, res) => {
    Sentences.deleteById(req.params.SentencesId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Sentences with id ${req.params.SentencesId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Sentences with id " + req.params.SentencesId
                });
            }
        } else res.send({ message: `Sentences was deleted successfully!` });
    });
};

exports.deleteByCourses = (req, res) => {
    Sentences.deleteByCourses(req.params.CoursesId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Sentences with id ${req.params.CoursesId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Sentences with id " + req.params.CoursesId
                });
            }
        } else res.send({ message: `Sentences was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Sentences.deleteAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Sentences."
            });
        else res.send({ message: `All Sentences were deleted successfully!` });
    });
};