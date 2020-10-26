"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Address = function Address() {
  var first_line = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var second_line = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var city = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  var zip_code = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
  var state_id = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
  var country = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "";

  _classCallCheck(this, Address);

  this.first_line = first_line;
  this.second_line = second_line;
  this.city = city;
  this.zip_code = zip_code;
  this.state_id = state_id;
  this.contry = country;
};

exports["default"] = Address;