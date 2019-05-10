const {account, transaction} = require("../../../../models");
const moment = require("moment");
const op = require("sequelize").Op;

module.exports.withdrawal = async(accountID, amount) => {
    try{
        const cardInfo = await account.findOne({
            where: {
                id: accountID
            }
        });
        if(isNaN(amount) || amount <= 0){
            throw new Error("Invalid amount money");
        }
        const newAmounst = cardInfo.amount - amount;
        if(newAmounst < 0){
            throw new Error("The balance is not enough");
        }

        //check if daily withdrawal over 1000
        const sum = await transaction.sum("amount", {
            where: {
                [op.and]: [
                    {
                        createdAt:{
                            [op.between]: [moment(new Date()).subtract(1, "day").format("YYYY-MM-DD HH:mm:ss"), moment(new Date()).format("YYYY-MM-DD HH:mm:ss")]
                        }
                    },
                    {
                        type: "withdrawal"
                    },
                    {
                        accountID
                    }
                ]
            }
        })
        if(sum + amount > 1000){
            throw new Error("It's over daily limit 1000");
        }

        //not using await to block each query which can make both to be multithreading.
        let promises = [];
        const transactionPromise = transaction.create({
            accountID,
            type: "withdrawal",
            amount
        });
        promises.push(transactionPromise);
        const updatePromise =  cardInfo.update({
            amount: newAmounst
        });
        promises.push(updatePromise);
        await Promise.all(promises);
        return newAmounst;
    }
    catch(e){
        throw e;
    }
}