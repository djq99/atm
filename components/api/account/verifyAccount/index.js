const {verify} = require("./services");
module.exports = {
    method: "post",
    handler: async(req, res) => {
        try {
            const {token, amount} = await verify(req.body.cardNumber, req.body.pin);
            res.header("Authorization", token);
            res.status(200).json({
                status: 200,
                message: "Verification succeed!",
                data: {
                    token, amount
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
    }
};
