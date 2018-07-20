'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthService = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _jwtDecode = require('jwt-decode');

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuthService {
    constructor(options = {}) {
        _dotenv2.default.config(), this.options = options;
    }

    async signJwt(data) {
        return _jsonwebtoken2.default.sign(data, process.env.JWT_SECRET, { expiresIn: 3600 });
    }

    async decodeJwt(data) {
        return (0, _jwtDecode2.default)(data);
    }

    async generateAuthHeader() {
        const { sub, subType } = process.env;
        const token = `Bearer ${await this.signJwt({ sub, subType })}`;
        return token;
    }

    async authMiddleware(context) {
        const { req } = context;

        return !req.headers.authorization && (req.headers.authorization = await this.setAuthHeaders(req)), await this._isValidAuthToken(req.headers.authorization);
    }

    async setAuthHeaders(req) {
        let token = '';
        const url = req.protocol + '://' + req.get('host') + req.originalUrl;
        return url.includes(`http://localhost:${process.env.PORT}/graphql`) ? await this.generateAuthHeader() : token;
    }

    async _isValidAuthToken(token) {
        const decoded = await this.decodeJwt(token);
        return decoded.sub === 'inventory-auth' && decoded.subType === 'service';
    }
}

exports.AuthService = AuthService;