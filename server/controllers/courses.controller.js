const Courses = require("../models/courses.model.js");

exports.getAll = (req, res) => {
    Courses.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Coursess."
            });
        else res.send(data);
    });
};

exports.getById = (req, res) => {
    // console.log("user :" +req.body.user);
    Courses.getById(req.params.CoursesId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Courses with id ${req.params.CoursesId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Courses with id " + req.params.CoursesId
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
    Courses.update(req.params.CoursesId, new Courses(req.body), (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Courses with id ${req.params.CoursesId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Courses with id " + req.params.CoursesId
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
    const courses = new Courses({
        CoursesTitle: req.body.CoursesTitle,
        CoursesLevel: req.body.CoursesLevel,
        CoursesImage: req.body.CoursesImage
    });
    Courses.create(courses, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Courses."
            });
        else res.send(data);
    });
};

exports.deleteById = (req, res) => {
    Courses.deleteById(req.params.CoursesId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Courses with id ${req.params.CoursesId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Courses with id " + req.params.CoursesId
                });
            }
        } else res.send({ message: `Courses was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Courses.deleteAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Coursess."
        });
      else res.send({ message: `All Coursess were deleted successfully!` });
    });
  };