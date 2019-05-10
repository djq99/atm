const {account, session} = require("../models");
const {verifyToken} = require("../util/encryption");

module.exports = async(req, res, next) => {
    try{
        const token = req.header("Authorization");
        if(!token){
            throw new Error("Auth token missing");
        }
        const decoded = verifyToken(token);
        const accountID = decoded.accountID;
        const cardInfo = await account.findOne({
            where: {
                id: accountID
            }
        });
        if(!cardInfo){
            throw new Error("card does not exist");
        }
        const sessionID = decoded.sessionID;
        const sessionRecord = await session.findOne({
            where: {
                accountID,
                id: sessionID
            }
        });
        if(!sessionRecord){
            throw new Error("Invalid Session");
        }
        req.sessionID = sessionID;
        req.accountID = cardInfo.id;
        return next();
    }
    catch(e){
        console.log(e);
        res.status(401).json({
            status: 401,
            message: `Not authrorized. Reason: ${e}`,
            data: {}
        })
    }
}
