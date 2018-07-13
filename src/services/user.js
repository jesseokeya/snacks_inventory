import gravatar from 'gravatar'
import bcrypt from 'bcrypt'
import { UserSchema } from '../models/users'

class UserService extends UserSchema {

    constructor(options = {}) {
        super()
        this.user = this.model('User')
    }

    async getUsers() {
        return this.user.find({}, (err, users) => {
            if (err) { throw err }
            return users
        })
    }

    async encryptPassword(password) {
        return bcrypt.hashSync(password, 10)
    }

    async createUser(user) {
        const newUser = new this.user(user)
        newUser.avatar = gravatar.url(user.email, {
            s: '250', // size
            r: 'pg', // rating
            d: 'identicon' // default
        })
        newUser.dateCreated = new Date().toISOString()
        newUser.dateUpdated = new Date().toISOString()
        newUser.password = await this.encryptPassword(user.password)
        return newUser.save().then((user) => {
            return user
        }).catch(err => { throw err })
    }

    async getUserById(_id) {
        return this.user.findOne({ _id }, (err, user) => {
            if (err) { throw err }
            return user
        })
    }
}

export { UserService }