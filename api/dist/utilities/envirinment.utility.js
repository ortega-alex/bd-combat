"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PORT = exports.NODE_ENV = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var PORT = exports.PORT = process.env.PORT || 4000;
var NODE_ENV = exports.NODE_ENV = process.env.NODE_ENV || 'development';