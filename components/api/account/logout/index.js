const {logout} = require("./services");
const authentication = require("../../../../middleware/authentication");
module.exports = {
    method: "post",
    handler: async(req, res) => {
        try {
            const newAmount = await logout(req.accountID, req.sessionID);
            res.status(200).json({
                status: 200,
                message: "logout successfully",
                data: {
                    newAmount
                }
            });
        }
        catch(e) {
            console.log(e);
            res.status(500).json({
                status: 500,
                message: e.message ? e.message : `Something wrong during ${__dirname}`,
                data: {}
            })
        }
    },
    middlewares: [authentication]
};
