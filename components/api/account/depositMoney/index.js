const {deposit} = require("./services");
const authentication = require("../../../../middleware/authentication");
module.exports = {
    method: "post",
    handler: async(req, res) => {
        try {
            const newAmount = await deposit(req.accountID, req.body.amount);
            res.status(200).json({
                status: 200,
                message: "Money has been dopsit successfully",
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
