'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ValueRange = require('./ValueRange');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stat = function () {
  function Stat(props) {
    var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0];

    _classCallCheck(this, Stat);

    this.props = props;
    this.values = values;
  }

  _createClass(Stat, [{
    key: 'valueString',
    value: function valueString() {
      return '(' + this.values[0] + ' - ' + this.values[1] + ')';
    }
  }, {
    key: 'set',
    value: function set(values) {
      return new Stat(this.props, values);
    }
  }, {
    key: 'add',
    value: function add(values) {
      return new Stat(this.props, (0, _ValueRange.add)(this.values, values));
    }
  }, {
    key: 'mult',
    value: function mult(values) {
      return new Stat(this.props, (0, _ValueRange.mult)(this.values, values));
    }
  }]);

  return Stat;
}();

Stat.localization = null;
exports.default = Stat;