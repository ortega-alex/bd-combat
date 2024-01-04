"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _http = _interopRequireDefault(require("http"));
var _socket = require("socket.io");
var _cors = _interopRequireDefault(require("cors"));
var _morgan = _interopRequireDefault(require("morgan"));
var _path = _interopRequireDefault(require("path"));
var _routes = require("./routes");
var app = (0, _express["default"])();
var httpServer = _http["default"].Server(app);
var io = new _socket.Server(httpServer);
// onSocket(io);

// MIDDLEWARES
app.use((0, _cors["default"])());
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));

// STATIC FILES
app.use(_express["default"]["static"](_path["default"].join(__dirname, '/public')));

// PUBLIC ROUTES
app.use('/api/v1', _routes.publicRoute);

// GLOBAL VARIABLES
app.locals.io = io;
var _default = exports["default"] = httpServer;