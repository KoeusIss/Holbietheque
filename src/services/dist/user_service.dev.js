"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _auth_header = _interopRequireDefault(require("./auth_header"));

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var API_URL = process.env.NODE_ENV === "production" ? "https://holbie.tech/api/v1/" : "http://localhost:5000/api/v1";

var UserService =
/*#__PURE__*/
function () {
  function UserService() {
    _classCallCheck(this, UserService);
  }

  _createClass(UserService, [{
    key: "student",
    value: function student(user_id) {
      var api = [API_URL, user_id, "student"].join("/");
      return _axios["default"].get(api, {
        headers: (0, _auth_header["default"])()
      });
    }
  }, {
    key: "create",
    value: function create(data, user_id) {
      var api = [API_URL, "students"].join("/");
      data.user_id = user_id;
      data.date_of_birth = [data.birth_year, data.birth_month, data.birth_day].join("-");
      return _axios["default"].post(api, data, {
        headers: (0, _auth_header["default"])()
      });
    }
  }, {
    key: "update_first_login",
    value: function update_first_login(user_id) {
      var api = [API_URL, "users", user_id].join("/");
      return _axios["default"].put(api, {
        first_login: true
      }, {
        headers: (0, _auth_header["default"])()
      });
    }
  }, {
    key: "postStudentCertificate",
    value: function postStudentCertificate(cert, id) {
      return _axios["default"].post(API_URL + "/" + id + "/certificates", {
        name: cert.name,
        authority: cert.authority,
        is_expire: cert.is_expire,
        issued_at: cert.issued_at,
        expired_at: cert.expired_at,
        certificate_id: cert.certificate_id,
        description: cert.description
      }, {
        headers: (0, _auth_header["default"])()
      });
    }
  }, {
    key: "getStudentCertificates",
    value: function getStudentCertificates(student_id) {
      var api = API_URL + "/" + student_id + "/certificates";
      return _axios["default"].get(api, {
        headers: (0, _auth_header["default"])()
      });
    }
  }, {
    key: "getStudentEducation",
    value: function getStudentEducation(student_id) {
      var api = API_URL + "/" + student_id + "/educations";
      return _axios["default"].get(api, {
        headers: (0, _auth_header["default"])()
      });
    }
  }, {
    key: "postStudentEducation",
    value: function postStudentEducation(education, id) {
      return _axios["default"].post(API_URL + "/" + id + "/educations", {
        degree: education.degree,
        school: education.school,
        major: education.major,
        start_at: education.start_at,
        end_at: education.end_at,
        is_finished: education.is_finished,
        grade: education.grade,
        description: education.description
      }, {
        headers: (0, _auth_header["default"])()
      });
    }
  }, {
    key: "postStudentExperience",
    value: function postStudentExperience(experience, id) {
      return _axios["default"].post(API_URL + "/" + id + "/experiences", {
        title: experience.title,
        company: experience.company,
        job_type: experience.job_type,
        start_at: experience.start_at,
        end_at: experience.end_at,
        is_actual: experience.is_actual,
        description: experience.description
      }, {
        headers: (0, _auth_header["default"])()
      });
    }
  }, {
    key: "getStudentExperience",
    value: function getStudentExperience(student_id) {
      var api = API_URL + "/" + student_id + "/experiences";
      return _axios["default"].get(api, {
        headers: (0, _auth_header["default"])()
      });
    }
  }, {
    key: "currentUser",
    value: function currentUser() {
      var token = localStorage.getItem("access_token");

      if (token) {
        var decoded = (0, _jwtDecode["default"])(token);

        if (decoded.identity) {
          return {
            id: decoded.identity,
            role: decoded.user_claims.role,
            first_login: decoded.user_claims.first_login
          };
        } else {
          return null;
        }
      }

      return null;
    }
  }]);

  return UserService;
}();

var _default = new UserService();

exports["default"] = _default;