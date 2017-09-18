'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Flags = require('../Flags');

var _Currency2 = require('./Currency');

var _Currency3 = _interopRequireDefault(_Currency2);

var _Augment = require('./Augment');

var _Augment2 = _interopRequireDefault(_Augment);

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
var Alteration = function (_Currency) {
  _inherits(Alteration, _Currency);

  function Alteration() {
    _classCallCheck(this, Alteration);

    return _possibleConstructorReturn(this, (Alteration.__proto__ || Object.getPrototypeOf(Alteration)).apply(this, arguments));
  }

  _createClass(Alteration, [{
    key: 'applyTo',


    /**
     *  rerolls properties of magic
     */
    value: function applyTo(item) {
      if (!(0, _Flags.anySet)(this.applicableTo(item))) {
        // TODO actually considers *_cannot_be_changed?
        // granted via scouring but is this true for ingame alts?
        var scoured_item = new _Scouring2.default().applyTo(item);

        var reforged_item = new _Transmute2.default(this.mods).applyTo(scoured_item);
        // no complete scour?
        if (reforged_item === scoured_item) {
          reforged_item = new _Augment2.default(this.mods).applyTo(reforged_item);
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

      var applicable_flags = _extends({}, Alteration.APPLICABLE_FLAGS);

      if (item.props.rarity !== 'magic') {
        applicable_flags.not_magic = true;
      }

      return applicable_flags;
    }
  }], [{
    key: 'build',
    value: function build(mods) {
      return _get(Alteration.__proto__ || Object.getPrototypeOf(Alteration), 'build', this).call(this, mods, _Transmute2.default.modFilter, Alteration);
    }
  }]);

  return Alteration;
}(_Currency3.default);

Alteration.APPLICABLE_FLAGS = _extends({}, _Currency3.default.APPLICABLE_FLAGS, {
  not_magic: false
});
exports.default = Alteration;