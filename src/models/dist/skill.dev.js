"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Skill = function Skill() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

  _classCallCheck(this, Skill);

  this.name = name;
  this.level = level;
};

exports["default"] = Skill;