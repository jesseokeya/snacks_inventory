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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const start = () => {
  _dotenv2.default.config();

  const PORT = process.env.PORT || 3002;
  const app = (0, _express2.default)();

  try {
    _mongoose2.default.connect(process.env.MONGO_URI, { useNewUrlParser: true });
  } catch (err) {
    throw err;
  }

  app.post('/graphql', (0, _expressGraphql2.default)({
    schema: _schema.schema,
    graphiql: false
  })), app.get('/graphql', (0, _expressGraphql2.default)({
    schema: _schema.schema,
    graphiql: true
  })), app.use((0, _morgan2.default)('dev')), app.listen(PORT, () => console.log(`server running on port *${PORT}`));
};

try {
  start();
} catch (err) {
  throw err;
}