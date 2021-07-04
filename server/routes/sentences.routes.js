const Courses = require("../models/courses.model.js");

module.exports = app => {
    const Sentences = require("../controllers/Sentences.controller.js");

    app.get("/Sentences", Sentences.getAll);
    app.get("/Sentences/:SentencesId", Sentences.getById);
    app.get("/SentencesByCourses/:CoursesId", Sentences.getByCourses);
    app.post("/Sentences", Sentences.create);
    app.put("/Sentences/:SentencesId", Sentences.update);
    app.delete("/Sentences", Sentences.deleteAll);
    app.delete("/Sentences/:SentencesId", Sentences.deleteById);
    app.delete("/SentencesByCourses/:CoursesId", Sentences.deleteByCourses);

    
  
  };