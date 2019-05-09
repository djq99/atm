const ModelsLoader = require("../util/modelsLoader");
const Sequelize = require("sequelize");
const { db: config } = require("../config");
if(config) {
    const sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        {
            host: config.host,
            dialect: "mysql",
            port: config.port || 3306,
            logging: null,
            pool: {
                max: 5,
                min: 0,
                idle: 20000,
                acquire: 20000
            },
            freezeTableName: true,
            handleDisconnects: true
        }
    );
    module.exports = ModelsLoader.load({
        sequelize,
        baseFolder: __dirname
    });
} else {
    log.error("Database configuration not found, disabling database.");
}
