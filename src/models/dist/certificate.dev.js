"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Certificate = function Certificate() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var authority = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var is_expire = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var issued_at = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
  var expired_at = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
  var certificate_id = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "";
  var description = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : "";

  _classCallCheck(this, Certificate);

  this.name = name;
  this.authority = authority;
  this.is_expire = is_expire;
  this.issued_at = issued_at;
  this.expired_at = expired_at;
  this.certificat_id = certificate_id;
  this.description = description;
};

exports["default"] = Certificate;