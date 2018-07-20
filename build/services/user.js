'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserService = undefined;

var _customLogger = require('custom-logger');

var _customLogger2 = _interopRequireDefault(_customLogger);

var _gravatar = require('gravatar');

var _gravatar2 = _interopRequireDefault(_gravatar);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _users = require('../models/users');

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserService extends _users.UserSchema {

    constructor(options = {}) {
        if (super(), this.user = this.model('User'), !(0, _lodash.isNil)(options.AuthService)) {
            const { AuthService } = options;
            this.authService = new AuthService();
        }
    }

    async getUsers() {
        return this.user.find({}, (err, users) => {
            if (err) throw _customLogger2.default.error(`error occured when trying to fetch all users`), err;

            return _customLogger2.default.info('got all users from the database'), users;
        });
    }

    async encryptPassword(password) {
        return _bcrypt2.default.hashSync(password, 10);
    }

    async createUser(user) {
        const newUser = new this.user(user);

        return newUser.avatar = _gravatar2.default.url(user.email, {
            s: '250', // size
            r: 'pg', // rating
            d: 'identicon' // default
        }), newUser.dateCreated = new Date().toISOString(), newUser.dateUpdated = new Date().toISOString(), newUser.password = await this.encryptPassword(user.password), newUser.save().then(user => (_customLogger2.default.info('new user successfully created'), user)).catch(err => {
            throw err;
        });
    }

    async getUserById(_id) {
        return this.user.findOne({ _id }, (err, user) => {
            if (err) throw _customLogger2.default.error(`error occured when trying to fetch user ${_id} by id`), err;

            return _customLogger2.default.info(`fetched user ${_id} by id`), user;
        });
    }

    async deleteUser(_id) {
        return this.user.deleteOne({ _id }, err => {
            if (err) throw _customLogger2.default.error(`error occured when trying to delete user ${_id} by id`), err;

            _customLogger2.default.info(`user ${_id} was successfully deleted`);
        });
    }

    async updateUser(params) {
        const _id = params.id;
        const dataUpdated = {};
        for (let param in params) !(0, _lodash.isNil)(param) && !(0, _lodash.isNil)(params[param]) && (dataUpdated[param] = params[param]);
        return this.user.updateOne({ _id }, dataUpdated, (err, updated) => {
            if (err) throw _customLogger2.default.error(`error occured when trying to update user ${_id}`), err;

            return _customLogger2.default.info(`user ${_id} was successfully updated`), updated;
        });
    }

    async login(credentials) {}
}

exports.UserService = UserService;