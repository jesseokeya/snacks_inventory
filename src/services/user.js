import logger from 'custom-logger'
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
            if (err) {
                logger.error(`error occured when trying to fetch all users`)
                throw err
            }
            logger.info('got all users from the database')
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
            logger.info('new user successfully created')
            return user
        }).catch(err => { throw err })
    }

    async getUserById(_id) {
        return this.user.findOne({ _id }, (err, user) => {
            if (err) {
                logger.error(`error occured when trying to fetch user ${_id} by id`)
                throw err
            }
            logger.info(`fetched user ${_id} by id`)
            return user
        })
    }
}

export { UserService }