'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Flags = require('../util/Flags');

var _Currency2 = require('./Currency');

var _Currency3 = _interopRequireDefault(_Currency2);

var _Transmute = require('./Transmute');

var _Transmute2 = _interopRequireDefault(_Transmute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 */
var Alchemy = function (_Currency) {
  _inherits(Alchemy, _Currency);

  function Alchemy() {
    _classCallCheck(this, Alchemy);

    return _possibleConstructorReturn(this, (Alchemy.__proto__ || Object.getPrototypeOf(Alchemy)).apply(this, arguments));
  }

  _createClass(Alchemy, [{
    key: 'applyTo',


    /**
     *  adds 1-2 mods
     */
    value: function applyTo(item) {
      if (!(0, _Flags.anySet)(this.applicableTo(item))) {
        // upgrade to rare
        var alched_item = item.setRarity('rare');

        var new_mods = _lodash2.default.random(4, 6);
        for (var rolled_mods = 1; rolled_mods <= new_mods; rolled_mods += 1) {
          alched_item = this.rollMod(alched_item);
        }

        var prefixes = alched_item.getPrefixes().length;
        var suffixes = alched_item.getSuffixes().length;
        var diff = Math.abs(prefixes - suffixes);
        var missing_mods = Math.max(0, diff - 1);

        // correct differences between #prefixes, #suffixes >= 2
        for (var _rolled_mods = 1; _rolled_mods <= missing_mods; _rolled_mods += 1) {
          alched_item = this.rollMod(alched_item);
        }

        return alched_item;
      }

      return item;
    }

    /**
     * maps mod::applicableTo as if it were already magic
     */

  }, {
    key: 'modsFor',
    value: function modsFor(item) {
      var whitelist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      // simulate upgrade
      return _get(Alchemy.prototype.__proto__ || Object.getPrototypeOf(Alchemy.prototype), 'modsFor', this).call(this, item.setRarity('rare'), whitelist);
    }
  }, {
    key: 'applicableTo',
    value: function applicableTo(item) {
      var applicable_flags = _extends({}, Alchemy.APPLICABLE_FLAGS);

      if (item.props.rarity !== 'normal') {
        applicable_flags.not_white = true;
      }

      return applicable_flags;
    }
  }], [{
    key: 'build',
    value: function build(mods) {
      return _get(Alchemy.__proto__ || Object.getPrototypeOf(Alchemy), 'build', this).call(this, mods, _Transmute2.default.modFilter, Alchemy);
    }
  }]);

  return Alchemy;
}(_Currency3.default);

Alchemy.APPLICABLE_FLAGS = _extends({}, _Currency3.default.APPLICABLE_FLAGS, {
  not_white: false
});
exports.default = Alchemy;