const {account} = require("../../../../models");
const bcrypt = require("bcryptjs");
const {promisify} = require("util");
const {generateAuthToken} = require("../../../../util/encryption");

module.exports.verify = async (cardNumber, pin)=>{
    try{
        if(!cardNumber || !pin){
            throw new Error("Invalid cardNumber or pin");
        }
        const card = await account.findOne({
            where: {
                cardNumber,
            }
        });
        if(!card) {
            throw new Error("Card does not exist");
        }
        const compare = await promisify(bcrypt.compare)(pin, card.pin);
        if(!compare) {
            throw new Error("Pin is incorrect");
        }
        return {
            token: await generateAuthToken(card.id),
            amount: card.amount
        }
    }
    catch(e){
        throw e;
    }
}
