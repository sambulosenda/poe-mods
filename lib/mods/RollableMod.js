'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ApplicableMod2 = require('./ApplicableMod');

var _ApplicableMod3 = _interopRequireDefault(_ApplicableMod2);

require('../Flags');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* TODO:
 * serialize()
 */
var RollableMod = function (_ApplicableMod) {
  _inherits(RollableMod, _ApplicableMod);

  function RollableMod() {
    _classCallCheck(this, RollableMod);

    return _possibleConstructorReturn(this, (RollableMod.__proto__ || Object.getPrototypeOf(RollableMod)).apply(this, arguments));
  }

  _createClass(RollableMod, [{
    key: 'spawnweightPropsOf',
    value: function spawnweightPropsOf(item) {
      var item_tags = item.getTags();

      return this.props.spawn_weights.find(function (_ref) {
        var tag = _ref.tag;
        return item_tags.find(function (item_tag) {
          return tag.primary === item_tag.primary;
        });
      });
    }
  }, {
    key: 'spawnableOn',
    value: function spawnableOn(item) {
      var spawnable_flags = _extends({}, RollableMod.SPAWNABLE_FLAGS);
      var spawnweight = this.spawnweightPropsOf(item);

      if (spawnweight == null) {
        // at first glance this shouldn't be happening
        // since every mod seems to have a spawnweight for the default
        // tag which every equipment seems to have
        spawnable_flags.no_matching_tags = true;
      } else if (spawnweight.value <= 0) {
        spawnable_flags.spawnweight_zero = true;
      }

      return spawnable_flags;
    }
  }, {
    key: 'spawnweightFor',
    value: function spawnweightFor(item) {
      var spawnweight = this.spawnweightPropsOf(item);

      if (spawnweight == null) {
        return 0;
      } else {
        return spawnweight.value;
      }
    }
  }]);

  return RollableMod;
}(_ApplicableMod3.default);

RollableMod.SPAWNABLE_FLAGS = {
  no_matching_tags: false,
  spawnweight_zero: false
};
exports.default = RollableMod;