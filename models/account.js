module.exports = (sequelize, DataTypes) => {
    return sequelize.define("account", {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        cardNumber: {
            type: DataTypes.INTEGER(16),
            allowNull: false
        },
        pin: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        amount: {
            type: DataTypes.FLOAT(20),
            allowNull: false
        }
    }, {
        tableName: "account",
        timestamps: true
    });
};
