"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _envirinment = require("./envirinment.utility");
Object.keys(_envirinment).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _envirinment[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _envirinment[key];
    }
  });
});