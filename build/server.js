'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = require('./schema');

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _customLogger = require('custom-logger');

var _customLogger2 = _interopRequireDefault(_customLogger);

var _index = require('./services/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const start = authService => {
  _dotenv2.default.config();

  const PORT = process.env.PORT || 3002;
  const app = (0, _express2.default)();

  app.use((0, _morgan2.default)('dev'));


  try {
    _mongoose2.default.connect(process.env.MONGO_URI, { useNewUrlParser: true }), _customLogger2.default.info('mongo connected succesfully');
  } catch (err) {
    throw _customLogger2.default.debug('application could not connect to mongo'), err;
  }

  app.use(async (req, res) => {
    const isAuthenticated = await authService.authMiddleware({ req });
    isAuthenticated ? req.next() : res.status(404).send({
      message: 'unauthorized request'
    });
  }), app.post('/graphql', (0, _expressGraphql2.default)({
    schema: _schema.schema,
    graphiql: false
  })), app.get('/graphql', (0, _expressGraphql2.default)({
    schema: _schema.schema,
    graphiql: true
  })), app.listen(PORT, () => console.log(`server running on port *${PORT}`));
};

try {
  const authService = new _index.AuthService();
  start(authService), _customLogger2.default.info('application started successfully');
} catch (err) {
  throw _customLogger2.default.error('error occured when during application start up'), err;
}