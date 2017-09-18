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

var _Alchemy = require('./Alchemy');

var _Alchemy2 = _interopRequireDefault(_Alchemy);

var _Exalted = require('./Exalted');

var _Exalted2 = _interopRequireDefault(_Exalted);

var _Scouring = require('./Scouring');

var _Scouring2 = _interopRequireDefault(_Scouring);

var _Transmute = require('./Transmute');

var _Transmute2 = _interopRequireDefault(_Transmute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * TODO:
 * applicableByteHuman
 */
var Chaos = function (_Currency) {
  _inherits(Chaos, _Currency);

  function Chaos() {
    _classCallCheck(this, Chaos);

    return _possibleConstructorReturn(this, (Chaos.__proto__ || Object.getPrototypeOf(Chaos)).apply(this, arguments));
  }

  _createClass(Chaos, [{
    key: 'applyTo',


    /**
     *  rerolls properties of magic
     */
    value: function applyTo(item) {
      if (!(0, _Flags.anySet)(this.applicableTo(item))) {
        var locked_prefixes = item.lockedPrefixes();
        var locked_suffixes = item.lockedSuffixes();

        if (locked_prefixes && locked_suffixes) {
          // TODO rerolls name so it is actually a new item
          return item;
        }

        var scoured_item = new _Scouring2.default().applyTo(item);

        var reforged_item = new _Alchemy2.default(this.mods).applyTo(scoured_item);

        // no complete scour?
        if (reforged_item === scoured_item) {
          // limit the possible mods of this exalt according to
          // meta mods since usually adding prefixes is ok even with locked_prefixes
          var exalted = new _Exalted2.default(this.mods.filter(function (mod) {
            return (
              // locked_suffixes => !suffix
              (!locked_suffixes || !mod.isSuffix()) && (
              // locked_prefixes => !prefix
              !locked_prefixes || !mod.isPrefix())
            );
          }));

          var new_mods = _lodash2.default.random(2, 3);

          for (var i = 1; i <= new_mods; i += 1) {
            reforged_item = exalted.applyTo(reforged_item);
          }
        }

        return reforged_item;
      } else {
        return item;
      }
    }
  }, {
    key: 'applicableTo',
    value: function applicableTo(item) {
      var success = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var applicable_flags = _extends({}, Chaos.APPLICABLE_FLAGS);

      if (item.props.rarity !== 'rare') {
        applicable_flags.not_rare = true;
      }

      return applicable_flags;
    }
  }], [{
    key: 'build',
    value: function build(mods) {
      return _get(Chaos.__proto__ || Object.getPrototypeOf(Chaos), 'build', this).call(this, mods, _Transmute2.default.modFilter, Chaos);
    }
  }]);

  return Chaos;
}(_Currency3.default);

Chaos.APPLICABLE_FLAGS = _extends({}, _Currency3.default.APPLICABLE_FLAGS, {
  not_rare: false
});
exports.default = Chaos;