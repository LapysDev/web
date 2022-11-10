"use strict";

/* Namespace > ... */
var Event = {
  addListener: null
};

/* ... */
void function() {
  /* Constant > ... */
  var ANY    = new function() {};
  var ERROR  = (function TypeError() { try { null() } catch (error) { return error } })();
  var GLOBAL = "undefined" === typeof frames ? ("undefined" === typeof self ? ("undefined" === typeof window ? ("undefined" === typeof global ? ("undefined" === typeof globalThis ? (function() { return this })() : globalThis) : global) : window) : self) : frames;

  /* Namespace */
  var Error = {
    NATIVE_ASSERTION_ERROR   : new NativeAssertionError("Encountered invalid use of `nativeof(...)` assertion"),
    NATIVE_EVALUATION_ERROR  : new NativeAssertionError("Unable to evaluate feature as native built-in"),
    PARAMETER_FLAG_TYPE_ERROR: new ParameterTypeError("Parameter flag can not be used as bitwise mask")
  };

  var Native = {
    AS_BIGINT            : 0x00001,
    AS_BOOLEAN           : 0x00002,
    AS_CLASS_FUNCTION    : 0x00004,
    AS_FUNCTION          : 0x00008,
    AS_GENERATOR_FUNCTION: 0x00010,
    AS_GETTER_FUNCTION   : 0x00020,
    AS_NULL              : 0x00040,
    AS_NUMBER            : 0x00080,
    AS_OBJECT            : 0x00100,
    AS_OBJECT_FUNCTION   : 0x00200,
    AS_PROPERTY          : 0x00400,
    AS_SETTER_FUNCTION   : 0x00800,
    AS_STRING            : 0x01000,
    AS_SYMBOL            : 0x02000,
    AS_UNDEFINED         : 0x04000,
    DEFAULT              : {valueOf: function valueOf() { return Native.AS_BIGINT | Native.AS_BOOLEAN | Native.AS_NUMBER | Native.AS_NULL | Native.AS_OBJECT_FUNCTION | Native.AS_PROPERTY | Native.AS_OBJECT | Native.AS_STRING | Native.AS_SYMBOL | Native.NAMED | Native.STRICT | Native.UNNAMED }},
    NAMED                : 0x08000,
    NOASSERT             : {valueOf: function valueOf() { throw Error.PARAMETER_FLAG_TYPE_ERROR }},
    STRICT               : 0x10000,
    UNNAMED              : 0x20000,

    // ...
    PROMISE: {
      object            : null,
      objectName        : null,
      onerror           : function onerror(object, identifier, options, native) { throw new NativeAssertionError("Unable to evaluate " + ("symbol" !== typeof identifier ? '`' + (null !== Native.PROMISE.objectName ? Native.PROMISE.objectName + '.' : "") + identifier + ("function" === typeof native ? "()" : "") + '`' : "feature") + " as built-in native") },
      onpass            : null,
      options           : 0x0000,
      propertyIdentifier: null,

      "catch": function(handler) {
        var native;
        var onfail = function(object, identifier, options, native) {
          if (null === handler) return ERROR;
          native = handler(object, identifier, options, native);

          if (ERROR === native) throw Native.PROMISE.onerror(object, identifier, options, native);
          return native
        };
        var onpass  = Native.PROMISE.onpass;
        var options = Native.PROMISE.options;

        // ...
        Native.PROMISE.onpass = null;

        if (Native.NOASSERT === options) return;
        native = onpass(Native.PROMISE.object, Native.PROMISE.propertyIdentifier, options, ERROR);

        if ((options & Native.STRICT) && (
          ("object"   === typeof native && (options & (Native.AS_OBJECT_FUNCTION))) ||
          ("function" === typeof native && (options & (Native.AS_CLASS_FUNCTION | Native.AS_FUNCTION | Native.AS_GENERATOR_FUNCTION | Native.AS_GETTER_FUNCTION | Native.AS_OBJECT_FUNCTION | Native.AS_SETTER_FUNCTION)))
        )) if (null !== Native.Function$prototype$apply && null !== Native.Function$prototype$toString) {
          var source = null;

          // ...
          if      (null                            !== Native.Function$prototype$bind)        source = Native.Function$prototype$apply      (Native.Function$prototype$toString, [native]);
          else if (Native.Function$prototype$apply === Native.Function$prototype$apply.apply) source = Native.Function$prototype$apply.apply(Native.Function$prototype$toString, [native]);

          if (null !== source) {
            var at = undefined === ""[0] && '\0' === '\0'[0] ? function at(string, index) { return string[index] } : null; // WARN (Lapys) -> Assume subscript indexing works natively

            // ...
            if (null !== Native.String$prototype$charAt) {
              if      (null                            !== Native.Function$prototype$bind)        at = function at(string, index) { return Native.Function$prototype$apply      (Native.String$prototype$charAt, [string, [index]]) };
              else if (Native.Function$prototype$apply === Native.Function$prototype$apply.apply) at = function at(string, index) { return Native.Function$prototype$apply.apply(Native.String$prototype$charAt, [string, [index]]) }
            }

            if (null !== at) {
              var declarators = [
                {0: 'c', 1: 'l', 2: 'a', 3: 's', 4: 's',                         length: 5, toString: function toString() { return "class" }},
                {0: 'f', 1: 'u', 2: 'n', 3: 'c', 4: 't', 5: 'i', 6: 'o', 7: 'n', length: 8, toString: function toString() { return "function" }},
                {0: 'g', 1: 'e', 2: 't',                                         length: 3, toString: function toString() { return "get" }},
                {0: 's', 1: 'e', 2: 't',                                         length: 3, toString: function toString() { return "set" }}
              ];
              var delimiters = ""; // ->> Array of delimiter IDs
              var nativeSources = [
                ['[', 'C', 'o', 'm', 'm', 'a', 'n', 'd', ' ', 'L', 'i', 'n', 'e', ' ', 'A', 'P', 'I', ']'],
                ['[', 'n', 'a', 't', 'i', 'v', 'e', ' ', 'c', 'o', 'd', 'e', ']']
              ];
              var sourceMatch = false;

              // ...
              if ((options & Native.NAMED) !== (options & Native.UNNAMED)) {
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
                      function isWhitespace(character) {
                        return (
                          character === ' ' ||
                          character === '\f' || character === '\n' || character === '\r' || character === '\t' ||
                          character === '\u00A0' || character === '\u1680' || character === '\u2000' || character === '\u2001' || character === '\u2002' || character === '\u2003' || character === '\u2004' || character === '\u2005' || character === '\u2006' || character === '\u2007' || character === '\u2008' || character === '\u2009' || character === '\u200A' || character === '\u202F' || character === '\u205F' || character === '\u3000' ||
                          character === '\v'
                        )
                      }

                      // ...
                      if (options & Native.AS_FUNCTION) { if (declarator != "class" && declarator != "function" && declarator != "get" && declarator != "set") break }
                      else if (options & Native.AS_CLASS_FUNCTION)  { if (declarator != "class") break }
                      else if (options & Native.AS_GETTER_FUNCTION) { if (declarator != "get")   break }
                      else if (options & Native.AS_SETTER_FUNCTION) { if (declarator != "set")   break }
                      else if (options & (Native.AS_GENERATOR_FUNCTION | Native.AS_OBJECT_FUNCTION)) { if (declarator != "function") break }

                      for (var sourceIndex = sourceOffset; sourceIndex !== source.length; ++sourceIndex) {
                        var character = at(source, sourceIndex);

                        // ...
                        if (commented) { commented = false === (character === '*' && at(source, sourceIndex + 1) === '/'); continue }
                        if (character === '/' && at(source, sourceIndex + 1) === '*') { commented = true; continue }

                        if (character === '*') {
                          if (generatorDeclaratorMatch || false === (options & (Native.AS_FUNCTION | Native.AS_GENERATOR_FUNCTION))) break;
                          generatorDeclaratorMatch = true
                        }

                        if (character === '(') {
                          subsourceMatch = name[0] === (options & Native.NAMED ? Native.PROMISE.propertyIdentifier : "");
                          break parse_head
                        }

                        if (isWhitespace(character)) name[1] += "" === name[0] ? "" : character;
                        else { name[0] += name[1] + character; name[1] = "" }
                      }

                      break
                    }

                    if (sourceOffset === source.length)
                    break
                  }
                }

                if (false === subsourceMatch)
                return onfail(Native.PROMISE.object, Native.PROMISE.propertyIdentifier, options, native)
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
              return onfail(Native.PROMISE.object, Native.PROMISE.propertyIdentifier, options, native)
            }
          }
        }

        // ...
        return ERROR !== native && (
          ((options & Native.AS_BIGINT)             && ("bigint"    === typeof native))                               ||
          ((options & Native.AS_BOOLEAN)            && ("boolean"   === typeof native))                               ||
          ((options & Native.AS_CLASS_FUNCTION)     && ("function"  === typeof native))                               ||
          ((options & Native.AS_FUNCTION)           && ("function"  === typeof native))                               ||
          ((options & Native.AS_GENERATOR_FUNCTION) && ("function"  === typeof native))                               ||
          ((options & Native.AS_GETTER_FUNCTION)    && ("function"  === typeof native))                               ||
          ((options & Native.AS_NUMBER)             && ("number"    === typeof native))                               ||
          ((options & Native.AS_OBJECT)             && ("object"    === typeof native && null !== native))            ||
          ((options & Native.AS_OBJECT_FUNCTION)    && ("function"  === typeof native || "object" === typeof native)) ||
          ((options & Native.AS_SETTER_FUNCTION)    && ("function"  === typeof native))                               ||
          ((options & Native.AS_STRING)             && ("string"    === typeof native))                               ||
          ((options & Native.AS_SYMBOL)             && ("symbol"    === typeof native))                               ||
          ((options & Native.AS_UNDEFINED)          && ("undefined" === typeof native))                               ||

          ((options & Native.AS_NULL)     && null === native) ||
          ((options & Native.AS_PROPERTY) && false === Native.PROMISE.propertyIdentifier in Native.PROMISE.object)
        ) ? native : onfail(Native.PROMISE.object, Native.PROMISE.propertyIdentifier, options, native)
      },

      get: function get(handler) {
        if (null !== Native.PROMISE.onpass) throw Error.NATIVE_ASSERTION_ERROR;
        return null === handler ? Native.PROMISE["try"](null)["catch"](null) : Native.PROMISE["try"](arguments.length ? handler : Native.PROMISE.valueOf)["catch"](Native.PROMISE.onerror)
      },

      "try": function(handler) {
        if (null !== Native.PROMISE.onpass) throw Error.NATIVE_ASSERTION_ERROR;

        Native.PROMISE.onpass = null === handler ? Native.PROMISE.valueOf : handler;
        return Native.PROMISE
      },

      valueOf: function valueOf(object, identifier) {
        return identifier in object ? object[identifier] : ERROR
      }
    },

    // ...
    clearInterval                            : null,
    clearTimeout                             : null,
    EventTarget$prototype$addEventListener   : null,
    EventTarget$prototype$attachEvent        : null,
    EventTarget$prototype$detachEvent        : null,
    EventTarget$prototype$removeEventListener: null,
    Function$prototype$apply                 : null,
    Function$prototype$bind                  : null,
    Function$prototype$toString              : null,
    setInterval                              : null,
    setTimeout                               : null,
    String                                   : null,
    String$prototype$charAt                  : null,
    Window$document                          : null,
    Window$requestAnimationFrame             : null
  };

  /* Class > ... */
  function NativeAssertionError(message) {
    ERROR.message = message;
    return ERROR
  }

  function ParameterTypeError(message) {
    try { null() } // --> TypeError
    catch (error) { error.message = message; return error }

    ERROR.message = message;
    return ERROR
  }

  /* Function > ... */
  function call() {}

  function nativeof(object, identifier, options, name) {
    Native.PROMISE.object             = object;
    Native.PROMISE.objectName         = arguments.length > 3 ? name : null;
    Native.PROMISE.options            = arguments.length > 2 ? options | 0x00000 : +Native.DEFAULT;
    Native.PROMISE.propertyIdentifier = identifier;

    return Native.PROMISE
  }

  /* Modification */
    /* Native > ... */
    Native.String = nativeof(GLOBAL, "sus", Native.DEFAULT).get(null);

    Native.String$prototype$charAt = nativeof(GLOBAL, "sus", Native.DEFAULT)["try"](null)["catch"](function(object, identifier, options, native) {
      if (undefined !== ""[0] || '\0' !== '\0'[0]) return ERROR;
      return function charAt(index) { return index < this.length ? this[index] : "" }
    });

    console.log(Native.String);
    console.log(Native.String$prototype$charAt);

    Native.EventTarget$prototype$addEventListener = nativeof(GLOBAL, "addEventListener", Native.DEFAULT, "EventTarget.prototype").get(null);
    Native.EventTarget$prototype$attachEvent      = nativeof(GLOBAL, "attachEvent",      Native.DEFAULT, "EventTarget.prototype").get(null);
    // Native.EventTarget$prototype$detachEvent         = "function" === typeof GLOBAL.detachEvent         ? GLOBAL.detachEvent         : null;
    // Native.EventTarget$prototype$removeEventListener = "function" === typeof GLOBAL.removeEventListener ? GLOBAL.removeEventListener : null;
    // Native.Function$prototype$apply                  = (function(native) { return "function" === typeof native ? native : null })((function() {}).apply);
    // Native.Window$requestAnimationFrame              = "function" === typeof GLOBAL.requestAnimationFrame ? GLOBAL.requestAnimationFrame : null;

    if (null === Native.EventTarget$prototype$addEventListener && null === Native.EventTarget$prototype$attachEvent)
    new NativeAssertionError("Required `EventTarget.prototype.addEventListener(...)` or `EventTarget.prototype.attachEvent(...)` feature as native built-in");

    /* Event > ... */
    // Event.addListener = null === Native.EventTarget$prototype$addEventListener ? function addListener(node, type) {
    //   Native.EventTarget$prototype$attachEvent, [node, ["on" + type]]
    // } : function addListener(node, type) {}
}();
