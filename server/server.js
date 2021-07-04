const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')

const app = express();
app.use(cors())


// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});


require("./routes/courses.routes.js")(app);
require("./routes/test.routes.js")(app);
require("./routes/lesson.routes.js")(app);
require("./routes/syllables.routes.js")(app);
require("./routes/sentences.routes.js")(app);
require("./routes/question_courses.routes.js")(app);
require("./routes/question_test.routes.js")(app);
require("./routes/favorite.routes.js")(app);
require("./routes/user.routes.js")(app);
require("./routes/submit.routes.js")(app);


// set port, listen for requests
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});