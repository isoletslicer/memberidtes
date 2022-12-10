const { createToken } = require("../helpers/json-web-token")
const { User } = require("../models")

class UserController {

    static async signInMethod(req, res, next) {

        try {
            // dapatkan data dari body
            let bodySignIn = {
                email: req.body.email,
            }

            if (!bodySignIn.email) {
                throw {
                    name: `invalid email`
                }
            }

            // cari by email
            let findUser = await User.findOne({ where: { email: bodySignIn.email } })
            // kalo gaada
            if (!findUser) {
                throw {
                    name: `invalid email/password`
                }
            }

            // bikin token nya
            let emailFind = findUser.email
            const payload = {
                id: findUser.id,
            }
            const access_token = createToken(payload)
            res.status(200).json({ access_token, emailFind })


        } catch (error) {
            next(error)
        }
    }

}



module.exports = UserController;