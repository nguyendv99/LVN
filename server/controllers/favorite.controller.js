const Favorites = require("../models/favorite.model.js");


exports.getOfUser = (req, res) => {
    // res.send(req.params.UserId);
    Favorites.getOfUser(req.params.UserId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Favorite with id ${req.params.UserId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Favorite with id " + req.params.UserId
                });
            }
        } else res.send(data);
    });
};


exports.checkSave = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log("UserId :" + req.body.UserId + " CoursesId :" + req.body.CoursesId);
    
    Favorites.checkSave(req.body.UserId, req.body.CoursesId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Favorites.`
                });
            } else {
                res.status(500).send({
                    message: "Could not check Favorites"
                });
            }
        } else res.send(data);
    });
}


exports.add = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    
    const Favorite = new Favorites({
        UserId: req.body.UserId,
        CoursesId: req.body.CoursesId,
    });
    Favorites.add(Favorite, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Favorites."
            });
        else res.send(data);
    });
};

exports.delete = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    
    Favorites.delete(req.body.UserId, req.body.CoursesId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Favorites.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Favorites"
                });
            }
        } else res.send({ message: `Favorites was deleted successfully!` });
    });
};


