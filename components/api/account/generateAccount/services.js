const {account} = require("../../../../models"); 
const bcrypt = require("bcryptjs");
const {promisify} = require("util");

module.exports.generateAccount = async() => {
    try{
        let randomNumber = Math.floor(Math.random()*9000000000000000) + 1000000000000000;
        // check if account exists then try again
        while(await checkAccountExist(randomNumber)){
            randomNumber = Math.floor(Math.random()*9000000000000000) + 1000000000000000;
        }
        const pin = `${Math.floor(Math.random()*900000) + 100000}`;
        const salt = await promisify(bcrypt.genSalt)(10);
        const encryptedPin = await promisify(bcrypt.hash)(pin, salt);
        await account.create({
            cardNumber: randomNumber,
            pin: encryptedPin,
            amount: 0
        });
        return {
            cardNumber: randomNumber,
            pin: pin,
        };
    }
    catch(e){
        throw e;
    }
}
const checkAccountExist = async (cardNumber)=> {
    try{
        const userAccount = await account.findOne({
            where: {
                cardNumber
            }
        });
        if(userAccount){
            return true;
        }
        else{
            return false;
        }
    }
    catch(e){
        console.log(e);
    }
}
