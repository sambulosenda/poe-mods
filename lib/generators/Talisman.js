'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _mods = require('../mods/');

var _Currency2 = require('./Currency');

var _Currency3 = _interopRequireDefault(_Currency2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * TODO
 */
var Talisman = function (_Currency) {
  _inherits(Talisman, _Currency);

  function Talisman() {
    _classCallCheck(this, Talisman);

    return _possibleConstructorReturn(this, (Talisman.__proto__ || Object.getPrototypeOf(Talisman)).apply(this, arguments));
  }

  _createClass(Talisman, null, [{
    key: 'modFilter',
    value: function modFilter(mod) {
      // talisman wildcard
      return [_mods.Mod.TYPE.ENCHANTMENT].indexOf(mod.generation_type) !== -1;
    }
  }, {
    key: 'build',
    value: function build(mods) {
      return _get(Talisman.__proto__ || Object.getPrototypeOf(Talisman), 'build', this).call(this, mods, Talisman.modFilter, Talisman);
    }
  }]);

  return Talisman;
}(_Currency3.default);

exports.default = Talisman;