const {session} = require("../../../../models");

module.exports.logout = async (accountID, sessionID)=>{
    try{
        await session.destroy({
            where: {
                accountID,
                id: sessionID
            }
        })
    }
    catch(e){
        throw e;
    }
}
