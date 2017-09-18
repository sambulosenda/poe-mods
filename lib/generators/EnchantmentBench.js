'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Flags = require('../util/Flags');

var _mods = require('../mods');

var _Currency2 = require('./Currency');

var _Currency3 = _interopRequireDefault(_Currency2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ingame representation of a enchantment bench
 * 
 * TODO:
 * applicableByteHuman
 */
var Enchantmentbench = function (_Currency) {
  _inherits(Enchantmentbench, _Currency);

  function Enchantmentbench() {
    _classCallCheck(this, Enchantmentbench);

    return _possibleConstructorReturn(this, (Enchantmentbench.__proto__ || Object.getPrototypeOf(Enchantmentbench)).apply(this, arguments));
  }

  _createClass(Enchantmentbench, [{
    key: 'applyTo',


    /**
     * replaces implicits with new enchantment mod
     */
    value: function applyTo(item) {
      if (!(0, _Flags.anySet)(this.applicableTo(item))) {
        var blank_item = item.removeAllImplicits();

        var enchantment = this.chooseMod(blank_item);
        if (enchantment != null) {
          return blank_item.addImplicit(enchantment);
        }
      }

      return item;
    }
  }, {
    key: 'modsFor',
    value: function modsFor(item) {
      var whitelist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      // replace so ignore full domain
      return _get(Enchantmentbench.prototype.__proto__ || Object.getPrototypeOf(Enchantmentbench.prototype), 'modsFor', this).call(this, item, [].concat(_toConsumableArray(whitelist), ['domain_full']));
    }
  }], [{
    key: 'modFilter',
    value: function modFilter(mod) {
      return [_mods.Mod.TYPE.ENCHANTMENT].indexOf(mod.generation_type) !== -1;
    }
  }, {
    key: 'build',
    value: function build(mods) {
      return _get(Enchantmentbench.__proto__ || Object.getPrototypeOf(Enchantmentbench), 'build', this).call(this, mods, Enchantmentbench.modFilter, Enchantmentbench);
    }
  }]);

  return Enchantmentbench;
}(_Currency3.default);

exports.default = Enchantmentbench;