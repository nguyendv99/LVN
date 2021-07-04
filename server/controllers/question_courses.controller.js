const QuestionCourses = require("../models/question_courses.model.js");

exports.getAll = (req, res) => {
    QuestionCourses.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving QuestionCourses."
            });
        else res.send(data);
    });
};

exports.getById = (req, res) => {
    QuestionCourses.getById(req.params.QuestionCoursesId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found QuestionCourses with id ${req.params.QuestionCoursesId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving QuestionCourses with id " + req.params.QuestionCoursesId
                });
            }
        } else res.send(data);
    });
};

exports.getByCourses = (req, res) => {
    console.log(req.params.CoursesId);
    QuestionCourses.getByCourses(req.params.CoursesId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found QuestionCourses with id ${req.params.CoursesId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving QuestionCourses with id " + req.params.CoursesId
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
    QuestionCourses.update(req.params.QuestionCoursesId, new QuestionCourses(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found QuestionCourses with id ${req.params.QuestionCoursesId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating QuestionCourses with id " + req.params.QuestionCoursesId
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
    const syllables = new QuestionCourses({
        Question: req.body.Question,
        Choice: req.body.Choice,
        Answer: req.body.Answer,
        CoursesId: req.body.CoursesId
    });
    QuestionCourses.create(syllables, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the QuestionCourses."
            });
        else res.send(data);
    });
};

exports.deleteById = (req, res) => {
    QuestionCourses.deleteById(req.params.QuestionCoursesId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found QuestionCourses with id ${req.params.QuestionCoursesId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete QuestionCourses with id " + req.params.QuestionCoursesId
                });
            }
        } else res.send({ message: `QuestionCourses was deleted successfully!` });
    });
};

exports.deleteByCourses = (req, res) => {
    QuestionCourses.deleteByCourses(req.params.CoursesId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found QuestionCourses with id ${req.params.CoursesId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete QuestionCourses with id " + req.params.CoursesId
                });
            }
        } else res.send({ message: `QuestionCourses was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    QuestionCourses.deleteAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all QuestionCourses."
            });
        else res.send({ message: `All QuestionCourses were deleted successfully!` });
    });
};