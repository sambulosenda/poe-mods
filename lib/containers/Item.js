'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Implicits = require('./Implicits');

var _Implicits2 = _interopRequireDefault(_Implicits);

var _MetaData = require('../util/MetaData');

var _MetaData2 = _interopRequireDefault(_MetaData);

var _mods = require('../mods');

var _Container2 = require('./Container');

var _Container3 = _interopRequireDefault(_Container2);

var _Stat = require('../util/Stat');

var _Stat2 = _interopRequireDefault(_Stat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 
 * Item Class extends ModContainer
 * class Item mixins ModContainer, BaseItem
 * 
 * represents an ingame item (boots, maps, rings for example)
 * the class only represents the explicits and is a fascade for an 
 * additional implicit container
 */
// eslint-disable-line no-undef

var Item = function (_Container) {
  _inherits(Item, _Container);

  _createClass(Item, null, [{
    key: 'build',
    value: function build(props, meta_datas) {
      var clazz = props.inherits_from.split(/[\\/]/).pop();
      var meta_data = _MetaData2.default.build(clazz, meta_datas);

      if (meta_data == null) {
        throw new Error('meta_data for ' + clazz + ' not found');
      } else {
        return new Item(props, meta_data, Item.default_props, props.implicit_mods.map(function (mod_props) {
          return new _mods.Mod(mod_props);
        }), []);
      }
    }
  }, {
    key: 'withBuilder',
    value: function withBuilder(builder) {
      var affixes = builder.affixes,
          baseitem = builder.baseitem,
          implicits = builder.implicits,
          meta_data = builder.meta_data,
          props = builder.props;


      return new Item(baseitem, meta_data, props, implicits, affixes);
    }
  }, {
    key: 'applyStat',
    value: function applyStat(value, stat, precision) {
      throw new Error('not implemented');
    }
  }]);

  function Item(baseitem, meta_data) {
    var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Item.default_props;
    var implicits = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    var affixes = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

    _classCallCheck(this, Item);

    var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, affixes));

    _this.baseitem = baseitem;
    _this.meta_data = meta_data;
    _this.props = props;

    _this.implicits = new _Implicits2.default(implicits);
    return _this;
  }

  _createClass(Item, [{
    key: 'builder',
    value: function builder() {
      return {
        affixes: this.mods,
        baseitem: this.baseitem,
        implicits: this.implicits.mods,
        meta_data: this.meta_data,
        props: this.props
      };
    }

    // batch mutations

  }, {
    key: 'withMutations',
    value: function withMutations(mutate) {
      var builder = mutate(this.builder());

      return Item.withBuilder(builder);
    }
  }, {
    key: 'addMod',
    value: function addMod(other) {
      if (other.isAffix()) {
        return this.addAffix(other);
      } else if (other.implicitCandidate()) {
        return this.addImplicit(other);
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
      if (this.affixes.mods.length > 0) {
        return this.withMutations(function (builder) {
          return _extends({}, builder, {
            affixes: []
          });
        });
      } else {
        return this;
      }
    }

    /**
     * removes an existing mod
     */

  }, {
    key: 'removeMod',
    value: function removeMod(other) {
      if (this.hasMod(other)) {
        return this.withMutations(function (builder) {
          return _extends({}, builder, {
            affixes: builder.affixes.filter(function (mod) {
              return mod.props.primary !== other.props.primary;
            })
          });
        });
      } else {
        return this;
      }
    }

    /**
     * adds a mod if theres room for it
     * no sophisticated domain check. only if affix type is full or not
     */

  }, {
    key: 'addAffix',
    value: function addAffix(other) {
      if (this.hasRoomFor(other)) {
        return this.withMutations(function (builder) {
          return _extends({}, builder, {
            affixes: new _Container3.default(builder.affixes).addMod(other).mods
          });
        });
      } else {
        return this;
      }
    }
  }, {
    key: 'addImplicit',
    value: function addImplicit(mod) {
      var builder = this.builder();

      return Item.withBuilder(_extends({}, builder, {
        implicits: this.implicits.addMod(mod).mods
      }));
    }
  }, {
    key: 'removeAllImplicits',
    value: function removeAllImplicits() {
      var builder = this.builder();

      return Item.withBuilder(_extends({}, builder, {
        implicits: this.implicits.removeAllMods().mods
      }));
    }
  }, {
    key: 'getPrefixes',
    value: function getPrefixes() {
      return this.affixes.mods.filter(function (mod) {
        return mod.isPrefix();
      });
    }
  }, {
    key: 'getSuffixes',
    value: function getSuffixes() {
      return this.affixes.mods.filter(function (mod) {
        return mod.isSuffix();
      });
    }

    /**
     * returns tags of item + tags from mods
     */

  }, {
    key: 'getTags',
    value: function getTags() {
      return _get(Item.prototype.__proto__ || Object.getPrototypeOf(Item.prototype), 'getTags', this).call(this).concat(this.meta_data.props.tags, this.baseitem.tags);
    }
    /**
     * returns the max possible number of the given generation type
     * @override
     */

  }, {
    key: 'maxModsOfType',
    value: function maxModsOfType(mod) {
      switch (mod.props.generation_type) {
        case _mods.Mod.TYPE.PREFIX:
          return this.maxPrefixes();
        case _mods.Mod.TYPE.SUFFIX:
          return this.maxSuffixes();
        case _mods.Mod.TYPE.VAAL:
          return 1;
        default:
          return -1;
      }
    }

    /**
     * maximum number of prefixes
     */

  }, {
    key: 'maxPrefixes',
    value: function maxPrefixes() {
      switch (this.props.rarity) {
        case 'normal':
          return 0;
        case 'magic':
          return 1;
        case 'rare':
        case 'showcase':
          if (this.meta_data.isA('AbstractJewel')) {
            return 2;
          }
          return 3;
        case 'unique':
          return Number.POSITIVE_INFINITY;
        default:
          // flow false positve, every possible value of Rarity is covered
          // but it still infers implicit undefined return
          throw new Error('rarity not recognized');
      }
    }

    /**
     * maximum number of suffixes (=prefixes)
     */

  }, {
    key: 'maxSuffixes',
    value: function maxSuffixes() {
      return this.maxPrefixes();
    }
  }, {
    key: 'modDomainEquiv',
    value: function modDomainEquiv() {
      if (this.meta_data.isA('AbstractJewel')) {
        return _mods.Mod.DOMAIN.JEWEL;
      }
      if (this.meta_data.isA('AbstractFlask')) {
        return _mods.Mod.DOMAIN.FLASK;
      }
      if (this.meta_data.isA('AbstractMap')) {
        return _mods.Mod.DOMAIN.MAP;
      }
      return _mods.Mod.DOMAIN.ITEM;
    }

    /**
     *  checks if the domains are equiv
     */

  }, {
    key: 'inDomainOf',
    value: function inDomainOf(mod_domain) {
      switch (mod_domain) {
        case _mods.Mod.DOMAIN.MASTER:
          return this.inDomainOf(_mods.Mod.DOMAIN.ITEM);
        default:
          return mod_domain === this.modDomainEquiv();
      }
    }
  }, {
    key: 'getImplicits',
    value: function getImplicits() {
      return this.implicits.asArray();
    }
  }, {
    key: 'getAllMods',
    value: function getAllMods() {
      return this.asArray().concat(this.getImplicits());
    }
  }, {
    key: 'lockedPrefixes',
    value: function lockedPrefixes() {
      return this.indexOfModWithPrimary(_mods.metaMods.LOCKED_PREFIXES) !== -1;
    }
  }, {
    key: 'lockedSuffixes',
    value: function lockedSuffixes() {
      return this.indexOfModWithPrimary(_mods.metaMods.LOCKED_SUFFIXES) !== -1;
    }
  }, {
    key: 'nameLines',
    value: function nameLines() {
      var rarity = this.props.rarity;

      if (rarity === 'normal') {
        return [this.baseitem.name];
      } else if (rarity === 'magic') {
        var prefix = this.getPrefixes()[0];
        var suffix = this.getSuffixes()[0];

        return [[prefix && prefix.props.name, this.baseitem.name, suffix && suffix.props.name].filter(Boolean).join(' ')];
      } else if (rarity === 'rare' || rarity === 'showcase') {
        return [this.props.random_name, this.baseitem.name];
      } else if (rarity === 'unique') {
        return ['TODO unique name?', this.baseitem.name];
      } else {
        throw new Error('unrecognized rarity ' + rarity);
      }
    }
  }, {
    key: 'requirements',
    value: function requirements() {
      var requirements = {
        level: this.requiredLevel(),
        str: 0,
        dex: 0,
        int: 0
      };

      if (this.baseitem.component_attribute_requirement != null) {
        requirements.str = this.baseitem.component_attribute_requirement.req_str;
        requirements.dex = this.baseitem.component_attribute_requirement.req_dex;
        requirements.int = this.baseitem.component_attribute_requirement.req_int;
      }

      return requirements;
    }
  }, {
    key: 'requiredLevel',
    value: function requiredLevel() {
      return Math.max.apply(Math, [this.baseitem.drop_level].concat(_toConsumableArray(this.getAllMods().map(function (mod) {
        return mod.requiredLevel();
      }))));
    }
  }, {
    key: 'itemclassName',
    value: function itemclassName() {
      return this.baseitem.item_class.name;
    }
  }, {
    key: 'rarityIdent',
    value: function rarityIdent() {
      return this.props.rarity;
    }

    /**
     * attempts to upgrade the rarity
     * @returns {Boolean} true on change in rarity
     */

  }, {
    key: 'upgradeRarity',
    value: function upgradeRarity() {
      var new_rarity = void 0;

      switch (this.props.rarity) {
        case 'normal':
        case 'showcase':
          new_rarity = 'magic';
          break;
        case 'magic':
          new_rarity = 'rare';
          break;
        default:
          new_rarity = this.props.rarity;
      }

      if (new_rarity !== this.props.rarity) {
        return this.setRarity(new_rarity);
      } else {
        return this;
      }
    }

    /**
     * stats of mods combined
     */

  }, {
    key: 'stats',
    value: function stats() {
      return this.getAllMods().reduce(function (stats, mod) {
        // flattened
        return mod.statsJoined().reduce(function (joined, stat) {
          var id = stat.props.id;

          var existing = joined[id];

          // TODO fix typing
          // group by stat.Id
          if (existing instanceof _Stat2.default) {
            return _extends({}, joined, _defineProperty({}, id, existing.add(stat.values)));
          } else {
            return _extends({}, joined, _defineProperty({}, id, stat));
          }
        }, stats);
      }, {});
    }

    /**
     * TODO
     */

  }, {
    key: 'localStats',
    value: function localStats() {
      if (this.baseitem.component_armour != null) {
        return {
          physical_damage_reduction: String(this.baseitem.component_armour.armour)
        };
      } else {
        return { error: 'could not  build' };
      }
    }
  }, {
    key: 'corrupt',
    value: function corrupt() {
      if (this.props.corrupted) {
        throw new Error('invalid state: is already corrupted');
      } else {
        return this.setProperty('corrupted', true);
      }
    }
  }, {
    key: 'mirror',
    value: function mirror() {
      if (this.props.mirrored) {
        throw new Error('invalid state: is already mirrored');
      } else {
        return this.setProperty('mirrored', true);
      }
    }
  }, {
    key: 'setRarity',
    value: function setRarity(rarity) {
      return this.setProperty('rarity', rarity);
    }

    // private

  }, {
    key: 'setProperty',
    value: function setProperty(prop, value) {
      return this.withMutations(function (builder) {
        return _extends({}, builder, {
          props: _extends({}, builder.props, _defineProperty({}, prop, value))
        });
      });
    }
  }, {
    key: 'affixes',
    get: function get() {
      return this;
    }
  }]);

  return Item;
}(_Container3.default);

Item.MAX_ILVL = 100;
Item.default_props = {
  corrupted: false,
  item_level: Item.MAX_ILVL,
  mirrored: false,
  random_name: 'Random Name',
  rarity: 'normal'
};
exports.default = Item;