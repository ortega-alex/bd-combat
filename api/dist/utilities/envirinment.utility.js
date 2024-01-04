"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TOKEN = exports.PORT = exports.NODE_ENV = exports.DB_CONFING = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var PORT = exports.PORT = process.env.PORT || 4000;
var NODE_ENV = exports.NODE_ENV = process.env.NODE_ENV || 'development';
var DB_CONFING = exports.DB_CONFING = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'abc123**',
  database: process.env.DB_NAME || 'bd_combat',
  port: process.env.DB_PORT || 3307
};
var TOKEN = exports.TOKEN = process.env.TOKEN || 'e2a366fb-aa7e-11ee-9911-0242ac110002';