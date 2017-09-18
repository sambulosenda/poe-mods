'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionNotFound = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ApplicableMod2 = require('./ApplicableMod');

var _ApplicableMod3 = _interopRequireDefault(_ApplicableMod2);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OptionNotFound = exports.OptionNotFound = function (_Error) {
  _inherits(OptionNotFound, _Error);

  // cra doesnt have babel-plugin-transform-builtin-extend which can cause
  // tricky edge cases so we stick with duck typing
  function OptionNotFound(mod) {
    _classCallCheck(this, OptionNotFound);

    var _this = _possibleConstructorReturn(this, (OptionNotFound.__proto__ || Object.getPrototypeOf(OptionNotFound)).call(this, 'option not found for mod ' + mod.primary));

    _this.type = OptionNotFound.type;
    return _this;
  }

  return OptionNotFound;
}(Error);

OptionNotFound.type = 'OptionNotFound';

/**
 * TODO
 * serialize()
 * applicableByteHuman
 */
var MasterMod = function (_ApplicableMod) {
  _inherits(MasterMod, _ApplicableMod);

  _createClass(MasterMod, null, [{
    key: 'build',
    value: function build(mod, options) {
      var option = options.find(function (needle) {
        return needle.mod != null && needle.mod.primary === mod.primary;
      });

      if (option === undefined) {
        throw new OptionNotFound(mod);
      }

      return new MasterMod(option);
    }
  }]);

  function MasterMod(option) {
    _classCallCheck(this, MasterMod);

    if (option.mod == null) {
      throw new Error('the provided option doesnt have a mod');
    }

    // we need the benchoption here because it holds the info for the
    // applicable itemclass
    // Covariant property `option` incompatible with contravariant use in
    var _this2 = _possibleConstructorReturn(this, (MasterMod.__proto__ || Object.getPrototypeOf(MasterMod)).call(this, option.mod));

    _this2.option = option;
    return _this2;
  }

  /**
   * modname with basic stats
   */


  _createClass(MasterMod, [{
    key: 'name',
    value: function name() {
      var _option = this.option,
          master_level = _option.master_level,
          short_name = _option.npc_master.npc.short_name;


      return this.props.name + '(' + short_name + ') Level: ' + master_level;
    }
  }, {
    key: 'applicableTo',
    value: function applicableTo(item) {
      var success = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var applicable_flags = _extends({}, _get(MasterMod.prototype.__proto__ || Object.getPrototypeOf(MasterMod.prototype), 'applicableTo', this).call(this, item), {
        wrong_itemclass: false,
        no_multimod: false
      });

      var item_classes = this.option.item_classes;


      var no_matching_item_class = item_classes.find(function (item_class) {
        return item_class.primary === item.baseitem.item_class.primary;
      }) === undefined;

      if (no_matching_item_class) {
        applicable_flags.wrong_itemclass = true;
      }

      // grep MasterMods and set failure if we cant multimod
      var master_mods = item.mods.filter(function (mod) {
        return mod instanceof MasterMod;
      });
      var has_no_multi_mod = master_mods.find(function (mod) {
        return mod.props.primary === _.metaMods.MULTIMOD;
      }) === undefined;

      if (master_mods.length > 0 && has_no_multi_mod) {
        applicable_flags.no_multimod = true;
      }

      return applicable_flags;
    }
  }]);

  return MasterMod;
}(_ApplicableMod3.default);

MasterMod.APPLICABLE_FLAGS = _extends({}, _ApplicableMod3.default.APPLICABLE_FLAGS, {
  wrong_itemclass: false,
  no_multimod: false
});
exports.default = MasterMod;