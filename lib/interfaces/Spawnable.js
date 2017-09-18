'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


/** 
 * experimental flow feature
export const implementedBy = (thing: MaybeSpawnable): boolean %checks => {
  return thing.spawnableOn != null;
}; */

// filter nothing
var allowAll = function allowAll() {
  return true;
};

/**
 * this is for objects for which we decide at runtime if they implemented that
 * interface
 * 
 * its basically something like <T: ?Spawnable>
 * which means that if any of the properties defined in Spawnable is != null
 * then the hole interface is implemented
 */
var calculateSpawnchance = exports.calculateSpawnchance = function calculateSpawnchance(item, collection) {
  var filter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : allowAll;

  var sum_spawnweight = collection.reduce(function (sum, thing) {
    if (thing.spawnweightFor != null && filter(thing)) {
      return sum + thing.spawnweightFor(item);
    } else {
      return sum;
    }
  }, 0);

  return collection.map(function (thing) {
    var spawnchance = 0;

    if (thing.spawnweightFor != null && filter(thing)) {
      spawnchance = thing.spawnweightFor(item) / sum_spawnweight;
    }

    return {
      spawnchance: spawnchance,
      thing: thing
    };
  });
};