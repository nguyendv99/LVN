const Test = require("../models/test.model.js");

exports.getAll = (req, res) => {
    Test.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Tests."
            });
        else res.send(data);
    });
};

exports.getById = (req, res) => {
    Test.getById(req.params.TestId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Test with id ${req.params.TestId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Test with id " + req.params.TestId
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
    Test.update(req.params.TestId, new Test(req.body), (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Test with id ${req.params.TestId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Test with id " + req.params.TestId
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
    const test = new Test({
        TestTitle: req.body.TestTitle,
        TestLevel: req.body.TestLevel,
        TestIntroduction: req.body.TestIntroduction
    });
    Test.create(test, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Test."
            });
        else res.send(data);
    });
};

exports.deleteById = (req, res) => {
    Test.deleteById(req.params.TestId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Test with id ${req.params.TestId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Test with id " + req.params.TestId
                });
            }
        } else res.send({ message: `Test was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Test.deleteAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Tests."
        });
      else res.send({ message: `All Tests were deleted successfully!` });
    });
  };