const {account} = require("../../../../models");
module.exports.getBalance = async(accountID) => {
    try{
        const accountRecord = await account.findOne({
            where: {
                id: accountID
            }
        });
        return accountRecord.amount;
    }
    catch(e){
        throw e;
    }

}