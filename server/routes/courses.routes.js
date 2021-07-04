module.exports = app => {
    const Courses = require("../controllers/courses.controller.js");

    app.get("/Courses", Courses.getAll);
    app.get("/Courses/:CoursesId", Courses.getById);
    app.post("/Courses", Courses.create);
    app.put("/Courses/:CoursesId", Courses.update);
    app.delete("/Courses", Courses.deleteAll);
    app.delete("/Courses/:CoursesId", Courses.deleteById);

    
  
  };