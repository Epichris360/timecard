"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants"));

var initialState = {
	role: "normal",
	id: ""
};
module.exports = function (_x, action) {
	var state = arguments[0] === undefined ? initialState : arguments[0];


	switch (action.type) {

		case constants.CURRENT_USER_RECEIVED:
			return action.data;

		case constants.USER_CREATED:
			return action.data;
		case constants.LOGOUT_USER:
			console.log("user logged out?", action.data);
			return {};

		default:
			return state;
	}
};