const Courses = require("../models/courses.model.js");

module.exports = app => {
    const QuestionCourses = require("../controllers/question_courses.controller.js");

    app.get("/QuestionCourses", QuestionCourses.getAll);
    app.get("/QuestionCourses/:QuestionCoursesId", QuestionCourses.getById);
    app.get("/QuestionCoursesByCourses/:CoursesId", QuestionCourses.getByCourses);
    app.post("/QuestionCourses", QuestionCourses.create);
    app.put("/QuestionCourses/:QuestionCoursesId", QuestionCourses.update);
    app.delete("/QuestionCourses", QuestionCourses.deleteAll);
    app.delete("/QuestionCourses/:QuestionCoursesId", QuestionCourses.deleteById);
    app.delete("/QuestionCoursesByCourses/:CoursesId", QuestionCourses.deleteByCourses);

    
  
  };