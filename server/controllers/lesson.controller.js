const Lesson = require("../models/Lesson.model.js");

exports.getAll = (req, res) => {
    Lesson.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Lessons."
            });
        else res.send(data);
    });
};

exports.getById = (req, res) => {
    Lesson.getById(req.params.LessonId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Lesson with id ${req.params.LessonId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Lesson with id " + req.params.LessonId
                });
            }
        } else res.send(data);
    });
};

exports.getByCourses = (req, res) => {
    Lesson.getByCourses(req.params.CoursesId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Lesson with id ${req.params.CoursesId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Lesson with id " + req.params.CoursesId
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
    Lesson.update(req.params.LessonId, new Lesson(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Lesson with id ${req.params.LessonId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating Lesson with id " + req.params.LessonId
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
    const lesson = new Lesson({
        LessonTitle: req.body.LessonTitle,
        LessonIntroduction: req.body.LessonIntroduction,
        LessonVocabulary: req.body.LessonVocabulary,
        LessonTranscript: req.body.LessonTranscript,
        LessonImage: req.body.LessonImage,
        LessonAudio: req.body.LessonAudio,
        CoursesId: req.body.CoursesId
    });
    Lesson.create(lesson, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Lesson."
            });
        else res.send(data);
    });
};

exports.deleteById = (req, res) => {
    Lesson.deleteById(req.params.LessonId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Lesson with id ${req.params.LessonId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Lesson with id " + req.params.LessonId
                });
            }
        } else res.send({ message: `Lesson was deleted successfully!` });
    });
};

exports.deleteByCourses = (req, res) => {
    Lesson.deleteByCourses(req.params.CoursesId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Lesson with id ${req.params.CoursesId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Lesson with id " + req.params.CoursesId
                });
            }
        } else res.send({ message: `Lesson was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Lesson.deleteAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Lessons."
            });
        else res.send({ message: `All Lessons were deleted successfully!` });
    });
};