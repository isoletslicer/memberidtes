const jwt = require('jsonwebtoken')
const INI_KUNCI_RAHASIA = 'semoga_lolos_tes'

const createToken = (payload) => { return jwt.sign(payload, INI_KUNCI_RAHASIA) }
const verifyToken = (token) => { return jwt.verify(token, INI_KUNCI_RAHASIA) }

module.exports = {
  createToken,
  verifyToken
}