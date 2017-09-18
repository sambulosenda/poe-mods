'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * class Metadata
 * 
 * representation of a .ot file in METADATA 
 */
var MetaData = function () {
  _createClass(MetaData, null, [{
    key: 'build',
    value: function build(clazz, meta_datas) {
      if (meta_datas[clazz] != null) {
        return new MetaData(clazz, meta_datas[clazz]);
      } else {
        return null;
      }
    }
  }]);

  function MetaData(clazz, props) {
    _classCallCheck(this, MetaData);

    this.clazz = clazz;
    this.props = props;
  }

  _createClass(MetaData, [{
    key: 'isA',
    value: function isA(other) {
      return other === this.clazz || this.props.inheritance.indexOf(other) !== -1;
    }
  }]);

  return MetaData;
}();

exports.default = MetaData;