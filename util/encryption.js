const jwt = require("jsonwebtoken");
const {session} = require("../models");

module.exports.generateAuthToken = async accountID => {
    try{
        const sessionRecord = await session.create({
            accountID
        });
        const token = jwt.sign({accountID, sessionID: sessionRecord.id}, process.env.secret || "h5b8$O0tb0*B#$5");
        return token;
    }
    catch(e){
        throw e;
    }
}

module.exports.verifyToken = token => {
    try{
        const decode = jwt.verify(token, process.env.secret || "h5b8$O0tb0*B#$5");
        return decode;
    }
    catch(e){
        throw e;
    }
}