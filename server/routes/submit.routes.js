module.exports = app => {
    const Submit = require("../controllers/submit.controller.js");

    app.post("/CheckScore", Submit.checkScore);
    app.post("/AddSubmit", Submit.add);
    app.put("/UpdateSubmit/:SubmitId", Submit.update);
    app.get("/Submit/:UserId", Submit.getSubmit)

};