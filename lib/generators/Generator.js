'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _exceptions = require('../exceptions/');

require('../Flags');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @abstract
 * TODO:
 * applicableByteHuman()
 */
var Generator = function () {
  function Generator(mods) {
    _classCallCheck(this, Generator);

    this.mods = mods;
  }

  // eslint-disable-next-line no-unused-vars


  _createClass(Generator, [{
    key: 'applyTo',
    value: function applyTo(item) {
      throw new _exceptions.AbstractMethod('applyTo');
    }

    /**
     * returns a copy of #mods
     * 
     * we can stick with a shallow copy since Mod are supposed to be immutable
     */

  }, {
    key: 'getAvailableMods',
    value: function getAvailableMods() {
      return this.mods.slice();
    }

    // eslint-disable-next-line no-unused-vars

  }, {
    key: 'modsFor',
    value: function modsFor(item) {
      var whitelist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      throw new _exceptions.AbstractMethod('ModGenerator#modsFor');
    }

    // eslint-disable-next-line no-unused-vars

  }, {
    key: 'applicableTo',
    value: function applicableTo(item) {
      throw new _exceptions.AbstractMethod('applicableTo');
    }

    // would like to return ?T but i cant make Details to be generic

  }, {
    key: 'chooseMod',
    value: function chooseMod(item) {
      var details = this.modsFor(item);
      var detail = details[Math.floor(Math.random() * (details.length - 1))];

      // TODO spawnweight
      if (detail != null) {
        return detail.mod;
      } else {
        return undefined;
      }
    }

    /**
     * adds a mod from chooseMod ignoring if it's applicable
     * @param {Item} item 
     */

  }, {
    key: 'rollMod',
    value: function rollMod(item) {
      var mod = this.chooseMod(item);
      if (mod != null) {
        return item.addMod(mod);
      } else {
        return item;
      }
    }
  }]);

  return Generator;
}();

exports.default = Generator;