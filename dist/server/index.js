"use strict";

require("./envVariable");

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _webpack = _interopRequireDefault(require("../../config/webpack.dev"));

var _webpack2 = _interopRequireDefault(require("webpack"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var compiler = (0, _webpack2["default"])(_webpack["default"]);

if (process.env !== 'production') {
  var webpackDevMiddleware = require('webpack-dev-middleware')(compiler, _webpack["default"].devServer);

  var webpackHotMiddleware = require('webpack-hot-middleware')(compiler);

  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddleware);
}

var staticMiddleware = _express["default"]["static"](_path["default"].resolve(__dirname, '../../dist'));

app.use(staticMiddleware);
var port = process.env.PORT || 3000;
app.listen(port, function () {
  return console.log("Server is listening at ".concat(port));
});