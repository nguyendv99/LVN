const Courses = require("../models/courses.model.js");

module.exports = app => {
    const Syllables = require("../controllers/Syllables.controller.js");

    app.get("/Syllables", Syllables.getAll);
    app.get("/Syllables/:SyllableId", Syllables.getById);
    app.get("/SyllablesByCourses/:CoursesId", Syllables.getByCourses);
    app.post("/Syllables", Syllables.create);
    app.put("/Syllables/:SyllableId", Syllables.update);
    app.delete("/Syllables", Syllables.deleteAll);
    app.delete("/Syllables/:SyllableId", Syllables.deleteById);
    app.delete("/SyllablesByCourses/:CoursesId", Syllables.deleteByCourses);

    
  
  };