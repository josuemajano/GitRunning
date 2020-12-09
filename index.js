const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const PORT = 3000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//Simple route
app.get("/", (req, res) => {
    res.send("Hello Runners!");
});

//listens for request
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
});