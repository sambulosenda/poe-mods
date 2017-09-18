'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Flags = require('../util/Flags');

var _Currency2 = require('./Currency');

var _Currency3 = _interopRequireDefault(_Currency2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * TODO:
 * applicableByteHuman
 */
var Scouring = function (_Currency) {
  _inherits(Scouring, _Currency);

  function Scouring() {
    _classCallCheck(this, Scouring);

    return _possibleConstructorReturn(this, (Scouring.__proto__ || Object.getPrototypeOf(Scouring)).call(this, []));
  }

  /**
   * applies Orb of Scouring to an item
   * considers locked affixes metamods
   */


  _createClass(Scouring, [{
    key: 'applyTo',
    value: function applyTo(other) {
      if (!(0, _Flags.anySet)(this.applicableTo(other))) {
        var scoured_item = other;

        var locked_prefixes = scoured_item.lockedPrefixes();
        var locked_suffixes = scoured_item.lockedSuffixes();

        if (!locked_prefixes) {
          scoured_item = scoured_item.getPrefixes().reduce(function (item, prefix) {
            return item.removeMod(prefix);
          }, scoured_item);
        }

        if (!locked_suffixes) {
          scoured_item = scoured_item.getSuffixes().reduce(function (item, suffix) {
            return item.removeMod(suffix);
          }, scoured_item);
        }

        // set correct rarity
        var remaining_prefixes = scoured_item.getPrefixes().length;
        var remaining_suffixes = scoured_item.getSuffixes().length;

        var new_rarity = void 0;

        if (remaining_prefixes === 0 && remaining_suffixes === 0) {
          new_rarity = 'normal';
        } else {
          new_rarity = other.props.rarity;
        }

        return scoured_item.setRarity(new_rarity);
      } else {
        return other;
      }
    }

    /**
     * checks if normal or unique rarity and returns false
     */

  }, {
    key: 'applicableTo',
    value: function applicableTo(item) {
      var success = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var applicable_flags = _extends({}, Scouring.APPLICABLE_FLAGS);

      switch (item.props.rarity) {
        case 'normal':
          applicable_flags.normal = true;
          break;
        case 'unique':
          applicable_flags.unique = true;
          break;
        default:
        // noop
      }

      return applicable_flags;
    }
  }]);

  return Scouring;
}(_Currency3.default);

Scouring.APPLICABLE_FLAGS = _extends({}, _Currency3.default.APPLICABLE_FLAGS, {
  normal: false,
  unique: false
});
exports.default = Scouring;