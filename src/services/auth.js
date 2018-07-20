import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

class AuthService {
    constructor(options = {}) {
        dotenv.config()
        this.userService = options.userService
    }

    async signJwt(data) {
        return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: 3600 })
    }

    async login(credentials) {
        const { email, password } = credentials
    }

    async generateAuthHeader() {
        const { sub, subType } = process.env
        const token = `Bearer ${await this.signJwt({ sub, subType })}`
        return token
    }
}

export { AuthService }