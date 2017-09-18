'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Flags = require('../Flags');

var _mods = require('../mods/');

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
var Vaal = function (_Currency) {
  _inherits(Vaal, _Currency);

  function Vaal() {
    _classCallCheck(this, Vaal);

    return _possibleConstructorReturn(this, (Vaal.__proto__ || Object.getPrototypeOf(Vaal)).apply(this, arguments));
  }

  _createClass(Vaal, [{
    key: 'applyTo',


    /**
     * replaces implicit with vaal implicit
     * TODO: white sockets, reroll (brick(, nothing
     */
    value: function applyTo(item) {
      if (!(0, _Flags.anySet)(this.applicableTo(item))) {
        var blank_item = item.removeAllImplicits();

        var implicit = this.chooseMod(blank_item);

        if (implicit != null) {
          var vaaled_item = blank_item.addImplicit(implicit);

          if (vaaled_item !== blank_item) {
            return vaaled_item.corrupt();
          }
        }
      }

      // nothing changed
      return item;
    }
  }], [{
    key: 'modFilter',
    value: function modFilter(mod) {
      // vaal implicits
      return [_mods.Mod.TYPE.VAAL].indexOf(mod.generation_type) !== -1;
    }
  }, {
    key: 'build',
    value: function build(mods) {
      return _get(Vaal.__proto__ || Object.getPrototypeOf(Vaal), 'build', this).call(this, mods, Vaal.modFilter, Vaal);
    }
  }]);

  return Vaal;
}(_Currency3.default);

exports.default = Vaal;