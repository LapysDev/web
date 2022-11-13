"use strict";

/* Global > ... */
var LapysJS = new function LapysJS() {};

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
  addListener: null
};

/* ... */
(function() {
  /* Constant > ... */
  var ANY    = new function() {};
  var ERROR  = new Error;
  var GLOBAL = this; // --> "undefined" !== typeof frames ? frames : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : "undefined" !== typeof global ? global : "undefined" !== typeof globalThis ? globalThis : (function() { return this })();

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
      },

      toString: function toString() {
        var string = "";

        // ...
        for (var index = this.length; index; )
        string = this[--index] + string;

        return string
      }
    };

  function AssertionError() {
    return new Error("Assertion failed")
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

  function Error(message) {
    return new TypeError(message)
  }

  function NativeAssertionError(message) {
    return new Error(message)
  }

  function RecursionOverflowError(message) {
    try { ERROR = new RecursionOverflowError(message) }
    catch (error) { (ERROR = error).message = message }

    return ERROR
  }

  function ReferenceError(message) {
    try { Lapys } // WARN (Lapys) -> Identifier must be non-deducible or non-defined
    catch (error) { (ERROR = error).message = message }

    return ERROR
  }

  function SafeString(characters) {
    var string;

    // ...
    this.length = arguments.length;

    while (arguments.length--) // ->> Assumed `arguments.length < 256`
    this[arguments.length] = arguments[arguments.length];

    string = this.toString();
    this.toString = function toString() { return string }
  }
    SafeString.prototype = SafeArray.prototype;

  function SyntaxError(message) {
    try { new Native.Function('@') }
    catch (error) { (ERROR = error).message = message }

    return ERROR
  }

  function TypeError(message) {
    try { null() }
    catch (error) { (ERROR = error).message = message }

    return ERROR
  }

  function UnreachableStateError(debug) {
    if (null !== debug) debugger;
    return new RecursionOverflowError("Unexpected state reached")
  }

  /* Namespace > ... */
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
    INVOCABLE            : 0x080000,
    NAMED                : 0x100000,
    STRICT               : 0x200000,
    UNNAMED              : 0x400000,

    // ...
    PROMISE: {
      native     : ANY,
      object     : null,
      objectName : null,
      onerror    : function onerror(object, property, options, native) { throw new NativeAssertionError("Unable to evaluate " + ("symbol" !== typeof property ? '`' + (null !== Native.PROMISE.objectName ? Native.PROMISE.objectName + '.' : "") + property + ("function" === typeof native || (options & Native.INVOCABLE) ? "()" : "") + '`' : "feature") + " as built-in native") },
      onfail     : null,
      onpass     : null,
      options    : 0x0000,
      propertyKey: null,
      subpromise : {
        "finally": function        (handler) { return handler(Native.PROMISE.native) },
        valueOf  : function valueOf(handler) { return Native.PROMISE.native }
      },

      "catch": function(handler) {
        Native.PROMISE.native = ERROR;
        Native.PROMISE.onfail = function onfail(object, property, options, native) {
          if (null === handler) {
            Native.PROMISE.native = ERROR;
            return Native.PROMISE.subpromise
          }

          Native.PROMISE.native = handler(object, property, options, native);
          if (ERROR === Native.PROMISE.native) throw Native.PROMISE.onerror(object, property, options, Native.PROMISE.native);

          return Native.PROMISE.subpromise
        };

        try { Native.PROMISE.native = Native.PROMISE.onpass(Native.PROMISE.object, Native.PROMISE.propertyKey, Native.PROMISE.options, Native.PROMISE.native) }
        catch (error) { /* --> native = ERROR */ }

        Native.PROMISE.onpass = null;

        // ...
        if (ERROR === Native.PROMISE.native)
        return Native.PROMISE.onfail(Native.PROMISE.object, Native.PROMISE.propertyKey, Native.PROMISE.options, Native.PROMISE.native);

        if (Native.PROMISE.options & Native.STRICT) {
          if (Native.PROMISE.options & Native.AS_GETTER) {}
          if (Native.PROMISE.options & Native.AS_SETTER) {}

          if (
            ("object"   === typeof Native.PROMISE.native && (Native.PROMISE.options & (Native.AS_OBJECT_FUNCTION))) ||
            ("function" === typeof Native.PROMISE.native && (Native.PROMISE.options & (Native.AS_CLASS_FUNCTION | Native.AS_FUNCTION | Native.AS_GENERATOR_FUNCTION | Native.AS_GETTER_FUNCTION | Native.AS_OBJECT_FUNCTION | Native.AS_SETTER_FUNCTION)))
          ) {
            var assertion = true;
            var source    = null;

            // ... --- WARN (Lapys) -> Fails in JavaScript implementations that have built-in functions with the `prototype` property
            try {
              if (Native.PROMISE.options & (Native.AS_CLASS_FUNCTION | Native.AS_FUNCTION | Native.AS_GENERATOR_FUNCTION | Native.AS_OBJECT_FUNCTION))
              if (false === delete Native.PROMISE.native["prototype"]) return Native.PROMISE.onfail(Native.PROMISE.object, Native.PROMISE.propertyKey, Native.PROMISE.options, Native.PROMISE.native)
            } catch (error) { assertion = false }

            if (false === assertion)
            return Native.PROMISE.onfail(Native.PROMISE.object, Native.PROMISE.propertyKey, Native.PROMISE.options, Native.PROMISE.native);

            if (null !== Native.Function$prototype$apply && null !== Native.Function$prototype$toString) {
              if (null !== Native.Function$prototype$bind)
                source = Native.Function$prototype$apply(Native.Function$prototype$toString, [Native.PROMISE.native]);

              // WARN (Lapys) ->> Assume unchanged since property access in comparison conditional
              else if (Native.Function$prototype$apply === Native.Function$prototype$apply.apply)
                source = Native.Function$prototype$apply.apply(Native.Function$prototype$toString, [Native.PROMISE.native])
            }

            if (null !== source) {
              var nativeSources = [
                new SafeString('[', 'C', 'o', 'm', 'm', 'a', 'n', 'd', ' ', 'L', 'i', 'n', 'e', ' ', 'A', 'P', 'I', ']'),
                new SafeString('[', 'n', 'a', 't', 'i', 'v', 'e', ' ', 'c', 'o', 'd', 'e', ']')
              ], sourceMatch = false;

              // ...
              for (var nativeSourcesIndex = nativeSources.length; nativeSourcesIndex && false === sourceMatch; ) {
                var nativeSource = nativeSources[--nativeSourcesIndex];

                sourceMatch = (
                  ((Native.PROMISE.options & Native.NAMED) && (
                    source === "function "   + Native.PROMISE.propertyKey + "() { "      + nativeSource + " }"  ||
                    source === "function "   + Native.PROMISE.propertyKey + "() {\n    " + nativeSource + "\n}" ||
                    source === "\nfunction " + Native.PROMISE.propertyKey + "() {\n    " + nativeSource + "\n}\n"
                  )) ||
                  ((Native.PROMISE.options & Native.UNNAMED) && (
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
                  if (Native.PROMISE.options & (Native.NAMED | Native.UNNAMED)) {
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
                          if (Native.PROMISE.options & Native.AS_FUNCTION) { if (declarator != "class" && declarator != "function" && declarator != "get" && declarator != "set") break }
                          else if (Native.PROMISE.options & Native.AS_CLASS_FUNCTION)  { if (declarator != "class") break }
                          else if (Native.PROMISE.options & Native.AS_GETTER_FUNCTION) { if (declarator != "get")   break }
                          else if (Native.PROMISE.options & Native.AS_SETTER_FUNCTION) { if (declarator != "set")   break }
                          else if (Native.PROMISE.options & (Native.AS_GENERATOR_FUNCTION | Native.AS_OBJECT_FUNCTION)) { if (declarator != "function") break }

                          for (var sourceIndex = sourceOffset; sourceIndex !== source.length; ++sourceIndex) {
                            var character = at(source, sourceIndex);

                            // ...
                            if (commented) { commented = false === (character === '*' && at(source, sourceIndex + 1) === '/'); continue }
                            if (character === '/' && at(source, sourceIndex + 1) === '*') { commented = true; continue }

                            if (character === '*') {
                              if (generatorDeclaratorMatch || false === (Native.PROMISE.options & (Native.AS_FUNCTION | Native.AS_GENERATOR_FUNCTION))) break;
                              generatorDeclaratorMatch = true
                            }

                            if (character === '(') {
                              subsourceMatch = (Native.PROMISE.options & Native.NAMED) && (Native.PROMISE.options & Native.UNNAMED)
                                ? name[0] === Native.PROMISE.propertyKey || "" === name[0]
                                : name[0] === (Native.PROMISE.options & Native.NAMED ? Native.PROMISE.propertyKey : "");
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
                    return Native.PROMISE.onfail(Native.PROMISE.object, Native.PROMISE.propertyKey, Native.PROMISE.options, Native.PROMISE.native)
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
                  return Native.PROMISE.onfail(Native.PROMISE.object, Native.PROMISE.propertyKey, Native.PROMISE.options, Native.PROMISE.native)
                }
              }
            }
          }
        }

        if (false === (
          ((Native.PROMISE.options & Native.AS_BIGINT)             && ("bigint"    === typeof Native.PROMISE.native))                                              ||
          ((Native.PROMISE.options & Native.AS_BOOLEAN)            && ("boolean"   === typeof Native.PROMISE.native))                                              ||
          ((Native.PROMISE.options & Native.AS_CLASS_FUNCTION)     && ("function"  === typeof Native.PROMISE.native))                                              ||
          ((Native.PROMISE.options & Native.AS_FUNCTION)           && ("function"  === typeof Native.PROMISE.native))                                              ||
          ((Native.PROMISE.options & Native.AS_GENERATOR_FUNCTION) && ("function"  === typeof Native.PROMISE.native))                                              ||
          ((Native.PROMISE.options & Native.AS_GETTER_FUNCTION)    && ("function"  === typeof Native.PROMISE.native))                                              ||
          ((Native.PROMISE.options & Native.AS_NUMBER)             && ("number"    === typeof Native.PROMISE.native))                                              ||
          ((Native.PROMISE.options & Native.AS_OBJECT)             && ("object"    === typeof Native.PROMISE.native && null !== Native.PROMISE.native))            ||
          ((Native.PROMISE.options & Native.AS_OBJECT_FUNCTION)    && ("function"  === typeof Native.PROMISE.native || "object" === typeof Native.PROMISE.native)) ||
          ((Native.PROMISE.options & Native.AS_SETTER_FUNCTION)    && ("function"  === typeof Native.PROMISE.native))                                              ||
          ((Native.PROMISE.options & Native.AS_STRING)             && ("string"    === typeof Native.PROMISE.native))                                              ||
          ((Native.PROMISE.options & Native.AS_SYMBOL)             && ("symbol"    === typeof Native.PROMISE.native))                                              ||
          ((Native.PROMISE.options & Native.AS_UNDEFINED)          && ("undefined" === typeof Native.PROMISE.native))                                              ||

          ((Native.PROMISE.options & Native.AS_NULL)     && null === Native.PROMISE.native) ||
          ((Native.PROMISE.options & Native.AS_PROPERTY) && false === Native.PROMISE.propertyKey in Native.PROMISE.object)
        )) return Native.PROMISE.onfail(Native.PROMISE.object, Native.PROMISE.propertyKey, Native.PROMISE.options, Native.PROMISE.native);

        // ...
        return Native.PROMISE.subpromise
      },

      get: function get(handler) {
        if (null !== Native.PROMISE.onpass) throw new NativeAssertionError("Encountered invalid use of `nativeof(...)` assertion");
        return null === handler ? Native.PROMISE["try"](null)["catch"](null) : Native.PROMISE["try"](arguments.length ? handler : Native.PROMISE.valueOf)["catch"](Native.PROMISE.onerror)
      },

      "try": function(handler) {
        if (null !== Native.PROMISE.onpass) throw new NativeAssertionError("Encountered invalid use of `nativeof(...)` assertion");

        Native.PROMISE.onpass = null === handler ? Native.PROMISE.valueOf : handler;
        return Native.PROMISE
      },

      valueOf: function valueOf(object, property) {
        try { if (property in object) return object[property] }
        catch (error) {}

        return ERROR
      }
    },

    // ... --- UPDATE (Lapys) -> Guard `Function`, `Function.prototype.toString()` et al. from monkey-patching
    clearInterval                            : null,
    clearTimeout                             : null,
    document                                 : null,
    EventTarget$prototype$addEventListener   : null,
    EventTarget$prototype$attachEvent        : null,
    EventTarget$prototype$detachEvent        : null,
    EventTarget$prototype$removeEventListener: null,
    Function                                 : null,
    Function$prototype                       : null,
    Function$prototype$apply                 : null,
    Function$prototype$bind                  : null,
    Function$prototype$toString              : null,
    Object                                   : null,
    Object$prototype                         : null,
    requestAnimationFrame                    : null,
    setInterval                              : null,
    setTimeout                               : null,
    String$prototype$charAt                  : null
  };

  /* Function > ... */
  function at(string, index) {
    if ("string" === typeof string) {
      if (null === Native.String$prototype$charAt)
      throw new TypeError("String subscript indexing feature required for `at(...)` function");

      // ...
      if (null !== Native.Function$prototype$bind) {
        at = function at(string, index) { return Native.Function$prototype$apply(Native.String$prototype$charAt, [string + "", [index]]) };
        return at(string, index)
      }

      // WARN (Lapys) ->> Assume unchanged since property access in comparison conditional
      else if (Native.Function$prototype$apply === Native.Function$prototype$apply.apply) {
        at = function at(string, index) { return Native.Function$prototype$apply.apply(Native.String$prototype$charAt, [string + "", [index]]) };
        return at(string, index)
      }

      throw new UnreachableStateError()
    }

    return string[index]
  }

  function cssof(selector) {}

  function nativeof(object, property, options, name) {
    Native.PROMISE.object      = object;
    Native.PROMISE.objectName  = arguments.length > 3 ? name : null;
    Native.PROMISE.options     = arguments.length > 2 ? options | 0x00000 : +Native.DEFAULT;
    Native.PROMISE.propertyKey = property;

    return Native.PROMISE
  }

  /* Modification */
    /* Native > ... */
    Native.Object = nativeof(GLOBAL, "Object", Native.AS_FUNCTION | Native.INVOCABLE).get(function() {
      var native = Object; // ->> Possibly a `function` with the `Object.prototype` prototype or a `Proxy`

      // ...
      function Pseudo() {}
        Pseudo.prototype = native.prototype;

      return ({}) instanceof Pseudo && ({}) instanceof native ? native : ERROR
    }).valueOf();

    try { Native.Object$prototype = Native.Object.prototype } // ->> Confirmed `Object.prototype`
    catch (error) { throw new NativeAssertionError("Unable to evaluate `Object.prototype` as native built-in") }

    Native.Function = nativeof(GLOBAL, "Function", Native.AS_FUNCTION | Native.INVOCABLE).get(function() {
      var native = Function; // ->> Possibly a `function` with the `Function.prototype` prototype or a `Proxy`

      // ...
      function Pseudo() {}
        Pseudo.prototype = native.prototype;

      if ((function() {}) instanceof Pseudo && (function() {}) instanceof native && false === ({}) instanceof native) {
        if (LapysJS === new native("return LapysJS")()) // ERROR (Lapys) -> new property can be inspected
        return native
      }

      return ERROR
    }).valueOf();

    try { Native.Function$prototype = Native.Function.prototype } // ->> Confirmed `Function.prototype`
    catch (error) { throw new NativeAssertionError("Unable to evaluate `Function.prototype` as native built-in") }

    Native.Function$prototype$toString = nativeof(Native.Function$prototype, "toString", Native.AS_FUNCTION | Native.AS_PROPERTY | Native.INVOCABLE | Native.NAMED | Native.STRICT, "Function.prototype").get(function() {
      if ("toString" in Native.Function$prototype) {
        var native   = Native.Function$prototype.toString;
        var toString = Native.Object$prototype.toString;

        if (delete Native.Function$prototype["toString"]) {
            if (false === delete Native.Object$prototype["toString"]) {
              Native.Function$prototype.toString = native;
              return ERROR
            }

            else if ("toString" in native) {
              Native.Function$prototype.toString = native;
              Native.Object$prototype.toString   = toString;

              return ERROR
            }

            // ...
            try {
              new native;

              Native.Function$prototype.toString = native;
              Native.Object$prototype.toString   = toString;

              return ERROR
            } catch (error) {
              Native.Function$prototype.toString = native;

              try {
                // WARN (Lapys) -> Function source must be non-deducible
                switch ((function() { 'ඞ' }).toString()) {
                  case "function () {\n  'ඞ';\n}":  // WARN (Lapys) -> Fails in JavaScript implementations that de-compile function sources in a non-standard way
                  case "function() { 'ඞ' }": break; // NOTE (Lapys) -> Confirmed use of `Function.prototype.toString()`

                  default: native = ERROR
                }

                switch (ERROR === native ? null : native.toString()) {
                  case "\nfunction toString() {\n    [native code]\n}\n":
                  case "function toString() {\n    [native code]\n}":
                  case "function toString() { [native code] }": break;

                  default: native = ERROR
                }
              } catch (error) { native = ERROR }

              Native.Object$prototype.toString = toString
            }

            // ...
            return native
          }
      }

      return ERROR
    }).valueOf();

    Native.Function$prototype$apply = nativeof(Native.Function$prototype, "apply", Native.AS_FUNCTION | Native.AS_PROPERTY | Native.INVOCABLE | Native.NAMED | Native.STRICT, "Function.prototype").get(function() {
      // var functionLiteral = function() { return objectLiteral };
      // var objectLiteral   = {};

      // if ("apply" in Native.Function$prototype)
      // switch (functionLiteral() === functionLiteral.apply())
      // if ("apply" in Native.Function$prototype) {
      //   var native = Native.Function$prototype.apply;

      //   if (delete native["apply"] && "apply" in native) {
      //     var objectLiteral   = {};
      //     var functionLiteral = function() { return objectLiteral };

      //     if (functionLiteral() === native.apply(native, [functionLiteral])) // ->> Confirmed use of `Function.prototype.apply(...)`
      //     if (native === native.apply) {
      //       Native.Function$prototype$apply = native;
      //       native.apply                    = native;

      //       return native
      //     }
      //   }
      // }

      return ERROR
    }).valueOf();

    Native.Function$prototype$bind = nativeof(Native.Function$prototype, "bind", Native.AS_FUNCTION | Native.AS_PROPERTY | Native.INVOCABLE | Native.NAMED | Native.STRICT, "Function.prototype").get(null)["finally"](function(native) {
      if (ERROR === native) return null;
      if (Native.Function$prototype$apply !== Native.Function$prototype$apply.apply) return null;

      // WARN (Lapys) ->> Assume unchanged since property access in comparison conditional
      Native.Function$prototype$apply = Native.Function$prototype$apply.apply(native, [Native.Function$prototype$apply, [Native.Function$prototype$apply]]);
      return native
    });

    Native.String$prototype$charAt = (function() { for (var index in '\0') { if (index == '0') return true } return false })() ? (
      (at = function at(string, index) { return string[index] }),
      (function charAt(index) {
        var string = this + "";

        // ...
        if (null === this || undefined === this) throw new TypeError("String.prototype.charAt called on incompatible null or undefined");
        if (index < string.length) { string = string[index]; return "string" !== typeof string || string.length !== 1 ? "" : string }

        return ""
      })
    ) : nativeof("", "charAt", Native.AS_FUNCTION | Native.INVOCABLE | Native.NAMED | Native.STRICT, "String.prototype")["try"](function() {
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

    // console.log("clearInterval()",                             Native.clearInterval);
    // console.log("clearTimeout()",                              Native.clearTimeout);
    // console.log("document",                                    Native.document);
    // console.log("EventTarget.prototype.addEventListener()",    Native.EventTarget$prototype$addEventListener);
    // console.log("EventTarget.prototype.attachEvent()",         Native.EventTarget$prototype$attachEvent);
    // console.log("EventTarget.prototype.detachEvent()",         Native.EventTarget$prototype$detachEvent);
    // console.log("EventTarget.prototype.removeEventListener()", Native.EventTarget$prototype$removeEventListener);
    // console.log("class Function",                              Native.Function);
    // console.log("Function.prototype",                          Native.Function$prototype);
    // console.log("Function.prototype.apply()",                  Native.Function$prototype$apply);
    // console.log("Function.prototype.bind()",                   Native.Function$prototype$bind);
    // console.log("Function.prototype.toString()",               Native.Function$prototype$toString);
    // console.log("requestAnimationFrame()",                     Native.requestAnimationFrame);
    // console.log("setInterval()",                               Native.setInterval);
    // console.log("setTimeout()",                                Native.setTimeout);
    // console.log("String.prototype.charAt()",                   Native.String$prototype$charAt);

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
})();
