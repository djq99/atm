module.exports = (sequelize, DataTypes) => {
    return sequelize.define("transaction", {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        accountID: {
            type: DataTypes.INTEGER(16),
            allowNull: false
        },
        type:{
            type: DataTypes.ENUM("deposit", "withdrawal"),
            allowNull: false
        },
        amount: {
            type: DataTypes.FLOAT(20),
            allowNull: false
        }
    }, {
        tableName: "transaction",
        timestamps: true
    });
};
