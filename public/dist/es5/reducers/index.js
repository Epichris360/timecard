"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
	Export your reducers here
* * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/


var userReducer = _interopRequire(require("./userReducer"));

var projectsReducer = _interopRequire(require("./projectsReducer"));

exports.userReducer = userReducer;
exports.projectsReducer = projectsReducer;
Object.defineProperty(exports, "__esModule", {
	value: true
});