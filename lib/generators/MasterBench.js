'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Flags = require('../util/Flags');

var _mods = require('../mods');

var _Generator2 = require('./Generator');

var _Generator3 = _interopRequireDefault(_Generator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * TODO
 * applicableByteHuman()
 */
var MasterBench = function (_Generator) {
  _inherits(MasterBench, _Generator);

  _createClass(MasterBench, null, [{
    key: 'build',
    value: function build(options, master_primary) {
      return new MasterBench(options.filter(function (_ref) {
        var npc_master_key = _ref.npc_master_key;
        return npc_master_key === master_primary;
      }));
    }
  }]);

  function MasterBench(options) {
    _classCallCheck(this, MasterBench);

    var _this = _possibleConstructorReturn(this, (MasterBench.__proto__ || Object.getPrototypeOf(MasterBench)).call(this, options.filter(function (option) {
      return option.mod != null;
    }).map(function (option) {
      return new _mods.MasterMod(option);
    })));

    _this.options = options;
    _this.chosen_option = undefined;
    return _this;
  }

  _createClass(MasterBench, [{
    key: 'chooseOption',
    value: function chooseOption(options_index) {
      var option = this.options[options_index];

      if (option === undefined) {
        throw new RangeError();
      } else {
        this.chosen_option = option;
      }
    }
  }, {
    key: 'applyOptionTo',
    value: function applyOptionTo(item, options_index) {
      this.chooseOption(options_index);

      return this.applyTo(item);
    }

    /**
     * applies a chosen craftingbenchoption
     * 
     * cant overload extended method. so we have to set the chosen option before
     */

  }, {
    key: 'applyTo',
    value: function applyTo(item) {
      var option = this.chosen_option;

      if (option != null) {
        var mod = this.mods.find(function (needle) {
          return option.mod != null && needle.props.primary === option.mod.primary;
        });

        /**
         * TODO customactions for no mod
         */
        if (mod !== undefined) {
          // white gets upgraded to blue
          var crafted_item = item.props.rarity === 'normal' ? item.setRarity('magic') : item;

          if (mod.applicableTo(crafted_item)) {
            return crafted_item.addMod(mod);
          }
        }
      }

      // nothing changed
      return item;
    }

    /**
     * every item is welcome
     */
    // eslint-disable-next-line no-unused-vars

  }, {
    key: 'applicableTo',
    value: function applicableTo(item) {
      // empty flags
      return {};
    }

    /**
     * greps mod::applicableTo 
     */

  }, {
    key: 'modsFor',
    value: function modsFor(item) {
      var whitelist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      // TODO look into why we simulate another rarity why is a MasterMod not
      // applicable to white items?
      // simulate blue if white
      var simulated_item = item.props.rarity === 'normal' ? item.setRarity('magic') : item;

      return this.getAvailableMods().map(function (mod) {
        var applicable_flags = mod.applicableTo(simulated_item);

        if ((0, _Flags.anySet)(applicable_flags, whitelist)) {
          return null;
        } else {
          return {
            mod: mod,
            applicable: applicable_flags
          };
        }
      }).filter(Boolean);
    }
  }]);

  return MasterBench;
}(_Generator3.default);

exports.default = MasterBench;