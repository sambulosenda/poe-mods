'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _exceptions = require('../exceptions/');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Container = function () {
  function Container(mods) {
    _classCallCheck(this, Container);

    this.mods = mods;
  }

  /**
   *  adds a new non-existing mod
   */


  _createClass(Container, [{
    key: 'addMod',
    value: function addMod(mod) {
      if (!this.hasMod(mod)) {
        return new this.constructor(this.mods.concat(mod));
      } else {
        return this;
      }
    }

    /**
     * truncates mods
     */

  }, {
    key: 'removeAllMods',
    value: function removeAllMods() {
      return new this.constructor([]);
    }

    /**
     * removes an existing mod
     */

  }, {
    key: 'removeMod',
    value: function removeMod(other) {
      if (this.hasMod(other)) {
        return new this.constructor(this.mods.filter(function (mod) {
          return mod.props.primary !== other.props.primary;
        }));
      } else {
        return this;
      }
    }
  }, {
    key: 'indexOfModWithPrimary',
    value: function indexOfModWithPrimary(primary) {
      return this.mods.findIndex(function (mod) {
        return mod.props.primary === primary;
      });
    }
  }, {
    key: 'indexOfMod',
    value: function indexOfMod(mod) {
      return this.indexOfModWithPrimary(mod.props.primary);
    }
  }, {
    key: 'hasMod',
    value: function hasMod(mod) {
      return this.indexOfMod(mod) !== -1;
    }

    /**
     * tags of the mods in the container
     */

  }, {
    key: 'getTags',
    value: function getTags() {
      return this.mods.reduce(function (tags, mod) {
        return tags.concat(mod.props.tags);
      }, []).filter(
      // unique by id
      function (tag, i, tags) {
        return tags.findIndex(function (other) {
          return other.id === tag.id;
        }) === i;
      });
    }
  }, {
    key: 'asArray',
    value: function asArray() {
      return this.mods;
    }

    /**
     * @param {number} mod_type generation type
     */

  }, {
    key: 'numberOfModsOfType',
    value: function numberOfModsOfType(mod_type) {
      return this.mods.filter(function (mod) {
        return mod.props.generation_type === mod_type;
      }).length;
    }

    /**
     * checks if theres more place for a mod with their generationtype
     */

  }, {
    key: 'hasRoomFor',
    value: function hasRoomFor(mod) {
      return this.numberOfModsOfType(mod.props.generation_type) < this.maxModsOfType(mod);
    }

    /**
     * @abstract
     */
    // eslint-disable-next-line no-unused-vars

  }, {
    key: 'maxModsOfType',
    value: function maxModsOfType(mod) {
      throw new _exceptions.AbstractMethod('maxModsOfType');
    }
  }]);

  return Container;
}();

exports.default = Container;