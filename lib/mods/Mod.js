'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Stat = require('../Stat');

var _Stat2 = _interopRequireDefault(_Stat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mod = function () {
  function Mod(props) {
    _classCallCheck(this, Mod);

    // Covariant property `option` incompatible with contravariant use in
    this.props = props;
  }

  _createClass(Mod, [{
    key: 'isType',
    value: function isType(type) {
      return this.props.generation_type === Mod.TYPE[type.toUpperCase()];
    }
  }, {
    key: 'isPrefix',
    value: function isPrefix() {
      return this.isType('prefix');
    }
  }, {
    key: 'isSuffix',
    value: function isSuffix() {
      return this.isType('suffix');
    }
  }, {
    key: 'isEnchantment',
    value: function isEnchantment() {
      return this.isType('enchantment');
    }
  }, {
    key: 'isPremade',
    value: function isPremade() {
      return this.isType('premade');
    }
  }, {
    key: 'isAffix',
    value: function isAffix() {
      return this.isPrefix() || this.isSuffix();
    }
  }, {
    key: 'implicitCandidate',
    value: function implicitCandidate() {
      return this.isPremade() || this.isType('vaal') || this.isType('enchantment');
    }
  }, {
    key: 'statsJoined',
    value: function statsJoined() {
      var _this = this;

      return this.props.stats.map(function (stat_props, i) {
        var stat = new _Stat2.default(stat_props, [+_this.props['stat' + (i + 1) + '_min'], +_this.props['stat' + (i + 1) + '_max']]);

        return stat;
      });
    }

    /**
     * string identifier of the generation type
     */

  }, {
    key: 'modType',
    value: function modType() {
      var _this2 = this;

      var entry = Object.entries(Mod.TYPE).find(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            type = _ref2[1];

        return _this2.props.generation_type === type;
      });

      if (entry === undefined) {
        return undefined;
      } else {
        return entry[0].toLowerCase();
      }
    }
  }, {
    key: 'requiredLevel',
    value: function requiredLevel() {
      return Math.floor(this.props.level * 0.8);
    }
  }]);

  return Mod;
}();

Mod.DOMAIN = {
  ITEM: 1,
  FLASK: 2,
  MONSTER: 3,
  STRONGBOX: 4,
  MAP: 5,
  STANCE: 9,
  MASTER: 10,
  JEWEL: 11
};
Mod.TYPE = {
  PREFIX: 1,
  SUFFIX: 2,
  PREMADE: 3,
  NEMESIS: 4,
  VAAL: 5,
  BLOODLINES: 6,
  TORMENT: 7,
  TEMPEST: 8,
  TALISMAN: 9,
  ENCHANTMENT: 10
};
exports.default = Mod;