'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Flags = require('../util/Flags');

var _mods = require('../mods/');

var _Generator2 = require('./Generator');

var _Generator3 = _interopRequireDefault(_Generator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var filterNone = function filterNone() {
  return true;
};

/**
 * abstract representation of ingame currency which only accepts
 * prefixes, suffixes and implicits
 */
var Currency = function (_Generator) {
  _inherits(Currency, _Generator);

  function Currency() {
    _classCallCheck(this, Currency);

    return _possibleConstructorReturn(this, (Currency.__proto__ || Object.getPrototypeOf(Currency)).apply(this, arguments));
  }

  _createClass(Currency, [{
    key: 'modsFor',
    value: function modsFor(item) {
      var whitelist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      return this.getAvailableMods().map(function (mod) {
        var applicable_flags = mod.applicableTo(item);
        var spawnable_flags = mod.spawnableOn(item);
        var spawnweight = mod.spawnweightFor(item);

        var is_applicable = !(0, _Flags.anySet)(applicable_flags, whitelist);

        var is_spawnable = !(0, _Flags.anySet)(spawnable_flags, whitelist);

        var is_rollable = is_applicable && is_spawnable;

        if (is_rollable) {
          return {
            mod: mod,
            applicable: applicable_flags,
            spawnable: spawnable_flags,
            spawnweight: spawnweight
          };
        } else {
          return null;
        }
      }).filter(Boolean);
    }

    /**
     * currency only applies to items
     */

  }, {
    key: 'applicableTo',
    value: function applicableTo(item) {
      var success = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var applicable_flags = _extends({}, Currency.APPLICABLE_FLAGS);

      if (item.props.corrupted) {
        applicable_flags.corrupted = true;
      }

      if (item.props.mirrored) {
        applicable_flags.mirrored = true;
      }

      return applicable_flags;
    }
  }], [{
    key: 'build',


    // build<T: Currency>(currency: Class<T>): T not working
    value: function build(mods) {
      var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : filterNone;
      var CurrencyClass = arguments[2];

      var rollable_mods = mods.filter(function (props) {
        return props.spawn_weights.length > 0 && filter(props);
      }).map(function (props) {
        return new _mods.RollableMod(props);
      });

      return new CurrencyClass(rollable_mods);
    }
  }]);

  return Currency;
}(_Generator3.default);

Currency.APPLICABLE_FLAGS = {
  not_an_item: false,
  corrupted: false,
  mirrored: false
};
exports.default = Currency;