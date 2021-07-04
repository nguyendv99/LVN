module.exports = app => {
    const Test = require("../controllers/Test.controller.js");

    app.get("/Test", Test.getAll);
    app.get("/Test/:TestId", Test.getById);
    app.post("/Test", Test.create);
    app.put("/Test/:TestId", Test.update);
    app.delete("/Test", Test.deleteAll);
    app.delete("/Test/:TestId", Test.deleteById);

    
  
  };