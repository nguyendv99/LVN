module.exports = app => {
    const QuestionTest = require("../controllers/question_test.controller.js");

    app.get("/QuestionTest", QuestionTest.getAll);
    app.get("/QuestionTest/:QuestionTestId", QuestionTest.getById);
    app.get("/QuestionTestByTest/:TestId", QuestionTest.getByTest);
    app.post("/QuestionTest", QuestionTest.create);
    app.put("/QuestionTest/:QuestionTestId", QuestionTest.update);
    app.delete("/QuestionTest", QuestionTest.deleteAll);
    app.delete("/QuestionTest/:QuestionTestId", QuestionTest.deleteById);
    app.delete("/QuestionTestByTest/:TestId", QuestionTest.deleteByTest);

    
  
  };