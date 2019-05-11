const {getBalance} = require("./services");
const authentication = require("../../../../middleware/authentication");
module.exports = {
    method: "post",
    handler: async(req, res) => {
        try {
            const balance = await getBalance(req.accountID);
            res.status(200).json({
                status: 200,
                message: "Account balance has been fetched successfully",
                data: balance
            });
        }
        catch(e) {
            console.log(e);
            res.status(500).json({
                status: 500,
                message: e.messagee ? e.message : `Something wrong during ${__dirname}`,
                data: {}
            })
        }
    },
    middlewares: [authentication]

};
