"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var anySet = exports.anySet = function anySet(flags) {
  var whitelist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  // ignore every key in which is in whitelist and no flag set (===true)
  return Object.entries(flags).some(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return !whitelist.includes(key) && value;
  });
};

/**
 
type BaseFlag = "one";

type BaseFlags = Flags<BaseFlag>;

const flags: BaseFlags = {
	one: true, // ok
  two: false, // Error! property `three` is a string. This type is incompatible with string enum
  one: 1, // Error! This type is incompatible with boolean
};

Extension
type ExtendedFlag = BaseFlag | "two";

type ExtendedFlags = BaseFlags | Flags<BaseFlag>; // Flags<ExtendedFlag> polymorphic error!

 */