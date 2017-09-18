'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mods = require('../mods/');

var _Generator2 = require('./Generator');

var _Generator3 = _interopRequireDefault(_Generator2);

var _MasterBench = require('./MasterBench');

var _MasterBench2 = _interopRequireDefault(_MasterBench);

var _Talisman = require('./Talisman');

var _Talisman2 = _interopRequireDefault(_Talisman);

var _Transmute = require('./Transmute');

var _Transmute2 = _interopRequireDefault(_Transmute);

var _Vaal = require('./Vaal');

var _Vaal2 = _interopRequireDefault(_Vaal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Masterbench/Currency hybrid
 */
var ItemShowcase = function (_Generator) {
  _inherits(ItemShowcase, _Generator);

  function ItemShowcase(props, options) {
    _classCallCheck(this, ItemShowcase);

    var master = new _MasterBench2.default(options);
    var talisman = _Talisman2.default.build(props);
    var transmute = _Transmute2.default.build(props);
    var vaal = _Vaal2.default.build(props);

    var mods = [].concat(_toConsumableArray(talisman.mods), _toConsumableArray(transmute.mods), _toConsumableArray(vaal.mods), _toConsumableArray(master.mods));

    var _this = _possibleConstructorReturn(this, (ItemShowcase.__proto__ || Object.getPrototypeOf(ItemShowcase)).call(this, mods));

    _this.master = master;
    _this.talisman = talisman;
    _this.transmute = transmute;
    _this.vaal = vaal;
    return _this;
  }

  /**
   * only abstract showcase, not for actual usage
   */


  _createClass(ItemShowcase, [{
    key: 'applyTo',
    value: function applyTo(item) {
      return item;
    }

    /**
     * greps mod::applicableTo and (if implemented) mod::spawnableOn 
     * if we have all the space for mods we need
     */

  }, {
    key: 'modsFor',
    value: function modsFor(item) {
      var whitelist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      return [].concat(_toConsumableArray(this.master.modsFor(item, whitelist)), _toConsumableArray(this.talisman.modsFor(item, whitelist)), _toConsumableArray(this.transmute.modsFor(item, whitelist)), _toConsumableArray(this.vaal.modsFor(item, whitelist)));
    }
  }]);

  return ItemShowcase;
}(_Generator3.default);

exports.default = ItemShowcase;