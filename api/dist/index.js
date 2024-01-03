"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _app = _interopRequireDefault(require("./app"));
var _utilities = require("./utilities");
_app["default"].listen(_utilities.PORT, function () {
  console.log("Server on port ".concat(_utilities.PORT));
});