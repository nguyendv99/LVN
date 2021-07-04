module.exports = app => {
    const User = require("../controllers/User.controller.js");

    app.get("/user", User.getAll);
    app.post("/user/login", User.login);
    app.post("/user/signup", User.signup);
    // app.delete("/Test", Test.deleteAll);
    // app.delete("/Test/:TestId", Test.deleteById);
};