'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./user');

Object.keys(_user).forEach(function (key) {
  key === "default" || key === "__esModule" || Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _user[key];
    }
  });
});

var _product = require('./product');

Object.keys(_product).forEach(function (key) {
  key === "default" || key === "__esModule" || Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _product[key];
    }
  });
});