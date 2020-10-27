"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _auth_header = _interopRequireDefault(require("./auth_header"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var API_URL = process.env.NODE_ENV === "production" ? "https://holbie.tech/api/v1/" : "http://localhost:5000/api/v1";

var StudentService =
/*#__PURE__*/
function () {
  function StudentService(name) {
    _classCallCheck(this, StudentService);

    this.name = name;
  }

  _createClass(StudentService, [{
    key: "all",
    value: function all(id) {
      var api = [API_URL, id, this.name].join("/");
      return _axios["default"].get(api, {
        headers: (0, _auth_header["default"])()
      });
    }
  }, {
    key: "create",
    value: function create(data, id) {
      var api = [API_URL, id, this.name].join("/");
      return _axios["default"].post(api, data, {
        headers: (0, _auth_header["default"])()
      });
    }
  }, {
    key: "get",
    value: function get(id) {
      var api = [API_URL, this.name, id].join("/");
      return _axios["default"].get(api, {
        headers: (0, _auth_header["default"])()
      });
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      var api = [API_URL, this.name, id].join("/");
      return _axios["default"]["delete"](api, {
        headers: (0, _auth_header["default"])()
      });
    }
  }, {
    key: "update",
    value: function update(data) {
      var api = [API_URL, this.name, data.id].join("/");
      return _axios["default"].put(api, data, {
        headers: (0, _auth_header["default"])()
      });
    }
  }]);

  return StudentService;
}();

var _default = StudentService;
exports["default"] = _default;