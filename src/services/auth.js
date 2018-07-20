import jwt from 'jsonwebtoken'
import jwtDecode from 'jwt-decode'
import dotenv from 'dotenv'

class AuthService {
    constructor(options = {}) {
        dotenv.config()
        this.options = options
    }

    async signJwt(data) {
        return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: 3600 })
    }

    async decodeJwt(data) {
        return jwtDecode(data)
    }

    async login(credentials) {
        const { email, password } = credentials
    }

    async generateAuthHeader() {
        const { sub, subType } = process.env
        const token = `Bearer ${await this.signJwt({ sub, subType })}`
        return token
    }

    async authMiddleware(context) {
        const { req } = context
        if (!req.headers.authorization) {
            req.headers.authorization = await this.setAuthHeaders(req)
        }
        return await this._isValidAuthToken(req.headers.authorization)
    }

    async setAuthHeaders(req) {
        let token = ''
        const url = req.protocol + '://' + req.get('host') + req.originalUrl
        if (url === `http://localhost:${process.env.PORT}/graphql?`) {
            return await this.generateAuthHeader()
        }
        return token
    }

    async _isValidAuthToken(token) {
        const decoded = await this.decodeJwt(token)
        return decoded.sub === 'inventory-auth' && decoded.subType === 'service'
    }
}

export { AuthService }