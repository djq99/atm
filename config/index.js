const ENV = process.env.NODE_ENV || "development";

const fs = require("fs");
const path = require("path");

function loadDbConfig() {
    if(process.env.DATABASE_URL) {
        return process.env.DATABASE_URL;
    }

    if(fs.existsSync(path.join(__dirname, "./databaseConfig.js"))) {
        return require("./databaseConfig")[ENV];
    }
}
const envConfig = require(path.join(__dirname, "environments", ENV));
const dbConfig = loadDbConfig();

const config = Object.assign({
    [ENV]: true,
    env: ENV,
    db: dbConfig
}, envConfig);

module.exports = config;
