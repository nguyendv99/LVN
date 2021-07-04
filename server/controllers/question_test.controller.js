const QuestionTest = require("../models/question_test.model.js");

exports.getAll = (req, res) => {
    QuestionTest.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving QuestionTest."
            });
        else res.send(data);
    });
};

exports.getById = (req, res) => {
    QuestionTest.getById(req.params.QuestionTestId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found QuestionTest with id ${req.params.QuestionTestId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving QuestionTest with id " + req.params.QuestionTestId
                });
            }
        } else res.send(data);
    });
};

exports.getByTest = (req, res) => {
    QuestionTest.getByTest(req.params.TestId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found QuestionTest with id ${req.params.TestId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving QuestionTest with id " + req.params.TestId
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
    QuestionTest.update(req.params.QuestionTestId, new QuestionTest(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found QuestionTest with id ${req.params.QuestionTestId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating QuestionTest with id " + req.params.QuestionTestId
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
    
    const questionTest = new QuestionTest({
        
        Question: req.body.Question,
        Choice: req.body.Choice,
        Answer: req.body.Answer,
        TestId: req.body.TestId,
        ExplainAnswer: req.body.ExplainAnswer
    });
    
    QuestionTest.create(questionTest, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the QuestionTest."
            });
        else res.send(data);
    });
};

exports.deleteById = (req, res) => {
    QuestionTest.deleteById(req.params.QuestionTestId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found QuestionTest with id ${req.params.QuestionTestId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete QuestionTest with id " + req.params.QuestionTestId
                });
            }
        } else res.send({ message: `QuestionTest was deleted successfully!` });
    });
};

exports.deleteByTest = (req, res) => {
    QuestionTest.deleteByTest(req.params.TestId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found QuestionTest with id ${req.params.TestId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete QuestionTest with id " + req.params.TestId
                });
            }
        } else res.send({ message: `QuestionTest was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    QuestionTest.deleteAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all QuestionTest."
            });
        else res.send({ message: `All QuestionTest were deleted successfully!` });
    });
};