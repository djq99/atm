module.exports = (sequelize, DataTypes) => {
    return sequelize.define("session", {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        accountID: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
    }, {
        tableName: "session",
        timestamps: true
    });
};
