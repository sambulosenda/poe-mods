'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('../Flags');

var _Mod2 = require('./Mod');

var _Mod3 = _interopRequireDefault(_Mod2);

var _meta_mods = require('./meta_mods');

var _meta_mods2 = _interopRequireDefault(_meta_mods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ApplicableMod = function (_Mod) {
  _inherits(ApplicableMod, _Mod);

  function ApplicableMod() {
    _classCallCheck(this, ApplicableMod);

    return _possibleConstructorReturn(this, (ApplicableMod.__proto__ || Object.getPrototypeOf(ApplicableMod)).apply(this, arguments));
  }

  _createClass(ApplicableMod, [{
    key: 'applicableTo',
    value: function applicableTo(item) {
      var applicable_flags = _extends({}, ApplicableMod.APPLICABLE_FLAGS);

      if (!item.inDomainOf(this.props.domain)) {
        applicable_flags.wrong_domain = true;
      } else if (!item.hasRoomFor(this)) {
        applicable_flags.domain_full = true;
      }

      if (this.props.level > item.props.item_level) {
        applicable_flags.lower_ilvl = true;
      }

      var correct_groups = item.mods.map(function (mod) {
        return mod.props.correct_group;
      });

      if (correct_groups.indexOf(this.props.correct_group) !== -1) {
        applicable_flags.already_present = true;
      }

      var has_leo_meta_mod = item.indexOfModWithPrimary(_meta_mods2.default.LLD_MOD) !== -1;

      if (this.requiredLevel() > 28 && has_leo_meta_mod) {
        applicable_flags.above_lld_level = true;
      }

      return applicable_flags;
    }
  }]);

  return ApplicableMod;
}(_Mod3.default);

ApplicableMod.APPLICABLE_FLAGS = {
  domain_full: false,
  already_present: false,
  wrong_domain: false,
  lower_ilvl: false,
  above_lld_level: false
};
exports.default = ApplicableMod;