'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const User = new _mongoose2.default.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    ip: {
        type: String
    },
    faveSnack: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        required: true
    }
});

const UserSchema = _mongoose2.default.model('User', User);

exports.UserSchema = UserSchema;