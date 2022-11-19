/* Namespace > ... */
var DOM = {
  createElement         : null,
  getElementByClassName : null,
  getElementsByClassName: null,
  getElementById        : null,
  getElementsById       : null,
  getElementBySelector  : null,
  getElementsBySelector : null,
  getElementByTagName   : null,
  getElementsByTagName  : null
};

var Event = {
  addListener   : null,
  removeListener: null
};

/* ...
    --- WARN ---
      #Lapys: Side effects
        Notably ignored legacy features:
        • Array.observe(…)
        • Array.unobserve(…)
        • Object.getNotifier(…)
        • Object.observe(…)
        • Object.prototype.__count__
        • Object.prototype.__iterator__
        • Object.prototype.__noSuchMethod__
        • Object.prototype.toSource(…)
        • Object.prototype.unwatch(…)
        • Object.prototype.watch(…)
        • Object.unobserve(…)
        • Proxy::hasOwn(…)

        Possibly deleted objects:
        • Error.prototype.name
        • InternalError.prototype.name
        • Object.prototype.name
        • RangeError.prototype.name
        • TypeError.prototype.name
*/
void function() {
  /* Constant > ... */
  var GLOBAL     = this; // --> "undefined" !== typeof frames ? frames : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : "undefined" !== typeof global ? global : "undefined" !== typeof globalThis ? globalThis : (function() { return this })();
  var ERROR      = new PseudoError;
  var DESCRIPTOR = {configurable: ERROR, enumerable: ERROR, get: ERROR, own: ERROR, set: ERROR, value: ERROR, writable: ERROR};
  var COMPLETED  = false;
  var ANY        = {};

  var RECURSION_OVERFLOW_ERROR = null;
  var REFERENCE_ERROR          = null;
  var TYPE_ERROR               = null;

  /* Class > ... */
  function SafeArray(elements) {
    this.length = arguments.length;

    while (arguments.length--) // ->> Assumed `arguments.length < 256`
    this[arguments.length] = arguments[arguments.length]
  }
    SafeArray.prototype = {
      0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null, 9: null, 10: null, 11: null, 12: null, 13: null, 14: null, 15: null, 16: null, 17: null, 18: null, 19: null, 20: null, 21: null, 22: null, 23: null, 24: null, 25: null, 26: null, 27: null, 28: null, 29: null, 30: null, 31: null, 32: null, 33: null, 34: null, 35: null, 36: null, 37: null, 38: null, 39: null, 40: null, 41: null, 42: null, 43: null, 44: null, 45: null, 46: null, 47: null, 48: null, 49: null, 50: null, 51: null, 52: null, 53: null, 54: null, 55: null, 56: null, 57: null, 58: null, 59: null, 60: null, 61: null, 62: null, 63: null, 64: null, 65: null, 66: null, 67: null, 68: null, 69: null, 70: null, 71: null, 72: null, 73: null, 74: null, 75: null, 76: null, 77: null, 78: null, 79: null, 80: null, 81: null, 82: null, 83: null, 84: null, 85: null, 86: null, 87: null, 88: null, 89: null, 90: null, 91: null, 92: null, 93: null, 94: null, 95: null, 96: null, 97: null, 98: null, 99: null, 100: null, 101: null, 102: null, 103: null, 104: null, 105: null, 106: null, 107: null, 108: null, 109: null, 110: null, 111: null, 112: null, 113: null, 114: null, 115: null, 116: null, 117: null, 118: null, 119: null, 120: null, 121: null, 122: null, 123: null, 124: null, 125: null, 126: null, 127: null, 128: null, 129: null, 130: null, 131: null, 132: null, 133: null, 134: null, 135: null, 136: null, 137: null, 138: null, 139: null, 140: null, 141: null, 142: null, 143: null, 144: null, 145: null, 146: null, 147: null, 148: null, 149: null, 150: null, 151: null, 152: null, 153: null, 154: null, 155: null, 156: null, 157: null, 158: null, 159: null, 160: null, 161: null, 162: null, 163: null, 164: null, 165: null, 166: null, 167: null, 168: null, 169: null, 170: null, 171: null, 172: null, 173: null, 174: null, 175: null, 176: null, 177: null, 178: null, 179: null, 180: null, 181: null, 182: null, 183: null, 184: null, 185: null, 186: null, 187: null, 188: null, 189: null, 190: null, 191: null, 192: null, 193: null, 194: null, 195: null, 196: null, 197: null, 198: null, 199: null, 200: null, 201: null, 202: null, 203: null, 204: null, 205: null, 206: null, 207: null, 208: null, 209: null, 210: null, 211: null, 212: null, 213: null, 214: null, 215: null, 216: null, 217: null, 218: null, 219: null, 220: null, 221: null, 222: null, 223: null, 224: null, 225: null, 226: null, 227: null, 228: null, 229: null, 230: null, 231: null, 232: null, 233: null, 234: null, 235: null, 236: null, 237: null, 238: null, 239: null, 240: null, 241: null, 242: null, 243: null, 244: null, 245: null, 246: null, 247: null, 248: null, 249: null, 250: null, 251: null, 252: null, 253: null, 254: null, 255: null,
      length: 0,

      pop: function pop() {
        this.length -= 0 !== this.length
      },

      push: function push(elements) {
        if (arguments.length + this.length >= 255)
        return 0;

        // ...
        for (var index = arguments.length; index--; )
        this[index + this.length] = arguments[index];

        return (this.length += arguments.length)
      }
    };

  function AssertionError(message, name) {
    return new Error("Assertion failed" + (arguments.length > 0 ? ": " + message : ""), arguments.length > 1 ? name : "AssertionError")
  }

  function CSSSelector(source) {
    this.attributes = new SafeArray;
    this.classList  = new SafeArray
  }
    CSSSelector.prototype = {
      attributes: new SafeArray,
      classList : new SafeArray,
      id        : null,
      tagName   : null
    };

  function DOMTree() {}
    DOMTree.prototype = SafeArray.prototype;

  function Error(message, name) {
    return new TypeError(message, arguments.length > 1 ? name : "Error")
  }

  function Pseudo() {}

  function PseudoError() {
    return ERROR
  }
    PseudoError.prototype = {
      message: "",
      name   : "Error"
    };

  function NativeAssertionError(message, name) {
    return new Error(message, arguments.length > 1 ? name : "NativeAssertionError")
  }

  function RecursionOverflowError(message, name) {
    ERROR = RECURSION_OVERFLOW_ERROR;

    if (null === RECURSION_OVERFLOW_ERROR) {
      try { ERROR = new RecursionOverflowError(arguments.length ? message : "") }
      catch (error) { ERROR = error }
    }

    if (RECURSION_OVERFLOW_ERROR === RecursionOverflowError.prototype) ERROR.name = arguments.length > 1 ? name : ERROR.name;
    ERROR.message            = arguments.length ? message : "";
    RECURSION_OVERFLOW_ERROR = ERROR;

    return ERROR
  }

  function ReferenceError(message, name) {
    ERROR = REFERENCE_ERROR;

    if (null === REFERENCE_ERROR) {
      try { ඞ } // WARN (Lapys) -> Identifier must be non-deducible and non-defined
      catch (error) { ERROR = error }
    }

    if (REFERENCE_ERROR === ReferenceError.prototype) ERROR.name = arguments.length > 1 ? name : ERROR.name;
    ERROR.message   = arguments.length ? message : "";
    REFERENCE_ERROR = ERROR;

    return ERROR
  }

  function SafeString(characters) {
    var string = this.toString();

    // ...
    this.length = arguments.length;

    while (arguments.length--) // ->> Assumed `arguments.length < 256`
    this[arguments.length] = arguments[arguments.length];

    this.toString = function toString() { return string }
  }
    SafeString.prototype = {
      0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null, 9: null, 10: null, 11: null, 12: null, 13: null, 14: null, 15: null, 16: null, 17: null, 18: null, 19: null, 20: null, 21: null, 22: null, 23: null, 24: null, 25: null, 26: null, 27: null, 28: null, 29: null, 30: null, 31: null, 32: null, 33: null, 34: null, 35: null, 36: null, 37: null, 38: null, 39: null, 40: null, 41: null, 42: null, 43: null, 44: null, 45: null, 46: null, 47: null, 48: null, 49: null, 50: null, 51: null, 52: null, 53: null, 54: null, 55: null, 56: null, 57: null, 58: null, 59: null, 60: null, 61: null, 62: null, 63: null, 64: null, 65: null, 66: null, 67: null, 68: null, 69: null, 70: null, 71: null, 72: null, 73: null, 74: null, 75: null, 76: null, 77: null, 78: null, 79: null, 80: null, 81: null, 82: null, 83: null, 84: null, 85: null, 86: null, 87: null, 88: null, 89: null, 90: null, 91: null, 92: null, 93: null, 94: null, 95: null, 96: null, 97: null, 98: null, 99: null, 100: null, 101: null, 102: null, 103: null, 104: null, 105: null, 106: null, 107: null, 108: null, 109: null, 110: null, 111: null, 112: null, 113: null, 114: null, 115: null, 116: null, 117: null, 118: null, 119: null, 120: null, 121: null, 122: null, 123: null, 124: null, 125: null, 126: null, 127: null, 128: null, 129: null, 130: null, 131: null, 132: null, 133: null, 134: null, 135: null, 136: null, 137: null, 138: null, 139: null, 140: null, 141: null, 142: null, 143: null, 144: null, 145: null, 146: null, 147: null, 148: null, 149: null, 150: null, 151: null, 152: null, 153: null, 154: null, 155: null, 156: null, 157: null, 158: null, 159: null, 160: null, 161: null, 162: null, 163: null, 164: null, 165: null, 166: null, 167: null, 168: null, 169: null, 170: null, 171: null, 172: null, 173: null, 174: null, 175: null, 176: null, 177: null, 178: null, 179: null, 180: null, 181: null, 182: null, 183: null, 184: null, 185: null, 186: null, 187: null, 188: null, 189: null, 190: null, 191: null, 192: null, 193: null, 194: null, 195: null, 196: null, 197: null, 198: null, 199: null, 200: null, 201: null, 202: null, 203: null, 204: null, 205: null, 206: null, 207: null, 208: null, 209: null, 210: null, 211: null, 212: null, 213: null, 214: null, 215: null, 216: null, 217: null, 218: null, 219: null, 220: null, 221: null, 222: null, 223: null, 224: null, 225: null, 226: null, 227: null, 228: null, 229: null, 230: null, 231: null, 232: null, 233: null, 234: null, 235: null, 236: null, 237: null, 238: null, 239: null, 240: null, 241: null, 242: null, 243: null, 244: null, 245: null, 246: null, 247: null, 248: null, 249: null, 250: null, 251: null, 252: null, 253: null, 254: null, 255: null,
      length: 0,

      toString: function toString() {
        var string = "";

        // ...
        for (var index = this.length; index; )
        string = this[--index] + string;

        return string
      }
    };

  function TypeError(message, name) {
    ERROR = TYPE_ERROR;

    if (null === TYPE_ERROR) {
      try { null() }
      catch (error) { ERROR = error }
    }

    if (TYPE_ERROR === TypeError.prototype) ERROR.name = arguments.length > 1 ? name : ERROR.name;
    ERROR.message = arguments.length ? message : "";
    TYPE_ERROR    = ERROR;

    return ERROR
  }

  function UnreachableStateError(debug) {
    if (null !== debug) debugger;
    return new RecursionOverflowError("Unexpected state reached", "UnreachableStateError")
  }

  /* Namespace > ... */
  var Constants = {
    ALLOWS_NAMED_RECURSION_OVERFLOW_ERROR            : false,
    ALLOWS_NAMED_REFERENCE_ERROR                     : false,
    ALLOWS_NAMED_TYPE_ERROR                          : false,
    STRICT_MODE                                      : false,
    SUPPORTS_STRING_CHARACTER_ACCESS_BRACKET_NOTATION: false
  };

  var Native = {
    AS_BIGINT            : 0x000001,
    AS_BOOLEAN           : 0x000002,
    AS_CLASS_FUNCTION    : 0x000004,
    AS_DATE              : 0x000008, // ->> Internet Explorer only
    AS_FUNCTION          : 0x000010,
    AS_GENERATOR_FUNCTION: 0x000020,
    AS_GETTER            : 0x000040,
    AS_GETTER_FUNCTION   : 0x000080,
    AS_NULL              : 0x000100,
    AS_NUMBER            : 0x000200,
    AS_OBJECT            : 0x000400,
    AS_OBJECT_FUNCTION   : 0x000800, // ->> Internet Explorer 8 and before --> ; MSIE 8.×;
    AS_PROPERTY          : 0x001000,
    AS_SETTER            : 0x002000,
    AS_SETTER_FUNCTION   : 0x004000,
    AS_STRING            : 0x008000,
    AS_SYMBOL            : 0x010000,
    AS_UNDEFINED         : 0x020000,
    AS_UNKNOWN           : 0x040000, // ->> Internet Explorer only
    DEFAULT              : {valueOf: function valueOf() { return Native.AS_BIGINT | Native.AS_BOOLEAN | Native.AS_NUMBER | Native.AS_NULL | Native.AS_OBJECT_FUNCTION | Native.AS_PROPERTY | Native.AS_OBJECT | Native.AS_STRING | Native.AS_SYMBOL | Native.NAMED | Native.STRICT | Native.UNNAMED }},
    NAMED                : 0x080000,
    STRICT               : 0x100000,
    UNNAMED              : 0x200000,

    // ...
    PROMISE: {
      native     : ANY,
      object     : null,
      objectName : null,
      onerror    : function onerror(object, key, options, native) { return ERROR },
      onfail     : null,
      onpass     : null,
      options    : 0x000000,
      propertyKey: null,
      subpromise : {
        "finally": function(handler) {
          var value = ERROR;

          // ...
          try { value = handler(Native.PROMISE.native) }
          catch (error) {}

          if (ERROR === value) {
            Native.PROMISE.onfail = Native.PROMISE.onerror;
            return Native.PROMISE["throw"]()
          }

          // ...
          return value
        },

        valueOf: (function(handler) {
          return function valueOf() { return Native.PROMISE.subpromise["finally"](handler) }
        })(function(native) { return native })
      },

      "catch": function(handler) {
        var PROMISE = Native.PROMISE;

        /* ... */
        PROMISE.onfail = handler;

        try { PROMISE.native = PROMISE.onpass(PROMISE.object, PROMISE.propertyKey, PROMISE.options, PROMISE.native) }
        catch (error) { PROMISE.native = ERROR }

        PROMISE.onpass = null;

        // ...
        if (ERROR === PROMISE.native)
        return PROMISE["throw"]();

        if (PROMISE.options & Native.STRICT) {
          if (PROMISE.options & Native.AS_GETTER) {}
          if (PROMISE.options & Native.AS_SETTER) {}

          if (
            ("object"   === typeof PROMISE.native && (PROMISE.options & (Native.AS_OBJECT_FUNCTION))) ||
            ("function" === typeof PROMISE.native && (PROMISE.options & (Native.AS_CLASS_FUNCTION | Native.AS_FUNCTION | Native.AS_GENERATOR_FUNCTION | Native.AS_GETTER_FUNCTION | Native.AS_OBJECT_FUNCTION | Native.AS_SETTER_FUNCTION)))
          ) {
            var sourceMatch   = false;
            var source        = null;
            var prototyped    = false;
            var nativeSources = [
              new SafeString('[', 'C', 'o', 'm', 'm', 'a', 'n', 'd', ' ', 'L', 'i', 'n', 'e', ' ', 'A', 'P', 'I', ']'),
              new SafeString('[', 'n', 'a', 't', 'i', 'v', 'e', ' ', 'c', 'o', 'd', 'e', ']')
            ];

            // ... --- WARN (Lapys) -> Fails in JavaScript implementations that have built-in functions with the `prototype` property
            try {
              if (PROMISE.options & (Native.AS_CLASS_FUNCTION | Native.AS_FUNCTION | Native.AS_GENERATOR_FUNCTION | Native.AS_OBJECT_FUNCTION))
              if ("prototype" in PROMISE.native || false === delete PROMISE.native["prototype"]) return PROMISE["throw"]()
            } catch (error) { prototyped = true }

            if (prototyped)
            return PROMISE["throw"]();

            // ...
            if (
              null !== Native.Function$prototype$apply && null !== Native.Function$prototype$toString &&
              false === (PROMISE.object === Native.Function$prototype$apply && PROMISE.propertyKey === "apply")
            ) {
              if (null !== Native.Function$prototype$bind)
                source = Native.Function$prototype$apply(Native.Function$prototype$toString, [PROMISE.native]);

              // UPDATE (Lapys) -> Check `nativeof(Function.prototype.apply.apply)`
              if (delete Native.Function$prototype$apply["apply"]) { // WARN (Lapys) -> Possibly spoofed by `Proxy` — including calling it
                Native.Function$prototype$apply.apply = Native.Function$prototype$apply;

                if (Native.Function$prototype$apply === Native.Function$prototype$apply.apply) {
                  // ... --- WARN (Lapys) ->> Assume unchanged since property access in (strict) comparison conditional
                  source = Native.Function$prototype$apply.apply(Native.Function$prototype$toString, [PROMISE.native]);

                  if ("string" !== typeof source || source.length < (18 /* --> Math.max(...nativeSources.map(x => x.length)) */) + (
                    PROMISE.options & Native.AS_CLASS_FUNCTION     ? "class{}"      .length + (PROMISE.options & Native.NAMED ? PROMISE.propertyKey.length + ' '.length : 0) :
                    PROMISE.options & Native.AS_GENERATOR_FUNCTION ? "function*(){}".length + (PROMISE.options & Native.NAMED ? PROMISE.propertyKey.length + ' '.length : 0) :
                    PROMISE.options & Native.AS_GETTER_FUNCTION    ? "get _(){}"    .length + (PROMISE.options & Native.NAMED ? PROMISE.propertyKey.length - '_'.length : 0) :
                    PROMISE.options & Native.AS_OBJECT_FUNCTION    ? "function(){}" .length + (PROMISE.options & Native.NAMED ? PROMISE.propertyKey.length + ' '.length : 0) :
                    PROMISE.options & Native.AS_SETTER_FUNCTION    ? "set _(){}"    .length + (PROMISE.options & Native.NAMED ? PROMISE.propertyKey.length - '_'.length : 0) :
                    PROMISE.options & Native.AS_FUNCTION           ? 13 /* --> Math.max(…) */ : 0
                  )) return PROMISE["throw"]()
                }
              }

              // ...
              if (null === source)
              return PROMISE["throw"]();

              for (var index = nativeSources.length; index && false === sourceMatch; ) {
                var nativeSource = nativeSources[--index].toString();

                sourceMatch = (
                  ((PROMISE.options & Native.NAMED) && (
                    source === "function "   + PROMISE.propertyKey + "() { "      + nativeSource + " }"  ||
                    source === "function "   + PROMISE.propertyKey + "() {\n    " + nativeSource + "\n}" ||
                    source === "\nfunction " + PROMISE.propertyKey + "() {\n    " + nativeSource + "\n}\n"
                  )) ||
                  ((PROMISE.options & Native.UNNAMED) && (
                    source === "function() { "        + nativeSource + " }"  ||
                    source === "function() {\n    "   + nativeSource + "\n}" ||
                    source === "\nfunction() {\n    " + nativeSource + "\n}\n"
                  ))
                )
              }

              if (false === sourceMatch) {
                var at = null;

                // ...
                if (null !== Native.String$prototype$charAt) {
                  if (null !== Native.Function$prototype$bind)
                    at = function at(string, index) { return Native.Function$prototype$apply(Native.String$prototype$charAt, [string, [index]]) };

                  // WARN (Lapys) ->> Assume unchanged since property access in comparison conditional
                  else if (Native.Function$prototype$apply === Native.Function$prototype$apply.apply)
                    at = function at(string, index) { return Native.Function$prototype$apply.apply(Native.String$prototype$charAt, [string, [index]]) }
                }

                if (null !== at) {
                  var declarators = [
                    new SafeString('c', 'l', 'a', 's', 's'),
                    new SafeString('f', 'u', 'n', 'c', 't', 'i', 'o', 'n'),
                    new SafeString('g', 'e', 't'),
                    new SafeString('s', 'e', 't')
                  ], delimiters = ""; // ->> Array of delimiter IDs

                  // ...
                  if (PROMISE.options & (Native.NAMED | Native.UNNAMED)) {
                    var subsourceMatch = false;

                    // ...
                    parse_head:
                    for (var declaratorsIndex = declarators.length; declaratorsIndex; ) {
                      var declarator       = declarators[--declaratorsIndex];
                      var declaratorOffset = 0;
                      var sourceOffset     = 0;

                      // ...
                      while (at(source, sourceOffset++) === declarator[declaratorOffset++]) {
                        if (declaratorOffset === declarator.length) {
                          var commented                = false;
                          var name                     = ["", ""];
                          var generatorDeclaratorMatch = false;

                          // ...
                          if (PROMISE.options & Native.AS_FUNCTION) { if (declarator.toString() !== "class" && declarator.toString() !== "function" && declarator.toString() !== "get" && declarator.toString() !== "set") break }
                          else if (PROMISE.options & Native.AS_CLASS_FUNCTION)  { if (declarator.toString() !== "class") break }
                          else if (PROMISE.options & Native.AS_GETTER_FUNCTION) { if (declarator.toString() !== "get")   break }
                          else if (PROMISE.options & Native.AS_SETTER_FUNCTION) { if (declarator.toString() !== "set")   break }
                          else if (PROMISE.options & (Native.AS_GENERATOR_FUNCTION | Native.AS_OBJECT_FUNCTION)) { if (declarator.toString() !== "function") break }

                          for (var sourceIndex = sourceOffset; sourceIndex !== source.length; ++sourceIndex) {
                            var character = at(source, sourceIndex);

                            // ...
                            if (commented) { commented = false === (character === '*' && at(source, sourceIndex + 1) === '/'); continue }
                            if (character === '/' && at(source, sourceIndex + 1) === '*') { commented = true; continue }

                            if (character === '*') {
                              if (generatorDeclaratorMatch || false === (PROMISE.options & (Native.AS_FUNCTION | Native.AS_GENERATOR_FUNCTION))) break;
                              generatorDeclaratorMatch = true
                            }

                            if (character === '(') {
                              subsourceMatch = (PROMISE.options & Native.NAMED) && (PROMISE.options & Native.UNNAMED)
                                ? name[0] === PROMISE.propertyKey || "" === name[0]
                                : name[0] === (PROMISE.options & Native.NAMED ? PROMISE.propertyKey : "");
                              break parse_head
                            }

                            switch (character) {
                              case ' ':
                              case '\f': case '\n': case '\r': case '\t': case '\v':
                              case '\u00A0': case '\u1680': case '\u2000': case '\u2001': case '\u2002': case '\u2003': case '\u2004': case '\u2005': case '\u2006': case '\u2007': case '\u2008': case '\u2009': case '\u200A': case '\u202F': case '\u205F': case '\u3000':
                                name[1] += "" === name[0] ? "" : character;
                                break;

                              default:
                                name[0] += name[1] + character;
                                name[1]  = ""
                            }
                          }

                          break
                        }

                        if (sourceOffset === source.length)
                        break
                      }
                    }

                    if (false === subsourceMatch)
                    return PROMISE["throw"]()
                  }

                  parse_body:
                  for (var sourceIndex = 0; sourceIndex !== source.length; ++sourceIndex) {
                    var character = at(source, sourceIndex);
                    var delimiter = delimiters.length ? at(delimiters, 0) : null;

                    // ...
                    do {
                      var delimited = "";

                      // ...
                      switch (delimiter) {
                        case '\"': case '\'': if (character !== delimiter) continue parse_body; break;
                        case '/':             if (character !== '*' || at(source, sourceIndex + 1) !== '/') continue parse_body
                      }

                      switch (character) {
                        case '(': delimiters = (delimiter = '(') + delimiters; continue;
                        case '[': delimiters = (delimiter = '[') + delimiters; continue;
                        case '{': delimiters = (delimiter = '{') + delimiters; continue;
                        case '/': if (at(source, sourceIndex + 1) === '*') delimiters = (delimiter = '/') + delimiters; continue;

                        case '*':                     if (at(source, sourceIndex + 1) !== '/') continue; break;
                        case '\"': case '\'':         if (character !== delimiter) { delimiters = character + delimiters; continue } break;
                        case ')': case ']': case '}': if ((character !== ')' || delimiter !== '(') && (character !== ']' || delimiter !== '[') && (character !== '}' || delimiter !== '{')) continue; break;

                        default: continue
                      }

                      // ...
                      for (var index = delimiters.length; --index; )
                      delimited = at(delimiters, index) + delimited;

                      delimiters = delimited
                    } while (false);

                    for (var nativeSourcesIndex = nativeSources.length; nativeSourcesIndex; ) {
                      var nativeSource       = nativeSources[--nativeSourcesIndex];
                      var nativeSourceOffset = 0;
                      var sourceOffset       = sourceIndex;

                      // ...
                      while (at(source, sourceOffset++) === nativeSource[nativeSourceOffset++]) {
                        if (nativeSourceOffset === nativeSource.length) {
                          if (delimiter === '[') {
                            sourceMatch = true;
                            break parse_body
                          }
                        }

                        if (sourceOffset === source.length)
                        break
                      }
                    }
                  }

                  // ...
                  if (false === sourceMatch)
                  return PROMISE["throw"]()
                }
              }
            }

            else if ("toString" in Native.Function$prototype && "toString" in Native.Object$prototype) {
              var native = null !== Native.Function$prototype$toString ? PROMISE.object === Native.Function$prototype && PROMISE.propertyKey === "toString" ? PROMISE.native : Native.Function$prototype$toString : Native.Function$prototype.toString;

              // ...
              if (false === (delete Native.Function$prototype["toString"] && delete Native.Object$prototype["toString"] && delete PROMISE.native["toString"])) {
                Native.Function$prototype.toString = native;
                Native.Object$prototype.toString   = Native.Object$prototype$toString$;

                return PROMISE["throw"]()
              }

              try {
                Native.Function$prototype.toString = native;
                source                             = PROMISE.native.toString();

                for (var index = nativeSources.length; index && false === sourceMatch; ) {
                  var nativeSource = nativeSources[--index];

                  sourceMatch = (
                    (((PROMISE.options & Native.UNNAMED) || false == (PROMISE.options & Native.NAMED)) && (
                      source === "function() { "        + nativeSource + " }"  ||
                      source === "function() {\n    "   + nativeSource + "\n}" ||
                      source === "\nfunction() {\n    " + nativeSource + "\n}\n"
                    )) ||
                    (((PROMISE.options & Native.NAMED) || false == (PROMISE.options & Native.UNNAMED)) && (
                      source === "function "   + PROMISE.propertyKey + "() { "      + nativeSource + " }"  ||
                      source === "function "   + PROMISE.propertyKey + "() {\n    " + nativeSource + "\n}" ||
                      source === "\nfunction " + PROMISE.propertyKey + "() {\n    " + nativeSource + "\n}\n"
                    ))
                  )
                }
              } catch (error) {}

              Native.Object$prototype.toString   = Native.Object$prototype$toString$;
              if (false === sourceMatch) return PROMISE["throw"]()
            }

            else
              return PROMISE["throw"]()
          }
        }

        if (false === (
          ((PROMISE.options & Native.AS_BIGINT)             && ("bigint"    === typeof PROMISE.native))                                       ||
          ((PROMISE.options & Native.AS_BOOLEAN)            && ("boolean"   === typeof PROMISE.native))                                       ||
          ((PROMISE.options & Native.AS_CLASS_FUNCTION)     && ("function"  === typeof PROMISE.native))                                       ||
          ((PROMISE.options & Native.AS_FUNCTION)           && ("function"  === typeof PROMISE.native))                                       ||
          ((PROMISE.options & Native.AS_GENERATOR_FUNCTION) && ("function"  === typeof PROMISE.native))                                       ||
          ((PROMISE.options & Native.AS_GETTER_FUNCTION)    && ("function"  === typeof PROMISE.native))                                       ||
          ((PROMISE.options & Native.AS_NUMBER)             && ("number"    === typeof PROMISE.native))                                       ||
          ((PROMISE.options & Native.AS_OBJECT)             && ("object"    === typeof PROMISE.native && null !== PROMISE.native))            ||
          ((PROMISE.options & Native.AS_OBJECT_FUNCTION)    && ("function"  === typeof PROMISE.native || "object" === typeof PROMISE.native)) ||
          ((PROMISE.options & Native.AS_SETTER_FUNCTION)    && ("function"  === typeof PROMISE.native))                                       ||
          ((PROMISE.options & Native.AS_STRING)             && ("string"    === typeof PROMISE.native))                                       ||
          ((PROMISE.options & Native.AS_SYMBOL)             && ("symbol"    === typeof PROMISE.native))                                       ||
          ((PROMISE.options & Native.AS_UNDEFINED)          && ("undefined" === typeof PROMISE.native))                                       ||

          ((PROMISE.options & Native.AS_NULL)     && null === PROMISE.native) ||
          ((PROMISE.options & Native.AS_PROPERTY) && false === PROMISE.propertyKey in PROMISE.object)
        )) return PROMISE["throw"]();

        // ...
        return PROMISE.subpromise
      },

      get: function get(handler) {
        var PROMISE = Native.PROMISE;

        /* ... */
        if (null === PROMISE.onpass) {
          if (null === handler) return PROMISE["try"](null)["catch"](null);
          return PROMISE["try"](arguments.length ? handler : PROMISE.valueOf)["catch"](PROMISE.onerror)
        }

        throw new NativeAssertionError("Encountered invalid use of `nativeof(...)` assertion")
      },

      "throw": function() {
        var PROMISE = Native.PROMISE;

        /* ... */
        if (null === PROMISE.onfail) {
          PROMISE.native = ERROR;
          return PROMISE.subpromise
        }

        if (ERROR === PROMISE.onfail(PROMISE.object, PROMISE.propertyKey, PROMISE.options, PROMISE.native)) {
          PROMISE.native = ERROR;
          throw new NativeAssertionError("Unable to evaluate " + ("symbol" !== typeof PROMISE.propertyKey ? '`' + (null !== PROMISE.objectName ? PROMISE.objectName + '.' : "") + PROMISE.propertyKey + (
            (PROMISE.options & (Native.AS_CLASS_FUNCTION | Native.AS_FUNCTION | Native.AS_GENERATOR_FUNCTION | Native.AS_GETTER_FUNCTION | Native.AS_OBJECT_FUNCTION | Native.AS_SETTER_FUNCTION)) &&
            false == (PROMISE.options & (Native.AS_BIGINT | Native.AS_BOOLEAN | Native.AS_NUMBER | Native.AS_NULL | Native.AS_OBJECT | Native.AS_STRING | Native.AS_SYMBOL | Native.AS_UNDEFINED)) ? "()" : ""
          ) + '`' : "feature") + " as built-in native")
        }

        return PROMISE.subpromise
      },

      "try": function(handler) {
        var PROMISE = Native.PROMISE;

        /* ... */
        if (null === PROMISE.onpass) { PROMISE.onpass = null === handler ? PROMISE.valueOf : handler; return PROMISE }
        throw new NativeAssertionError("Encountered invalid use of `nativeof(...)` assertion")
      },

      valueOf: function valueOf(object, key) {
        try {
          if (key in object)
          return object[key]
        } catch (error) {}

        return ERROR
      }
    },

    // ...
    Object$prototype$toString$               : null,
    RecursionOverflowError$                  : RecursionOverflowError,
    TypeError$                               : TypeError,

    clearInterval                            : null,
    clearTimeout                             : null,
    document                                 : null,
    Error$prototype                          : null,
    EventTarget$prototype$addEventListener   : null,
    EventTarget$prototype$attachEvent        : null,
    EventTarget$prototype$detachEvent        : null,
    EventTarget$prototype$removeEventListener: null,
    Function$prototype                       : null,
    Function$prototype$apply                 : null,
    Function$prototype$bind                  : null,
    Function$prototype$toString              : null,
    Object$defineProperty                    : null,
    Object$getOwnPropertyDescriptor          : null,
    Object$prototype                         : null,
    Object$prototype$__defineGetter__        : null,
    Object$prototype$__defineGetter__        : null,
    Object$prototype$__lookupGetter__        : null,
    Object$prototype$__lookupSetter__        : null,
    RecursionOverflowError$prototype         : null,
    requestAnimationFrame                    : null,
    setInterval                              : null,
    setTimeout                               : null,
    String$prototype$charAt                  : null,
    TypeError$prototype                      : null
  };

  /* Function > ... */
  function at(object, index) {
    if ("string" === typeof object) {
      if (Constants.SUPPORTS_STRING_CHARACTER_ACCESS_BRACKET_NOTATION) {
        at = function at(object, index) { return object[index] };
        return at(object, index)
      }

      if (null === Native.String$prototype$charAt)
      return ERROR;

      if (null !== Native.Function$prototype$bind) {
        at = function at(object, index) { return Native.Function$prototype$apply(Native.String$prototype$charAt, [object, [index]]) };
        return at(object, index)
      }

      if (delete Native.Function$prototype$apply["apply"]) { // WARN (Lapys) -> Possibly spoofed by `Proxy`
        Native.Function$prototype$apply.apply = Native.Function$prototype$apply;

        if (Native.Function$prototype$apply === Native.Function$prototype$apply.apply) {
          // ... --- WARN (Lapys) ->> Assume unchanged since property access in (strict) comparison conditional
          var value = Native.Function$prototype$apply.apply(Native.String$prototype$charAt, [object, [index]]);
          if ("string" === typeof value && value.length === 1) return value
        }
      }

      return ERROR
    }

    return object[index]
  }

  function cssof(selector) {}

  function define(object, key, descriptor) /* --> Expects `descriptor` to be the same format as `DESCRIPTOR` */ {
    if (descriptor.own) try {
      if (null === Native.Object$defineProperty && null === Native.Object$prototype$__lookupGetter__ && null === Native.Object$prototype$__lookupSetter__)
        ERROR !== descriptor.value ? object[key] = descriptor.value : undefined;

      else if (null !== Native.Object$defineProperty)
        Native.Object$defineProperty(descriptor, key, ERROR === descriptor.value
          ? {configurable: descriptor.configurable, enumerable: descriptor.enumerable, get: descriptor.get, set: descriptor.set}
          : {configurable: descriptor.configurable, enumerable: descriptor.enumerable, value: descriptor.value, writable: descriptor.writable}
        );

      else {
        // UPDATE
        if (null !== Native.Object$prototype$__defineGetter__) {}
        if (null !== Native.Object$prototype$__defineSetter__) {}
      }

      return true
    } catch (error) {}

    return false
  }

  function describe(object, key) {
    DESCRIPTOR.configurable = ERROR;
    DESCRIPTOR.enumerable   = ERROR;
    DESCRIPTOR.get          = ERROR;
    DESCRIPTOR.own          = true;
    DESCRIPTOR.set          = ERROR;
    DESCRIPTOR.value        = ERROR;
    DESCRIPTOR.writable     = ERROR;

    // ...
    if (null === object || undefined === object)
      DESCRIPTOR.own = false;

    else if (null === Native.Object$getOwnPropertyDescriptor && null === Native.Object$prototype$__lookupGetter__ && null === Native.Object$prototype$__lookupSetter__) {
      var computedProperty = false;
      var value;

      // ...
      for (var subkey in object)
      if (key === subkey) {
        DESCRIPTOR.enumerable = true;
        break
      }

      try {
        var hasProperty;
        var redefineProperty;

        // ...
        DESCRIPTOR.configurable = true;
        value                   = object[key];

        try { hasProperty = key in object }  // WARN (Lapys) -> Can be spoofed by the `Proxy::has(…)` trap
        catch (error) { hasProperty = true } // NOTE (Lapys) -> Presumed

        try {
          DESCRIPTOR.configurable = delete object[key]; // WARN (Lapys) -> Can be spoofed by the `Proxy::deleteProperty(…)` trap

          try { redefineProperty = DESCRIPTOR.configurable || (hasProperty && false === key in object) }
          catch (error) { redefineProperty = false }

          if (redefineProperty) {
            try { object[key] = value }
            catch (error) { computedProperty = true }
          }
        } catch (error) { DESCRIPTOR.configurable = false }

        DESCRIPTOR.own = false === DESCRIPTOR.configurable || hasProperty;
        if (false === computedProperty && DESCRIPTOR.configurable) try {
          var subvalue;

          // ...
          object[key]      = ANY;         // ->> Exception throwable from (owned/ non-owned) possible setter
          subvalue         = object[key]; // ->> Exception throwable from (owned/ non-owned) possible getter
          redefineProperty = false;

          if (subvalue === value) DESCRIPTOR.writable = false;
          else if (ANY !== subvalue) computedProperty = true;
          else try {
            object[key] = value;
            subvalue    = object[key];

            if (subvalue === value) DESCRIPTOR.writable = true;
            else { DESCRIPTOR.writable = false; value = subvalue }
          } catch (error) { computedProperty = true }
        } catch (error) { redefineProperty = true }

        if (redefineProperty) {
          computedProperty = true;

          try { object[key] = value }
          catch (error) {}
        }
      } catch (error) { computedProperty = true }

      // ... ->> Evaluated as own property
      if (computedProperty) {
        DESCRIPTOR.configurable = ERROR;
        DESCRIPTOR.get          = null;
        DESCRIPTOR.set          = null;
        DESCRIPTOR.value        = ERROR;
        DESCRIPTOR.writable     = ERROR
      }

      else {
        DESCRIPTOR.get   = ERROR;
        DESCRIPTOR.set   = ERROR;
        DESCRIPTOR.value = value
      }
    }

    else if (null !== Native.Object$getOwnPropertyDescriptor) {
      var descriptor = Native.Object$getOwnPropertyDescriptor(object, key);

      // ...
      DESCRIPTOR.own = false;

      if (descriptor !== undefined) {
        var hasGetter = false;
        var hasSetter = false;
        var hasValue  = false;

        // ...
        try { hasGetter = "get" in descriptor } catch (error) {}
        try { hasSetter = "set" in descriptor } catch (error) {}
        try { hasValue = "value" in descriptor } catch (error) { try { hasValue = "writable" in descriptor } catch (error) {} }

        // ...
        DESCRIPTOR.configurable = descriptor.configurable;
        DESCRIPTOR.enumerable   = descriptor.enumerable;
        DESCRIPTOR.own          = true;

        if (hasGetter && hasSetter && hasValue)
          DESCRIPTOR.own = false;

        else if (hasValue) {
          DESCRIPTOR.value    = descriptor.value;
          DESCRIPTOR.writable = descriptor.writable
        }

        else {
          DESCRIPTOR.get = descriptor.get;
          DESCRIPTOR.set = descriptor.set
        }
      }
    }

    else {
      // UPDATE
      if (null !== Native.Object$prototype$__lookupGetter__) {}
      if (null !== Native.Object$prototype$__lookupSetter__) {}
    }

    return {
      configurable: DESCRIPTOR.configurable,
      enumerable  : DESCRIPTOR.enumerable,
      get         : DESCRIPTOR.get,
      own         : DESCRIPTOR.own,
      set         : DESCRIPTOR.set,
      value       : DESCRIPTOR.value,
      writable    : DESCRIPTOR.writable
    }
  }

  function nativeof(object, key, options, name) {
    Native.PROMISE.object      = object;
    Native.PROMISE.objectName  = arguments.length > 3 ? name : null;
    Native.PROMISE.options     = arguments.length > 2 ? options | 0x000000 : +Native.DEFAULT;
    Native.PROMISE.propertyKey = key;

    return Native.PROMISE
  }

  /* Modification > Native > ... */
  try {
    Pseudo.prototype = GLOBAL.TypeError.prototype;

    if (false === new TypeError instanceof Pseudo) throw new PseudoError();
    Native.TypeError$prototype = Pseudo.prototype
  } catch (error) {}

  if (null !== Native.TypeError$prototype)
  try {
    Pseudo.prototype = GLOBAL.Error.prototype;

    if (false === new TypeError instanceof Pseudo) throw new PseudoError();
    Native.Error$prototype = Native.TypeError$prototype === Pseudo.prototype ? null : Pseudo.prototype
  } catch (error) {}

  if (null !== Native.Error$prototype)
  try {
    try           { Pseudo.prototype = GLOBAL.InternalError.prototype }
    catch (error) { Pseudo.prototype = GLOBAL.RangeError.prototype }

    if (false === new RecursionOverflowError instanceof Pseudo) throw new PseudoError();
    Native.RecursionOverflowError$prototype = Native.Error$prototype === Pseudo.prototype ? null : Pseudo.prototype
  } catch (error) {}

  try {
    Pseudo.prototype = GLOBAL.Object.prototype;
    if (false === (Pseudo instanceof Pseudo && ({}) instanceof Pseudo)) throw new PseudoError();

    Native.Object$prototype = Pseudo.prototype
  } catch (error) { throw new NativeAssertionError("Unable to evaluate `Object.prototype` as native built-in") }

  /* ... ->> Define `name` properties for `...ERROR`s */
  if (null !== Native.Error$prototype && null !== Native.Object$prototype && null !== Native.TypeError$prototype) {
    var descriptors    = {Error$prototype$name: ERROR, Object$prototype$name: ERROR};
    var subdescriptors = ["RecursionOverflowError", "TypeError"];

    // ...
    do {
      descriptors.Object$prototype$name = describe(Native.Object$prototype, "name");
      if (false === descriptors.Object$prototype$name.configurable || ERROR === descriptors.Object$prototype$name.value) break;

      descriptors.Error$prototype$name = describe(Native.Error$prototype, "name");
      if (false === descriptors.Error$prototype$name.configurable || ERROR === descriptors.Error$prototype$name.value) break;

      // ... ->> Allow guaranteed definition as own properties
      delete Native.Error$prototype["name"];
      delete Native.Object$prototype["name"];

      // ...
      for (var index = subdescriptors.length; index; ) {
        var subdescriptor = describe(Native[subdescriptors[--index] + "$prototype"], "name");

        // ...
        if (subdescriptor.configurable && ERROR !== subdescriptor.value)
        if (delete subdescriptor["name"]) {
          var constructor = Native[subdescriptors[index] + '$'];
          var error       = new constructor(); // ->> Capture `...ERROR`

          // ...
          constructor.prototype = error; // ->> Assert `name` as own property
          error.name            = subdescriptor.value;

          define(Native[subdescriptors[index] + "$prototype"], "name", subdescriptor.value)
        }
      }

      define(Native.Error$prototype, "name", descriptors.Error$prototype$name);
      define(Native.Object$prototype, "name", descriptors.Object$prototype$name)
    } while (false)
  }

  /* Modification */
    /* Constants > ... */
    try { Constants.STRICT_MODE = arguments.callee, false }
    catch (error) { Constants.STRICT_MODE = true }

    Constants.SUPPORTS_STRING_CHARACTER_ACCESS_BRACKET_NOTATION = false === Constants.STRICT_MODE && false === delete 'ඞ'[0]; // ->> Unable to assert on strict mode

    /* Native > ... */
    try { Native.Object$prototype$toString$ = Native.Object$prototype.toString }
    catch (error) { throw new NativeAssertionError("Unable to evaluate `Object.prototype.toString()`") }

    try {
      Pseudo.prototype = GLOBAL.Function.prototype;
      if (false === (
        Pseudo.prototype !== Native.Object$prototype &&
        Pseudo instanceof Pseudo &&
        (function() {}) instanceof Pseudo &&
        false ===  ({}) instanceof Pseudo
      )) throw new PseudoError();

      Native.Function$prototype = Pseudo.prototype
    } catch (error) { throw new NativeAssertionError("Unable to evaluate `Function.prototype` as native built-in") }

    Function.prototype.toString = (function(native) {
      var toString = new Proxy(() => {}, /* --> (function() {}).bind({}) */ {
        apply         : function apply(object, that, arguments) { return toString === that.toString ? that === toString ? "function toString() { [native code] }" : native.apply(that, arguments) : that.toString.apply(that, arguments) },
        construct     : function construct(object, arguments) { return new toString(...arguments) },
        deleteProperty: function deleteProperty(object, key) { return true }
      });

      return toString
    })(Function.prototype.toString);

    Native.Function$prototype$toString = nativeof(Native.Function$prototype, "toString", Native.AS_FUNCTION | Native.AS_PROPERTY | Native.NAMED | Native.STRICT, "Function.prototype").get()["finally"](function(native) {
      var constructible = false;

      // ...
      try { new native; constructible = true } catch (error) {}
      try { ({"toString": native}).toString(); constructible = true } catch (error) {}

      if (false === constructible && delete Native.Object$prototype["toString"]) {
        if (false === constructible)
        try {
          switch ((function() { 'ඞ' }).toString()) { // WARN (Lapys) -> Function source must be non-deducible
            case "function () {\n  'ඞ';\n}": // WARN (Lapys) -> Fails in JavaScript implementations that de-compile function sources in a non-standard way
            case "function() { 'ඞ' }":       // NOTE (Lapys) -> Confirmed use of `Function.prototype.toString()`
              Native.Object$prototype.toString = Native.Object$prototype$toString$;
              return native
          }
        } catch (error) {}

        Native.Object$prototype.toString = Native.Object$prototype$toString$
      }

      return ERROR
    });

    Native.Function$prototype$apply = nativeof(Native.Function$prototype, "apply", Native.AS_FUNCTION | Native.AS_PROPERTY | Native.NAMED | Native.STRICT, "Function.prototype").get()["finally"](function(native) {
      return nativeof(native, "apply", Native.AS_FUNCTION | Native.AS_PROPERTY | Native.NAMED | Native.STRICT, "Function.prototype").get()["finally"](function(subnative) {
        if (native === subnative && false === "apply" in Native.Object$prototype && delete Native.Function$prototype["apply"]) {
          Native.Function$prototype.apply = native;
          return native
        }

        return ERROR
      })
    });

    Native.Function$prototype$bind = nativeof(Native.Function$prototype, "bind", Native.AS_FUNCTION | Native.AS_PROPERTY | Native.NAMED | Native.STRICT, "Function.prototype").get(null)["finally"](function(native) {
      if (ERROR === native) return null;
      if (Native.Function$prototype$apply !== Native.Function$prototype$apply.apply) return null;

      // WARN (Lapys) ->> Assume unchanged since property access in comparison conditional
      Native.Function$prototype$apply = Native.Function$prototype$apply.apply(native, [Native.Function$prototype$apply, [Native.Function$prototype$apply]]);
      return native
    });

    Native.String$prototype$charAt = (function() { return false === delete 'ඞ'[0] })() ? (
      (at = function at(string, index) { return string[index] }),
      (function charAt(index) {
        var string = this + "";

        // ...
        if (null === this || undefined === this) throw new TypeError("String.prototype.charAt called on incompatible null or undefined");
        if (index < string.length) { string = string[index]; return "string" !== typeof string || string.length !== 1 ? "" : string }

        return ""
      })
    ) : nativeof("", "charAt", Native.AS_FUNCTION | Native.NAMED | Native.STRICT, "String.prototype")["try"](function() {
      return "".charAt
    })["catch"](null)["finally"](function(native) {
      if (ERROR === native) return null;

      if (null !== Native.Function$prototype$bind)
        at = function at(string, index) { return Native.Function$prototype$apply(Native.String$prototype$charAt, [string + "", [index]]) };
      else {
        if (false === delete native["apply"]) throw new NativeAssertionError("Unable to evaluate `String.prototype.charAt(...)` as native built-in");
        native.apply = Native.Function$prototype$apply;
        at = function at(string, index) {
          // WARN (Lapys) ->> Assume unchanged since property access in comparison conditional
          if (Native.Function$prototype$apply === Native.Function$prototype$apply.apply)
          return Native.Function$prototype$apply.apply(Native.String$prototype$charAt, [string + "", [index]]);
        }
      }

      return native
    });

    console.log(Native);

    /* DOM > ... */
    function assert(condition) {
      if (condition === at) {
        if (null !== Native.String$prototype$charAt)
        return;

        try { '\0' === at('\0', 0) }
        catch (error) {
          if (error.message === new UnreachableStateError(null).message) throw error;
          throw new TypeError("String subscript indexing feature required for `DOM.createElement(...)` function argument")
        }
      }

      if (false == condition)
      throw new AssertionError()
    }

    DOM.createElement = function createElement(selector) {
      assert(at);

      for (var index = 0, length = selector.length; index !== length; ++index)

      CSSSelector
      DOMTree
    };

    /* Event > ... */
    Event.addListener = null === Native.EventTarget$prototype$addEventListener ? function addListener(node, type) {
    } : function addListener(node, type) {}

    // getElementByClassName : null,
    // getElementsByClassName: null,
    // getElementById        : null,
    // getElementsById       : null,
    // getElementBySelector  : null,
    // getElementsBySelector : null,
    // getElementByTagName   : null,
    // getElementsByTagName  : null

  /* ... */
  COMPLETED = true
}();
