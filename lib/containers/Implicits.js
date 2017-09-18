'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _mods = require('../mods/');

var _ = require('./');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Implicits = function (_Container) {
  _inherits(Implicits, _Container);

  function Implicits() {
    _classCallCheck(this, Implicits);

    return _possibleConstructorReturn(this, (Implicits.__proto__ || Object.getPrototypeOf(Implicits)).apply(this, arguments));
  }

  _createClass(Implicits, [{
    key: 'addMod',

    /**
     * @override
     */
    value: function addMod(mod) {
      if (this.hasRoomFor(mod)) {
        return _get(Implicits.prototype.__proto__ || Object.getPrototypeOf(Implicits.prototype), 'addMod', this).call(this, mod);
      } else {
        return this;
      }
    }

    /**
     * @override
     */

  }, {
    key: 'maxModsOfType',
    value: function maxModsOfType(mod) {
      switch (mod.props.generation_type) {
        case _mods.Mod.TYPE.PREMADE:
          return 5;
        case _mods.Mod.TYPE.ENCHANTMENT:
          return 1;
        case _mods.Mod.TYPE.VAAL:
          return 1;
        // no other generation types allowed
        default:
          return -1;
      }
    }
  }]);

  return Implicits;
}(_.Container);

exports.default = Implicits;