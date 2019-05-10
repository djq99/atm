const {account, transaction} = require("../../../../models"); 

module.exports.deposit = async(accountID, amount) => {
    try{
        const cardInfo = await account.findOne({
            where: {
                id: accountID
            }
        });
        if(isNaN(amount) || amount <= 0){
            throw new Error("Invalid amount money");
        }
        const newAmounst = cardInfo.amount + amount;
        //not using await to block each query which can make both to be multithreading.
        let promises = [];
        const transactionPromise = transaction.create({
            accountID,
            type: "deposit",
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