import { UserSchema } from '../models/users'
import gravatar from 'gravatar'

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

    async createUser(user) {
        const newUser = new this.user(user)
        newUser.avatar = gravatar.url(user.email, {
            s: '250', // size
            r: 'pg', // rating
            d: 'identicon' // default
        })
        newUser.dateCreated = new Date().toISOString()
        newUser.dateUpdated = new Date().toISOString()
        return newUser.save().then((user) => {
            return user
        }).catch(err => { throw err })
    }
}

export { UserService }