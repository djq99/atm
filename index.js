const express = require("express");
const config = require("./config");
const routerGenerator = require("./util/routerURLGenerator");
const server = express();
const bodyParser = require("body-parser");
const loaded = require("./models");

//middleware to parse json format
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

//enable CORS
server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
//setup root of the frontend
server.use(express.static("./public/frontend/dist/frontend"));
//load all the models
loaded.database.sync({}).then(() => {
    console.log("Database has been connected");
});

server.get("/", (req, res) => {
    // res.json({
    //     status: 200,
    //     message: "Server is running",
    // });
    // Here is the angular frontend root.
    res.sendFile("index.html", { root: "./public/frontend/dist/frontend"});
});

server.use("/", routerGenerator(express.Router(), `${__dirname}/components`, ""));
//Unknown router will redirect to home
server.use((req, res, next) => {
    res.redirect("/");
    next();
});

const listener = server.listen(config.port, () => {
    console.log(`HTTP server is listening at port ${listener.address().port}`);
});