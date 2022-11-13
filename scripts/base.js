"use strict";

/* Global > ... */
var LapysJS = new function LapysJS() {};

/* Namespace > ... */
var Event = {
  addListener: null
};

/* ... */
(function() {
  /* Constant > ... */
  var ANY    = new function() {};
  var ERROR  = new Error;
  var GLOBAL = this; // --> "undefined" !== typeof frames ? frames : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : "undefined" !== typeof global ? global : "undefined" !== typeof globalThis ? globalThis : (function() { return this })();

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
            var source = null;

            // ... --- WARN (Lapys) -> Fails in JavaScript implementations that have built-in functions with the `prototype` property
            if (Native.PROMISE.options & (Native.AS_CLASS_FUNCTION | Native.AS_FUNCTION | Native.AS_GENERATOR_FUNCTION | Native.AS_OBJECT_FUNCTION))
            if (false === delete Native.PROMISE.native["prototype"]) return Native.PROMISE.onfail(Native.PROMISE.object, Native.PROMISE.propertyKey, Native.PROMISE.options, Native.PROMISE.native);

            if (null !== Native.Function$prototype$apply && null !== Native.Function$prototype$toString) {
              if (null !== Native.Function$prototype$bind)
              source = Native.Function$prototype$apply(Native.Function$prototype$toString, [Native.PROMISE.native]);

              // WARN (Lapys) ->> Assume unchanged since property access in comparison conditional
              else if (Native.Function$prototype$apply === Native.Function$prototype$apply.apply)
              source = Native.Function$prototype$apply.apply(Native.Function$prototype$toString, [Native.PROMISE.native])
            }

            if (null !== source) {
              var nativeSources = [
                {0: '[', 1: 'C', 2: 'o', 3: 'm', 4: 'm', 5: 'a', 6: 'n', 7: 'd', 8: ' ', 9: 'L', 10: 'i', 11: 'n', 12: 'e', 13: ' ', 14: 'A', 15: 'P', 16: 'I', 17: ']', length: 18, toString: function() { return "[Command Line API]" }},
                {0: '[', 1: 'n', 2: 'a', 3: 't', 4: 'i', 5: 'v', 6: 'e', 7: ' ', 8: 'c', 9: 'o', 10: 'd', 11: 'e', 12: ']',                                              length: 13, toString: function() { return "[Native.PROMISE.native code]" }}
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
                    {0: 'c', 1: 'l', 2: 'a', 3: 's', 4: 's',                         length: 5, toString: function toString() { return "class" }},
                    {0: 'f', 1: 'u', 2: 'n', 3: 'c', 4: 't', 5: 'i', 6: 'o', 7: 'n', length: 8, toString: function toString() { return "function" }},
                    {0: 'g', 1: 'e', 2: 't',                                         length: 3, toString: function toString() { return "get" }},
                    {0: 's', 1: 'e', 2: 't',                                         length: 3, toString: function toString() { return "set" }}
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
    requestAnimationFrame                    : null,
    setInterval                              : null,
    setTimeout                               : null,
    String$prototype$charAt                  : null
  };

  /* Class > ... */
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

  function TypeError(message) {
    try { null() }
    catch (error) { (ERROR = error).message = message }

    return ERROR
  }

  /* Function > ... */
  function nativeof(object, property, options, name) {
    Native.PROMISE.object      = object;
    Native.PROMISE.objectName  = arguments.length > 3 ? name : null;
    Native.PROMISE.options     = arguments.length > 2 ? options | 0x00000 : +Native.DEFAULT;
    Native.PROMISE.propertyKey = property;

    return Native.PROMISE
  }

  /* Modification */
    /* Native > ... */
    Native.Function = nativeof(GLOBAL, "Function", Native.AS_FUNCTION | Native.INVOCABLE).get(function() {
      var native = Function; // ->> Possibly a `Proxy` or a `function` with the `Function.prototype` prototype

      // ...
      function Pseudo() {}
        Pseudo.prototype = native.prototype;

      if ((function() {}) instanceof Pseudo && (function() {}) instanceof native && false === ({}) instanceof native) {
        if (LapysJS === new native("return LapysJS")())
        return native
      }

      return ERROR
    }).valueOf();

    try { Native.Function$prototype = Native.Function.prototype }
    catch (error) { throw new NativeAssertionError("Unable to evaluate `Function.prototype` as native built-in") }

    Native.Function$prototype$toString = nativeof(Native.Function$prototype, "toString", Native.AS_FUNCTION | Native.AS_PROPERTY | Native.INVOCABLE | Native.NAMED | Native.STRICT, "Function.prototype").get(function() {
      var functionLiteral = function() { 'ඞ' }; // WARN (Lapys) -> Source must be non-deducible or private

      if ("toString" in Native.Function$prototype)
      switch (functionLiteral.toString()) { // WARN (Lapys) -> Fails in JavaScript implementations that de-compile function sources in a non-standard way
        case "function () {\n  'ඞ';\n}": // ->> Confirmed use of `Function.prototype.toString()`
        case "function() { 'ඞ' }": {
          var native = Native.Function$prototype.toString; // WARN (Lapys) -> Assume unchanged since `functionLiteral.toString()` access

          if (native === native.toString) {
            var source = native.toString(); // WARN (Lapys) -> Assume unchanged since `native.toString()` access

            if ( // WARN (Lapys) -> Unconfirmed use of `Function.prototype.toString()`
              source === "function toString() { [native code] }"       ||
              source === "function toString() {\n    [native code]\n}" ||
              source === "\nfunction toString() {\n    [native code]\n}\n"
            ) return native
          }
        }
      }

      return ERROR
    }).valueOf();

    Native.Function$prototype$apply = nativeof(Native.Function$prototype, "apply", Native.AS_FUNCTION | Native.AS_PROPERTY | Native.INVOCABLE | Native.NAMED | Native.STRICT, "Function.prototype").get(function() {
      if ("apply" in Native.Function$prototype) {
        var native = Native.Function$prototype.apply;

        if (delete native["apply"] && "apply" in native) {
          var objectLiteral   = {};
          var functionLiteral = function() { return objectLiteral };

          if (functionLiteral() === native.apply(native, [functionLiteral])) {
            Native.Function$prototype$apply = native;
            return native
          }
        }
      }

      return ERROR
    }).valueOf();

    try { Native.String$prototype$charAt = delete '\0'[0] ? undefined : null }
    catch (error) { Native.String$prototype$charAt = undefined }

    if (undefined === Native.String$prototype$charAt)
    Native.String$prototype$charAt = function charAt(index) {
      if (null === this || undefined === this)
      throw new TypeError("String.prototype.charAt called on incompatible null or undefined");

      var string = this + "";
      return index >= string.length ? "" : string[index]
    };

    Native.Function$prototype$bind = nativeof(Native.Function$prototype, "bind", Native.AS_FUNCTION | Native.AS_PROPERTY | Native.INVOCABLE | Native.NAMED | Native.STRICT, "Function.prototype").get(null)["finally"](function(native) {
      if (ERROR === native) return null;
      if (Native.Function$prototype$apply !== Native.Function$prototype$apply.apply) return null;

      // WARN (Lapys) ->> Assume unchanged since property access in comparison conditional
      Native.Function$prototype$apply = Native.Function$prototype$apply.apply(native, [Native.Function$prototype$apply, [Native.Function$prototype$apply]]);
      return native
    });

    console.log("clearInterval()",                             Native.clearInterval);
    console.log("clearTimeout()",                              Native.clearTimeout);
    console.log("document",                                    Native.document);
    console.log("EventTarget.prototype.addEventListener()",    Native.EventTarget$prototype$addEventListener);
    console.log("EventTarget.prototype.attachEvent()",         Native.EventTarget$prototype$attachEvent);
    console.log("EventTarget.prototype.detachEvent()",         Native.EventTarget$prototype$detachEvent);
    console.log("EventTarget.prototype.removeEventListener()", Native.EventTarget$prototype$removeEventListener);
    console.log("class Function",                              Native.Function);
    console.log("Function.prototype",                          Native.Function$prototype);
    console.log("Function.prototype.apply()",                  Native.Function$prototype$apply);
    console.log("Function.prototype.bind()",                   Native.Function$prototype$bind);
    console.log("Function.prototype.toString()",               Native.Function$prototype$toString);
    console.log("requestAnimationFrame()",                     Native.requestAnimationFrame);
    console.log("setInterval()",                               Native.setInterval);
    console.log("setTimeout()",                                Native.setTimeout);
    console.log("String.prototype.charAt()",                   Native.String$prototype$charAt);

    /* Event > ... */
    Event.addListener = null === Native.EventTarget$prototype$addEventListener ? function addListener(node, type) {
    } : function addListener(node, type) {}
})();
