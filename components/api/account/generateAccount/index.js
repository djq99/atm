const {generateAccount} = require("./services");
module.exports = {
    method: "post",
    handler: async(req, res) => {
        try {
            const newAccount = await generateAccount();
            res.status(200).json({
                status: 200,
                message: "Account generated successfully",
                data: newAccount
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
    }
};
