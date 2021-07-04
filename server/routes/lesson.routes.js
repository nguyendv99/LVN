const Courses = require("../models/courses.model.js");

module.exports = app => {
    const Lesson = require("../controllers/Lesson.controller.js");

    app.get("/Lesson", Lesson.getAll);
    app.get("/Lesson/:LessonId", Lesson.getById);
    app.get("/LessonByCourses/:CoursesId", Lesson.getByCourses);
    app.post("/Lesson", Lesson.create);
    app.put("/Lesson/:LessonId", Lesson.update);
    app.delete("/Lesson", Lesson.deleteAll);
    app.delete("/Lesson/:LessonId", Lesson.deleteById);
    app.delete("/LessonByCourses/:CoursesId", Lesson.deleteByCourses);

    
  
  };