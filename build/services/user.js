'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserService = undefined;

var _users = require('../models/users');

var _gravatar = require('gravatar');

var _gravatar2 = _interopRequireDefault(_gravatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserService extends _users.UserSchema {

    constructor(options = {}) {
        super(), this.user = this.model('User');
    }

    async getUsers() {
        return this.user.find({}, (err, users) => {
            if (err) throw err;
            return users;
        });
    }

    async createUser(user) {
        const newUser = new this.user(user);

        return newUser.avatar = _gravatar2.default.url(user.email, {
            s: '250', // size
            r: 'pg', // rating
            d: 'identicon' // default
        }), newUser.dateCreated = new Date().toISOString(), newUser.dateUpdated = new Date().toISOString(), newUser.save().then(user => user).catch(err => {
            throw err;
        });
    }
}

exports.UserService = UserService;