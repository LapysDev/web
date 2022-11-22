/* Global > Lapys
  --- NOTE ---
    #Lapys:
      • Code standard built for all JavaScript versions
      • Native features are validated, or internally shimmed otherwise

  --- RULES ---
    #Lapys:
      • Code indirection should be minimal (due to prototype-chain lookup)
      • Function arity is a maximum of 255
      • Prefer declared function arguments over the exotic `arguments` object

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
var Lapys = (function() {
  var description = "General-purpose standard library for JavaScript";
  var version     = "0.0.1";

  // ...
  return new function(prototype) {
    function Lapys() {}

    Lapys.prototype = prototype;
    Lapys           = new Lapys;
    Lapys.__proto__ = null;

    delete prototype["constructor"];
    delete prototype["__proto__"];

    return Lapys
  }({
    "__proto__": null,
    toString   : function toString() { /* [private code] */ return "Lapys v" + version + "]: " + description }
  })
})();

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

/* ... */
void function() {
  /* Constant > ... */
  var COMPLETED = false;
  var ERROR     = new PseudoError; // WARN (Lapys) -> Subject to change when exception raised
  var GLOBAL    = this;            // CODE (Lapys) -> "undefined" !== typeof frames ? frames : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : "undefined" !== typeof global ? global : "undefined" !== typeof globalThis ? globalThis : (function() { return this })();
  var VOID      = new function VOID() {};

  var RECURSION_OVERFLOW_ERROR = null;
  var REFERENCE_ERROR          = null;
  var TYPE_ERROR               = null;

  /* Class */
    /* Static Array ->> Array alternative before evaluating `Array.prototype.push(…)` */
    function StaticArray(elements) {
      this.length = arguments.length;

      while (arguments.length--) // ->> Assumed `arguments.length < 256`
      this[arguments.length] = arguments[arguments.length]
    }
      StaticArray.prototype = {
        0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null, 9: null, 10: null, 11: null, 12: null, 13: null, 14: null, 15: null, 16: null, 17: null, 18: null, 19: null, 20: null, 21: null, 22: null, 23: null, 24: null, 25: null, 26: null, 27: null, 28: null, 29: null, 30: null, 31: null, 32: null, 33: null, 34: null, 35: null, 36: null, 37: null, 38: null, 39: null, 40: null, 41: null, 42: null, 43: null, 44: null, 45: null, 46: null, 47: null, 48: null, 49: null, 50: null, 51: null, 52: null, 53: null, 54: null, 55: null, 56: null, 57: null, 58: null, 59: null, 60: null, 61: null, 62: null, 63: null, 64: null, 65: null, 66: null, 67: null, 68: null, 69: null, 70: null, 71: null, 72: null, 73: null, 74: null, 75: null, 76: null, 77: null, 78: null, 79: null, 80: null, 81: null, 82: null, 83: null, 84: null, 85: null, 86: null, 87: null, 88: null, 89: null, 90: null, 91: null, 92: null, 93: null, 94: null, 95: null, 96: null, 97: null, 98: null, 99: null, 100: null, 101: null, 102: null, 103: null, 104: null, 105: null, 106: null, 107: null, 108: null, 109: null, 110: null, 111: null, 112: null, 113: null, 114: null, 115: null, 116: null, 117: null, 118: null, 119: null, 120: null, 121: null, 122: null, 123: null, 124: null, 125: null, 126: null, 127: null, 128: null, 129: null, 130: null, 131: null, 132: null, 133: null, 134: null, 135: null, 136: null, 137: null, 138: null, 139: null, 140: null, 141: null, 142: null, 143: null, 144: null, 145: null, 146: null, 147: null, 148: null, 149: null, 150: null, 151: null, 152: null, 153: null, 154: null, 155: null, 156: null, 157: null, 158: null, 159: null, 160: null, 161: null, 162: null, 163: null, 164: null, 165: null, 166: null, 167: null, 168: null, 169: null, 170: null, 171: null, 172: null, 173: null, 174: null, 175: null, 176: null, 177: null, 178: null, 179: null, 180: null, 181: null, 182: null, 183: null, 184: null, 185: null, 186: null, 187: null, 188: null, 189: null, 190: null, 191: null, 192: null, 193: null, 194: null, 195: null, 196: null, 197: null, 198: null, 199: null, 200: null, 201: null, 202: null, 203: null, 204: null, 205: null, 206: null, 207: null, 208: null, 209: null, 210: null, 211: null, 212: null, 213: null, 214: null, 215: null, 216: null, 217: null, 218: null, 219: null, 220: null, 221: null, 222: null, 223: null, 224: null, 225: null, 226: null, 227: null, 228: null, 229: null, 230: null, 231: null, 232: null, 233: null, 234: null, 235: null, 236: null, 237: null, 238: null, 239: null, 240: null, 241: null, 242: null, 243: null, 244: null, 245: null, 246: null, 247: null, 248: null, 249: null, 250: null, 251: null, 252: null, 253: null, 254: null, 255: null,
        length: 0,

        assign: function assign(index, value) {
          if (index < this.length)
          this[index] = value;

          return value
        },

        at: function at(index) {
          return index > this.length ? VOID : this[index]
        },

        includes: function includes(element) {
          for (var index = this.length; index; )
          if (element === this[--index]) return true;

          return false
        },

        pop: function pop() {
          return 0 === this.length ? VOID : this[--this.length]
        },

        push: function push(elements) {
          if (Constant.MAXIMUM_STATIC_ARRAY_LENGTH < arguments.length + this.length)
          return this.length;

          // ...
          for (var index = arguments.length; index--; )
          this[index + this.length] = arguments[index];

          return (this.length += arguments.length)
        },

        splice: function splice(index, elements) /* ->> Expects `index <= this.length` */ {
          if (Constant.MAXIMUM_STATIC_ARRAY_LENGTH >= arguments.length + this.length) {
            arguments.length -= 1;

            for (var end = arguments.length + this.length, start = this.length; index !== start--; )
            this[--end] = this[start];

            index       += arguments.length;
            this.length += arguments.length;

            while (arguments.length)
            this[--index] = arguments[arguments.length--]
          }

          return this
        }
      };

    /* Assertion Error */
    function AssertionError(message, name) {
      return new Error("Assertion failed" + (arguments.length > 0 ? ": " + message : ""), arguments.length > 1 ? name : "AssertionError")
    }

    /* CSS Selector */
    function CSSSelector(source) {
      this.attributes = new StaticArray;
      this.classList  = new StaticArray
    }
      CSSSelector.prototype = {
        attributes: new StaticArray,
        classList : new StaticArray,
        id        : null,
        tagName   : null
      };

    /* Depth Array ->> Alternative to `StaticArray` for variable length beyond `Constant.MAXIMUM_STATIC_ARRAY_LENGTH` */
    window.DepthArray = DepthArray;
    setTimeout(function() { Constant.MAXIMUM_DEPTH_ARRAY_LENGTH = 3 });

    function DepthArray(elements) {
      for (var length = arguments.length, index = 0; index !== length; ++index)
      this.push(arguments[index]) // ->> Assumed `Constant.MAXIMUM_DEPTH_ARRAY_LENGTH > 1`
    }
      DepthArray.prototype = {
        0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null, 9: null, 10: null, 11: null, 12: null, 13: null, 14: null, 15: null, 16: null, 17: null, 18: null, 19: null, 20: null, 21: null, 22: null, 23: null, 24: null, 25: null, 26: null, 27: null, 28: null, 29: null, 30: null, 31: null, 32: null, 33: null, 34: null, 35: null, 36: null, 37: null, 38: null, 39: null, 40: null, 41: null, 42: null, 43: null, 44: null, 45: null, 46: null, 47: null, 48: null, 49: null, 50: null, 51: null, 52: null, 53: null, 54: null, 55: null, 56: null, 57: null, 58: null, 59: null, 60: null, 61: null, 62: null, 63: null, 64: null, 65: null, 66: null, 67: null, 68: null, 69: null, 70: null, 71: null, 72: null, 73: null, 74: null, 75: null, 76: null, 77: null, 78: null, 79: null, 80: null, 81: null, 82: null, 83: null, 84: null, 85: null, 86: null, 87: null, 88: null, 89: null, 90: null, 91: null, 92: null, 93: null, 94: null, 95: null, 96: null, 97: null, 98: null, 99: null, 100: null, 101: null, 102: null, 103: null, 104: null, 105: null, 106: null, 107: null, 108: null, 109: null, 110: null, 111: null, 112: null, 113: null, 114: null, 115: null, 116: null, 117: null, 118: null, 119: null, 120: null, 121: null, 122: null, 123: null, 124: null, 125: null, 126: null, 127: null, 128: null, 129: null, 130: null, 131: null, 132: null, 133: null, 134: null, 135: null, 136: null, 137: null, 138: null, 139: null, 140: null, 141: null, 142: null, 143: null, 144: null, 145: null, 146: null, 147: null, 148: null, 149: null, 150: null, 151: null, 152: null, 153: null, 154: null, 155: null, 156: null, 157: null, 158: null, 159: null, 160: null, 161: null, 162: null, 163: null, 164: null, 165: null, 166: null, 167: null, 168: null, 169: null, 170: null, 171: null, 172: null, 173: null, 174: null, 175: null, 176: null, 177: null, 178: null, 179: null, 180: null, 181: null, 182: null, 183: null, 184: null, 185: null, 186: null, 187: null, 188: null, 189: null, 190: null, 191: null, 192: null, 193: null, 194: null, 195: null, 196: null, 197: null, 198: null, 199: null, 200: null, 201: null, 202: null, 203: null, 204: null, 205: null, 206: null, 207: null, 208: null, 209: null, 210: null, 211: null, 212: null, 213: null, 214: null, 215: null, 216: null, 217: null, 218: null, 219: null, 220: null, 221: null, 222: null, 223: null, 224: null, 225: null, 226: null, 227: null, 228: null, 229: null, 230: null, 231: null, 232: null, 233: null, 234: null, 235: null, 236: null, 237: null, 238: null, 239: null, 240: null, 241: null, 242: null, 243: null, 244: null, 245: null, 246: null, 247: null, 248: null, 249: null, 250: null, 251: null, 252: null, 253: null, 254: null, 255: null,
        depth : 0,
        length: 0,
        parent: null,

        assign: function assign() {},

        at: function at(index) {
          if (index > this.length) return VOID;

          var array    = this;
          var capacity = Constant.MAXIMUM_DEPTH_ARRAY_LENGTH;

          // ...
          while (capacity < this.length)
          capacity *= Constant.MAXIMUM_DEPTH_ARRAY_LENGTH;

          while (array.depth) {
            capacity /= Constant.MAXIMUM_DEPTH_ARRAY_LENGTH;
            array     = array[Mathematics.trunc(index / capacity)];
            index    -= capacity * Mathematics.trunc(index / capacity)
          }

          return array[index]
        },

        includes: function includes() {},

        pop: function pop() {
          if (0 === this.length) return VOID;
          if (Constant.MAXIMUM_DEPTH_ARRAY_LENGTH > this.length) return this[--this.length];

          /* ... */
          var array    = this;
          var capacity = Constant.MAXIMUM_DEPTH_ARRAY_LENGTH;
          var element  = VOID;

          // ...
          while (capacity < this.length)
          capacity *= Constant.MAXIMUM_DEPTH_ARRAY_LENGTH;

          if (this.length - (capacity / Constant.MAXIMUM_DEPTH_ARRAY_LENGTH) === 1) {
            element      = this[1];
            this.depth  -= 1;
            this.length -= 1;

            for (var depth = element.depth; depth--; ) element = element[0];
            for (var index = Constant.MAXIMUM_DEPTH_ARRAY_LENGTH; index--; ) this[index] = this[0][index];

            return element[0]
          }

          for (var depth = this.depth; depth--; ) {
            var lastIndex = array.length === capacity ? Constant.MAXIMUM_DEPTH_ARRAY_LENGTH - 1 : -1;

            // ...
            capacity /= Constant.MAXIMUM_DEPTH_ARRAY_LENGTH;
            lastIndex = lastIndex === -1 ? Mathematics.trunc(array.length / capacity) : lastIndex;

            array = array[lastIndex]
          }

          element                 = array[array.length - 1]
          array[array.length - 1] = VOID;

          while (null !== array) {
            --array.length;
            array = array.parent
          }

          return element
        },

        push: function push(elements) {
          for (var length = arguments.length, index = 0; index !== length; ++index, ++this.length) {
            var array    = this;
            var capacity = Constant.MAXIMUM_DEPTH_ARRAY_LENGTH;

            // ...
            for (var depth = this.depth; depth--; )
            capacity *= Constant.MAXIMUM_DEPTH_ARRAY_LENGTH;

            for (var depth = this.depth; depth--; ) {
              var lastIndex = array.length === capacity ? Constant.MAXIMUM_DEPTH_ARRAY_LENGTH - 1 : -1;

              // ...
              capacity /= Constant.MAXIMUM_DEPTH_ARRAY_LENGTH;
              lastIndex = lastIndex === -1 ? Mathematics.trunc(array.length / capacity) : lastIndex;

              if (Constant.MAXIMUM_DEPTH_ARRAY_LENGTH !== lastIndex + 1)
              array[lastIndex + 1] = VOID;

              if (VOID === array[lastIndex]) {
                var subarray = new DepthArray;

                subarray[0]      = VOID;
                subarray.depth   = depth;
                subarray.parent  = array;
                array[lastIndex] = subarray
              }

              array = array[lastIndex]
            }

            if (Constant.MAXIMUM_DEPTH_ARRAY_LENGTH === array.length) {
              var full     = false;
              var subarray = new DepthArray;

              // ...
              capacity = Constant.MAXIMUM_DEPTH_ARRAY_LENGTH;

              while (capacity === array.length) {
                if (this === array) { full = true; break }
                array     = array.parent;
                capacity *= Constant.MAXIMUM_DEPTH_ARRAY_LENGTH
              }

              if (full) {
                array           = new DepthArray;
                array.depth     = subarray.depth  = this.depth;
                array.parent    = subarray.parent = this;
                subarray.length = this.length;

                for (var subindex = Constant.MAXIMUM_DEPTH_ARRAY_LENGTH; subindex--; )
                subarray[subindex] = this[subindex];

                this[0] = subarray;
                this[1] = array;
                ++this.depth;

                for (var depth = this.depth; --depth; ) {
                  subarray        = new DepthArray;
                  subarray.depth  = array.depth - 1;
                  subarray.parent = array;

                  array[0] = subarray;
                  array    = subarray
                }
              }
            }

            if (Constant.MAXIMUM_DEPTH_ARRAY_LENGTH !== array.length + 1) array[array.length + 1] = VOID;
            for (array[array.length] = arguments[index]; this !== array; array = array.parent) ++array.length
          }

          return this.length
        },

        splice: function splice(index, elements) {
          /* TODO (Lapys) */
        }
      };

    /* DOM Tree */
    function DOMTree() {}
      DOMTree.prototype = StaticArray.prototype;

    function Error(message, name) {
      return new TypeError(message, arguments.length > 1 ? name : "Error")
    }

    function Fraction(whole, numerator, denominator) {
      this.denominator = denominator;
      this.numerator   = numerator;
      this.whole       = whole
    }
      Fraction.prototype = {
        denominator: 0,
        numerator  : 0,
        whole      : 0,

        toImproper: function toImproper() {
          if (0 !== this.whole) {
            this.numerator += this.denominator * this.whole;
            this.whole      = 0
          }

          return this
        },

        toMixed: function toMixed() {
          if (0 === this.whole) {
            var fraction = Functions.numberToFraction(this.numerator / this.denominator);

            this.denominator = fraction.denominator;
            this.numerator   = fraction.numerator;
            this.whole       = fraction.whole
          }

          return this
        }
      };

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

    function StaticString(characters) {
      var string = this.toString();

      // ...
      this.length = arguments.length;

      while (arguments.length--) // ->> Assumed `arguments.length < 256`
      this[arguments.length] = arguments[arguments.length];

      this.toString = function toString() { return string }
    }
      StaticString.prototype = {
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

  /* Namespace */
    /* Constant */
    var Constant = {
      DEPTH_ARRAY_MAXIMUM         : VOID,
      MAXIMUM_BITWISE_INTEGER     : VOID,
      MAXIMUM_DEPTH_ARRAY_LENGTH  : VOID,
      MAXIMUM_NUMBER              : VOID,
      MAXIMUM_SAFE_INTEGER        : VOID,
      MAXIMUM_STATIC_ARRAY_LENGTH : VOID,
      MAXIMUM_STATIC_STRING_LENGTH: VOID,
      NATIVE_FUNCTION_SOURCE      : VOID
    };

    /* Enumerations ->> Configuration constants */
    var Enumeration = {
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
      NAMED_FUNCTION       : 0x080000,
      STRICT               : 0x100000,
      UNNAMED_FUNCTION     : 0x200000,

      // ... ->> Computable enumerators
      DEFAULT: {
        valueOf: function valueOf() { return Enumeration.AS_BIGINT | Enumeration.AS_BOOLEAN | Enumeration.AS_NUMBER | Enumeration.AS_NULL | Enumeration.AS_OBJECT_FUNCTION | Enumeration.AS_PROPERTY | Enumeration.AS_OBJECT | Enumeration.AS_STRING | Enumeration.AS_SYMBOL | Enumeration.NAMED_FUNCTION | Enumeration.STRICT | Enumeration.UNNAMED_FUNCTION }
      },
    };

    /* Functions ->> Convenience/ safe abstractions over native features */
    var Functions = {
      numberIsFinite  : VOID,
      numberIsNaN     : VOID,
      numberIsSafe    : VOID,
      numberToFraction: VOID
    };

    /* Mathematics */
    var Mathematics = {
      E      : VOID,
      E_GAMMA: VOID,
      ETA    : VOID,
      LN2    : VOID,
      LN10   : VOID,
      LOG2E  : VOID,
      LOG10E : VOID,
      PHI    : VOID,
      PI     : VOID,
      SQRT2  : VOID,
      SQRT3  : VOID,
      SQRT5  : VOID,

      abs           : VOID,
      acos          : VOID,
      acosh         : VOID,
      acot          : VOID,
      acoth         : VOID,
      acsc          : VOID,
      acsch         : VOID,
      asec          : VOID,
      asech         : VOID,
      asin          : VOID,
      asinh         : VOID,
      atan          : VOID,
      atanh         : VOID,
      beta          : VOID,
      cbrt          : VOID,
      ceil          : VOID,
      clamp         : VOID,
      cos           : VOID,
      cot           : VOID,
      coth          : VOID,
      csc           : VOID,
      csch          : VOID,
      cyl_bessel    : VOID,
      cyl_neumann   : VOID,
      ellint        : VOID,
      exp           : VOID,
      expint        : VOID,
      fact          : VOID,
      floor         : VOID,
      gcd           : VOID,
      hermite       : VOID,
      iabs          : VOID,
      icbrt         : VOID,
      imax          : VOID,
      imin          : VOID,
      ipow          : VOID,
      iroot         : VOID,
      isqrt         : VOID,
      itrunc        : VOID,
      jsf           : VOID,
      knuth_b       : VOID,
      laguerre      : VOID,
      lcg           : VOID,
      legendre      : VOID,
      lerp          : VOID,
      ln            : VOID,
      log           : VOID,
      max           : VOID,
      min           : VOID,
      mod           : VOID,
      mt            : VOID,
      mt32          : VOID,
      mt64          : VOID,
      mulberry      : VOID,
      mulberry32    : VOID,
      perc          : VOID,
      pow           : VOID,
      randint       : VOID,
      random        : VOID,
      riemann_zeta  : VOID,
      root          : VOID,
      round         : VOID,
      sec           : VOID,
      sech          : VOID,
      sin           : VOID,
      sinh          : VOID,
      sph_bessel    : VOID,
      sph_legendre  : VOID,
      sph_neumann   : VOID,
      sqrt          : VOID,
      tan           : VOID,
      tanh          : VOID,
      trunc         : VOID,
      wrap          : VOID,
      xorshift      : VOID,
      xorshift128   : VOID,
      xorshift128_p : VOID, // ->> Default random number generation seed
      xorshift128_s : VOID,
      xorshift256   : VOID,
      xorshift256_p : VOID,
      xorshift256_ss: VOID,
      xorshift_p    : VOID,
      xorshift_s    : VOID,
      xorshift_ss   : VOID,
      xorwow        : VOID
    };

    /* Native ->> Native APIs and features */
    var Native = {
      PROMISE: {
        native     : VOID,
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

          if (PROMISE.options & Enumeration.STRICT) {
            if (PROMISE.options & Enumeration.AS_GETTER) {}
            if (PROMISE.options & Enumeration.AS_SETTER) {}

            if (
              ("object"   === typeof PROMISE.native && (PROMISE.options & (Enumeration.AS_OBJECT_FUNCTION))) ||
              ("function" === typeof PROMISE.native && (PROMISE.options & (Enumeration.AS_CLASS_FUNCTION | Enumeration.AS_FUNCTION | Enumeration.AS_GENERATOR_FUNCTION | Enumeration.AS_GETTER_FUNCTION | Enumeration.AS_OBJECT_FUNCTION | Enumeration.AS_SETTER_FUNCTION)))
            ) {
              var sourceMatch = false;
              var source      = null;
              var prototyped  = false;

              // ... --- WARN (Lapys) -> Fails in JavaScript implementations that have built-in functions with the `prototype` property
              try {
                if (PROMISE.options & (Enumeration.AS_CLASS_FUNCTION | Enumeration.AS_FUNCTION | Enumeration.AS_GENERATOR_FUNCTION | Enumeration.AS_OBJECT_FUNCTION))
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

                // TODO (Lapys) -> Check `nativeof(Function.prototype.apply.apply)`
                if (delete Native.Function$prototype$apply["apply"]) { // WARN (Lapys) -> Possibly spoofed by `Proxy` — including calling it
                  Native.Function$prototype$apply.apply = Native.Function$prototype$apply;

                  if (Native.Function$prototype$apply === Native.Function$prototype$apply.apply) {
                    // ... --- WARN (Lapys) ->> Assume unchanged since property access in (strict) comparison conditional
                    source = Native.Function$prototype$apply.apply(Native.Function$prototype$toString, [PROMISE.native]);

                    if ("string" !== typeof source || source.length < (18 /* --> Math.max(...Constant.NATIVE_FUNCTION_SOURCE.map(x => x.length)) */) + (
                      PROMISE.options & Enumeration.AS_CLASS_FUNCTION     ? "class{}"      .length + (PROMISE.options & Enumeration.NAMED_FUNCTION ? PROMISE.propertyKey.length + ' '.length : 0) :
                      PROMISE.options & Enumeration.AS_GENERATOR_FUNCTION ? "function*(){}".length + (PROMISE.options & Enumeration.NAMED_FUNCTION ? PROMISE.propertyKey.length + ' '.length : 0) :
                      PROMISE.options & Enumeration.AS_GETTER_FUNCTION    ? "get _(){}"    .length + (PROMISE.options & Enumeration.NAMED_FUNCTION ? PROMISE.propertyKey.length - '_'.length : 0) :
                      PROMISE.options & Enumeration.AS_OBJECT_FUNCTION    ? "function(){}" .length + (PROMISE.options & Enumeration.NAMED_FUNCTION ? PROMISE.propertyKey.length + ' '.length : 0) :
                      PROMISE.options & Enumeration.AS_SETTER_FUNCTION    ? "set _(){}"    .length + (PROMISE.options & Enumeration.NAMED_FUNCTION ? PROMISE.propertyKey.length - '_'.length : 0) :
                      PROMISE.options & Enumeration.AS_FUNCTION           ? 13 /* --> Math.max(…) */ : 0
                    )) return PROMISE["throw"]()
                  }
                }

                // ...
                if (null === source)
                return PROMISE["throw"]();

                for (var index = Constant.NATIVE_FUNCTION_SOURCE.length; index && false === sourceMatch; ) {
                  var nativeSource = Constant.NATIVE_FUNCTION_SOURCE[--index].toString();

                  sourceMatch = (
                    ((PROMISE.options & Enumeration.NAMED_FUNCTION) && (
                      source === "function "   + PROMISE.propertyKey + "() { "      + nativeSource + " }"  ||
                      source === "function "   + PROMISE.propertyKey + "() {\n    " + nativeSource + "\n}" ||
                      source === "\nfunction " + PROMISE.propertyKey + "() {\n    " + nativeSource + "\n}\n"
                    )) ||
                    ((PROMISE.options & Enumeration.UNNAMED_FUNCTION) && (
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
                      new StaticString('c', 'l', 'a', 's', 's'),
                      new StaticString('f', 'u', 'n', 'c', 't', 'i', 'o', 'n'),
                      new StaticString('g', 'e', 't'),
                      new StaticString('s', 'e', 't')
                    ], delimiters = ""; // ->> Array of delimiter IDs

                    // ...
                    if (PROMISE.options & (Enumeration.NAMED_FUNCTION | Enumeration.UNNAMED_FUNCTION)) {
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
                            if (PROMISE.options & Enumeration.AS_FUNCTION) { if (declarator.toString() !== "class" && declarator.toString() !== "function" && declarator.toString() !== "get" && declarator.toString() !== "set") break }
                            else if (PROMISE.options & Enumeration.AS_CLASS_FUNCTION)  { if (declarator.toString() !== "class") break }
                            else if (PROMISE.options & Enumeration.AS_GETTER_FUNCTION) { if (declarator.toString() !== "get")   break }
                            else if (PROMISE.options & Enumeration.AS_SETTER_FUNCTION) { if (declarator.toString() !== "set")   break }
                            else if (PROMISE.options & (Enumeration.AS_GENERATOR_FUNCTION | Enumeration.AS_OBJECT_FUNCTION)) { if (declarator.toString() !== "function") break }

                            for (var sourceIndex = sourceOffset; sourceIndex !== source.length; ++sourceIndex) {
                              var character = at(source, sourceIndex);

                              // ...
                              if (commented) { commented = false === (character === '*' && at(source, sourceIndex + 1) === '/'); continue }
                              if (character === '/' && at(source, sourceIndex + 1) === '*') { commented = true; continue }

                              if (character === '*') {
                                if (generatorDeclaratorMatch || false === (PROMISE.options & (Enumeration.AS_FUNCTION | Enumeration.AS_GENERATOR_FUNCTION))) break;
                                generatorDeclaratorMatch = true
                              }

                              if (character === '(') {
                                subsourceMatch = (PROMISE.options & Enumeration.NAMED_FUNCTION) && (PROMISE.options & Enumeration.UNNAMED_FUNCTION)
                                  ? name[0] === PROMISE.propertyKey || "" === name[0]
                                  : name[0] === (PROMISE.options & Enumeration.NAMED_FUNCTION ? PROMISE.propertyKey : "");
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

                      for (var nativeSourcesIndex = Constant.NATIVE_FUNCTION_SOURCE.length; nativeSourcesIndex; ) {
                        var nativeSource       = Constant.NATIVE_FUNCTION_SOURCE[--nativeSourcesIndex];
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

                  for (var index = Constant.NATIVE_FUNCTION_SOURCE.length; index && false === sourceMatch; ) {
                    var nativeSource = Constant.NATIVE_FUNCTION_SOURCE[--index];

                    sourceMatch = (
                      (((PROMISE.options & Enumeration.UNNAMED_FUNCTION) || false == (PROMISE.options & Enumeration.NAMED_FUNCTION)) && (
                        source === "function() { "        + nativeSource + " }"  ||
                        source === "function() {\n    "   + nativeSource + "\n}" ||
                        source === "\nfunction() {\n    " + nativeSource + "\n}\n"
                      )) ||
                      (((PROMISE.options & Enumeration.NAMED_FUNCTION) || false == (PROMISE.options & Enumeration.UNNAMED_FUNCTION)) && (
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
            ((PROMISE.options & Enumeration.AS_BIGINT)             && ("bigint"    === typeof PROMISE.native))                                       ||
            ((PROMISE.options & Enumeration.AS_BOOLEAN)            && ("boolean"   === typeof PROMISE.native))                                       ||
            ((PROMISE.options & Enumeration.AS_CLASS_FUNCTION)     && ("function"  === typeof PROMISE.native))                                       ||
            ((PROMISE.options & Enumeration.AS_FUNCTION)           && ("function"  === typeof PROMISE.native))                                       ||
            ((PROMISE.options & Enumeration.AS_GENERATOR_FUNCTION) && ("function"  === typeof PROMISE.native))                                       ||
            ((PROMISE.options & Enumeration.AS_GETTER_FUNCTION)    && ("function"  === typeof PROMISE.native))                                       ||
            ((PROMISE.options & Enumeration.AS_NUMBER)             && ("number"    === typeof PROMISE.native))                                       ||
            ((PROMISE.options & Enumeration.AS_OBJECT)             && ("object"    === typeof PROMISE.native && null !== PROMISE.native))            ||
            ((PROMISE.options & Enumeration.AS_OBJECT_FUNCTION)    && ("function"  === typeof PROMISE.native || "object" === typeof PROMISE.native)) ||
            ((PROMISE.options & Enumeration.AS_SETTER_FUNCTION)    && ("function"  === typeof PROMISE.native))                                       ||
            ((PROMISE.options & Enumeration.AS_STRING)             && ("string"    === typeof PROMISE.native))                                       ||
            ((PROMISE.options & Enumeration.AS_SYMBOL)             && ("symbol"    === typeof PROMISE.native))                                       ||
            ((PROMISE.options & Enumeration.AS_UNDEFINED)          && ("undefined" === typeof PROMISE.native))                                       ||

            ((PROMISE.options & Enumeration.AS_NULL)     && null === PROMISE.native) ||
            ((PROMISE.options & Enumeration.AS_PROPERTY) && false === PROMISE.propertyKey in PROMISE.object)
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
              (PROMISE.options & (Enumeration.AS_CLASS_FUNCTION | Enumeration.AS_FUNCTION | Enumeration.AS_GENERATOR_FUNCTION | Enumeration.AS_GETTER_FUNCTION | Enumeration.AS_OBJECT_FUNCTION | Enumeration.AS_SETTER_FUNCTION)) &&
              false == (PROMISE.options & (Enumeration.AS_BIGINT | Enumeration.AS_BOOLEAN | Enumeration.AS_NUMBER | Enumeration.AS_NULL | Enumeration.AS_OBJECT | Enumeration.AS_STRING | Enumeration.AS_SYMBOL | Enumeration.AS_UNDEFINED)) ? "()" : ""
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

    /* Support ->> Supported native APIs and features */
    var Support = {
      STRICT_MODE                             : false,
      STRING_CHARACTER_ACCESS_BRACKET_NOTATION: false
    };

  /* Function > ... */
  function at(object, index) {
    if ("string" === typeof object) {
      if (Support.STRING_CHARACTER_ACCESS_BRACKET_NOTATION) {
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

  function define(object, key, descriptor) /* --> Expects `descriptor` to be the same format as `describe(…)` */ {
    if (descriptor.own) try {
      if (null === Native.Object$defineProperty && null === Native.Object$prototype$__lookupGetter__ && null === Native.Object$prototype$__lookupSetter__)
        ERROR !== descriptor.value ? object[key] = descriptor.value : undefined;

      else if (null !== Native.Object$defineProperty)
        Native.Object$defineProperty(descriptor, key, ERROR === descriptor.value
          ? {configurable: descriptor.configurable, enumerable: descriptor.enumerable, get: descriptor.get, set: descriptor.set}
          : {configurable: descriptor.configurable, enumerable: descriptor.enumerable, value: descriptor.value, writable: descriptor.writable}
        );

      else {
        // TODO
        if (null !== Native.Object$prototype$__defineGetter__) {}
        if (null !== Native.Object$prototype$__defineSetter__) {}
      }

      return true
    } catch (error) {}

    return false
  }

  function describe(object, key) {
    var descriptor = {
      configurable: ERROR,
      enumerable  : ERROR,
      get         : ERROR,
      own         : true,
      set         : ERROR,
      value       : ERROR,
      writable    : ERROR
    };

    // ...
    if (null === object || undefined === object)
      descriptor.own = false;

    else if (null === Native.Object$getOwnPropertyDescriptor && null === Native.Object$prototype$__lookupGetter__ && null === Native.Object$prototype$__lookupSetter__) {
      var computedProperty = false;
      var value;

      // ...
      for (var subkey in object)
      if (key === subkey) {
        descriptor.enumerable = true;
        break
      }

      try {
        var hasProperty;
        var redefineProperty;

        // ...
        descriptor.configurable = true;
        value                   = object[key];

        try { hasProperty = key in object }  // WARN (Lapys) -> Can be spoofed by the `Proxy::has(…)` trap
        catch (error) { hasProperty = true } // NOTE (Lapys) -> Presumed

        try {
          descriptor.configurable = delete object[key]; // WARN (Lapys) -> Can be spoofed by the `Proxy::deleteProperty(…)` trap

          try { redefineProperty = descriptor.configurable || (hasProperty && false === key in object) }
          catch (error) { redefineProperty = false }

          if (redefineProperty) {
            try { object[key] = value }
            catch (error) { computedProperty = true }
          }
        } catch (error) { descriptor.configurable = false }

        descriptor.own = false === descriptor.configurable || hasProperty;

        if (false === computedProperty && descriptor.configurable) try {
          var subvalue;

          // ...
          object[key]      = VOID;         // ->> Exception throwable from (owned/ non-owned) possible setter
          subvalue         = object[key]; // ->> Exception throwable from (owned/ non-owned) possible getter
          redefineProperty = false;

          if (subvalue === value) descriptor.writable = false;
          else if (VOID !== subvalue) computedProperty = true;
          else try {
            object[key] = value;
            subvalue    = object[key];

            if (subvalue === value) descriptor.writable = true;
            else { descriptor.writable = false; value = subvalue }
          } catch (error) { computedProperty = true }
        } catch (error) { redefineProperty = true }

        if (redefineProperty) {
          computedProperty = true;
          try { object[key] = value } catch (error) {}
        }
      } catch (error) { computedProperty = true }

      // ... ->> Evaluated as own property
      if (computedProperty) {
        descriptor.configurable = ERROR;
        descriptor.get          = null;
        descriptor.set          = null;
        descriptor.value        = ERROR;
        descriptor.writable     = ERROR
      }

      else {
        descriptor.get   = ERROR;
        descriptor.set   = ERROR;
        descriptor.value = value
      }
    }

    else if (null !== Native.Object$getOwnPropertyDescriptor) {
      var subdescriptor = Native.Object$getOwnPropertyDescriptor(object, key);

      // ...
      if (subdescriptor !== undefined) {
        descriptor.configurable = subdescriptor.configurable;
        descriptor.enumerable   = subdescriptor.enumerable;

        if ("value" in subdescriptor) {
          descriptor.value    = subdescriptor.value;
          descriptor.writable = subdescriptor.writable
        }

        else {
          descriptor.get = subdescriptor.get;
          descriptor.set = subdescriptor.set
        }
      }
    }

    else {
      // TODO
      if (null !== Native.Object$prototype$__lookupGetter__) {}
      if (null !== Native.Object$prototype$__lookupSetter__) {}
    }

    return descriptor
  }

  function nativeof(object, key, options, name) {
    Native.PROMISE.object      = object;
    Native.PROMISE.objectName  = arguments.length > 3 ? name : null;
    Native.PROMISE.options     = arguments.length > 2 ? options | 0x000000 : Enumeration.DEFAULT.valueOf();
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
    var descriptors = {Error$prototype$name: ERROR, Object$prototype$name: ERROR};

    // ...
    do {
      var count = 0;
      var key;

      // ...
      descriptors.Object$prototype$name = describe(Native.Object$prototype, "name");
      if (false === descriptors.Object$prototype$name.configurable || ERROR === descriptors.Object$prototype$name.value) break;

      descriptors.Error$prototype$name = describe(Native.Error$prototype, "name");
      if (false === descriptors.Error$prototype$name.configurable || ERROR === descriptors.Error$prototype$name.value) break;

      // ... ->> Allow guaranteed definition as own properties
      delete Native.Error$prototype["name"];
      delete Native.Object$prototype["name"];

      for (key in {RecursionOverflowError: null, TypeError: null})
      if (++count <= 2) {
        var descriptor = describe(Native[key + "$prototype"], "name");

        // ...
        if (descriptor.configurable && ERROR !== descriptor.value)
        if (delete descriptor["name"]) {
          var constructor = Native[key + '$'];
          var error       = new constructor(); // ->> Capture `...ERROR`

          // ...
          constructor.prototype = error; // ->> Assert `name` as own property
          error.name            = descriptor.value;

          define(Native[key + "$prototype"], "name", descriptor.value)
        }
      }

      define(Native.Error$prototype, "name", descriptors.Error$prototype$name);
      define(Native.Object$prototype, "name", descriptors.Object$prototype$name)
    } while (false)
  }

  /* Modification */
    /* Constant > ... */
    Constant.MAXIMUM_BITWISE_INTEGER      = 2147483647;
    Constant.MAXIMUM_DEPTH_ARRAY_LENGTH   = 255;
    Constant.MAXIMUM_NUMBER               = 179769313486231570814527423731704356798070567525844996598917476803157260780028538760589558632766878171540458953514382464234321326889464182768467546703537516986049910576551282076245490090389328944075868508455133942304583236903222948165808559332123348274797826204144723168738177180919299881250404026184124858368;
    Constant.MAXIMUM_SAFE_INTEGER         = 9007199254740991;
    Constant.MAXIMUM_STATIC_ARRAY_LENGTH  = 255;
    Constant.MAXIMUM_STATIC_STRING_LENGTH = 255;
    Constant.NATIVE_FUNCTION_SOURCE = [
      /* --> "[Command Line API]" */ new StaticString('[', 'C', 'o', 'm', 'm', 'a', 'n', 'd', ' ', 'L', 'i', 'n', 'e', ' ', 'A', 'P', 'I', ']'),
      /* --> "[native code]"      */ new StaticString('[', 'n', 'a', 't', 'i', 'v', 'e', ' ', 'c', 'o', 'd', 'e', ']')
    ];

    /* Functions > ... */
    Functions.numberIsFinite = function numberIsFinite(number) {
      return +Infinity !== number && -Infinity !== number
    };

    Functions.numberIsNaN = function numberIsNaN(number) {
      return number !== number
    };

    Functions.numberIsSafe = function numberIsSafe(number) {
      return Functions.numberIsFinite(number) && false === Functions.numberIsNaN(number)
    };

    Functions.numberToFraction = function numberToFraction(number) {
      var fraction = new Fraction(Mathematics.trunc(number), 0, 1);
      var mantissa = number - fraction.whole;

      // ...
      if (0.0 !== mantissa) {
        var divisor;
        var precision = 1e15;

        // ...
        for (var a = precision, b = Mathematics.round(mantissa * precision); ; divisor = a ? a : b) {
          if (0 === a || 0 === b) break;
          a < b ? b %= a : a %= b
        }

        fraction.denominator = precision / divisor;
        fraction.numerator   = Mathematics.round(fraction.denominator * mantissa)
      }

      return fraction
    };

    /* Mathematics > ... */
    Mathematics.E       = 2.718281828459045;
    Mathematics.E_GAMMA = 0.57721566490153286060651209008240243104215933593992;
    Mathematics.ETA     = 245850922 / 156513558;
    Mathematics.LN2     = 0.6931471805599453;
    Mathematics.LN10    = 2.302585092994046;
    Mathematics.LOG2E   = 1.4426950408889634;
    Mathematics.LOG10E  = 0.4342944819032518;
    Mathematics.PHI     = 1.618033988749894848204586834;
    Mathematics.PI      = 245850922 / 78256779;
    Mathematics.SQRT2   = 665857 / 470832;
    Mathematics.SQRT3   = 97 / 56;
    Mathematics.SQRT5   = 51841 / 23184;

    Mathematics.abs = function absolute(number) {
      return number < +0 ? -number : number
    };

    Mathematics.acos = function inverse_cosine(number) {
      return Mathematics.ETA - Mathematics.asin(number)
    };

    Mathematics.acosh = function hyperbolic_inverse_cosine(number) {
      return Mathematics.ln(number + Mathematics.sqrt((number * number) - 1))
    };

    Mathematics.acot = function inverse_cotangent(number) {
      return Mathematics.ETA - Mathematics.atan(number)
    };

    Mathematics.acoth = function hyperbolic_inverse_cotangent(number) {
      return Mathematics.ln((number + 1) / (number - 1)) / 2
    };

    Mathematics.acsc = function inverse_cosecant(number) {
      return Mathematics.ETA - Mathematics.asec(number)
    };

    Mathematics.acsch = function hyperbolic_inverse_cosecant(number) {
      return Mathematics.ln((1 + Mathematics.sqrt((1 + number) * (1 + number))) / number)
    };

    Mathematics.asec = function inverse_secant(number) {
      return Mathematics.acos(1 / number)
    };

    Mathematics.asech = function hyperbolic_inverse_secant(number) {
      return Mathematics.ln((1 + Mathematics.sqrt((1 - number) * (1 - number))) / number)
    };

    Mathematics.asin = function inverse_sine(number) {
      var angle           = number;
      var termDenominator = 1;
      var termNumerand    = number;
      var termNumerator   = 1;

      // ...
      for (var index = 0, recent; ; ) {
        termNumerator   *= ++index;
        termNumerand    *= number * number;
        termDenominator *= ++index;

        recent = angle;
        angle += (termNumerator / termDenominator) * (termNumerand / (index + 1));

        // ... --- TODO (Lapys) -> Requires a better halt to the series used here.
        if (false === Functions.numberIsSafe(angle)) {
          angle = recent;
          break
        }
      }

      return angle
    };

    Mathematics.asinh = function hyperbolic_inverse_sine(number) {
      return Mathematics.ln(number + Mathematics.sqrt((number * number) + 1))
    };

    Mathematics.atan = function inverse_tangent(number) {
      return Mathematics.asin(number / Mathematics.sqrt((number * number) + 1))
    };

    Mathematics.atanh = function hyperbolic_inverse_tangent(number) {
      return Mathematics.ln((1 + number) / (1 - number)) / 2
    };

    Mathematics.beta = function beta() { /* TODO (Lapys) */ };

    Mathematics.cbrt = function cube_root(number) {
      return Mathematics.iroot(number, 3)
    };

    Mathematics.ceil = function ceiling(number) {
      return Mathematics.trunc(number) + (number >= +0)
    };

    Mathematics.clamp = function clamp(number, minimum, maximum) {
       return Mathematics.imin(maximum, Mathematics.imax(number, minimum))
    };

    Mathematics.cos = function cosine(number) {
      return Mathematics.sin(Mathematics.ETA - number)
    };

    Mathematics.cot = function cotangent(number) {
      return 1 / Mathematics.tan(number)
    };

    Mathematics.coth = function hyperbolic_cotangent(number) {
      return 1 / Mathematics.tanh(number)
    };

    Mathematics.csc = function cosecant(number) {
      return 1 / Mathematics.sin(number)
    };
    Mathematics.csch = function hyperbolic_cosecant(number) {
      return 1 / Mathematics.sinh(number)
    };

    Mathematics.cyl_bessel  = function cylindrical_bessel() { /* TODO (Lapys) */ };
    Mathematics.cyl_neumann = function cylindrical_neumann() { /* TODO (Lapys) */ };
    Mathematics.ellint      = function elliptical_integral() { /* TODO (Lapys) */ };

    Mathematics.exp = function exponentiation(number) {
      if (number > 1) {
        var currentTermDenominator = 1;
        var currentTermNumerator   = 1;
        var exponent               = 0;
        var recentTerm             = 0;
        var signedness             = number < +0;

        // ...
        if (signedness)
        number = -number;

        for (var index = 1, recent; ; ++index) {
          recent     = exponent;
          recentTerm = currentTermNumerator / currentTermDenominator;
          exponent  += recentTerm;

          // ... ->> Precision ends here
          if (false === Functions.numberIsSafe(exponent)) {
            exponent = recent;
            break
          }

          // ...
          currentTermNumerator   *= number;
          currentTermDenominator *= index
        }

        // ...
        return signedness ? 1 / exponent : exponent
      }

      return Mathematics.pow(Mathematics.E, number)
    };

    Mathematics.expint = function exponential_integral() { /* TODO (Lapys) */ };

    Mathematics.fact = (function() {
      function Factorial(integer, value) { this.integer = integer; this.value = value }
        Factorial.prototype = {integer: 0, value: 1};

      // ...
      var factorials = new DepthArray(new Factorial(0, 1));
      return function factorial(integer) {
        var cache        = new Factorial(integer, 1);
        var currentCache = factorials.at(0), previousCache;

        for (var length = factorials.length, index = 1; index !== length; ++index) {
          previousCache = currentCache;
          currentCache  = factorials.at(index);

          if (integer >= index + Mathematics.abs(integer - currentCache.integer)) {
            var cached = (
              integer >= index + Mathematics.abs(integer - previousCache.integer) &&
              Mathematics.abs(integer - Mathematics.abs(integer - currentCache.integer)) < Mathematics.abs(integer - Mathematics.abs(integer - previousCache.integer))
            ) ? previousCache : currentCache;
            var subinteger = cached.integer;

            // ...
            cache.value = cached.value;

            if      (integer > subinteger) { while (integer > subinteger) cache.value *= ++subinteger; break }
            else if (integer < subinteger) { while (integer < subinteger) cache.value /= subinteger--; break }
          }
        }

        if (cache.value === 1) {
          while (integer > 1)
          cache.value *= integer--
        }

        for (var length = factorials.length, index = 0; ; ++index) {
          currentCache = index === length ? null : factorials.at(index);

          if (null !== currentCache && cache.integer === currentCache.integer) break;
          if (null === currentCache || cache.integer < currentCache.integer) { factorials.splice(index, cache); break }
        }

        return cache.value
      }
    })();

    Mathematics.floor = function floor(number) {
      return Mathematics.trunc(number) - (number < +0)
    };

    Mathematics.gcd = function greatest_common_divisor(numbers) {
      var divisor = arguments[0];

      // ...
      for (var index = arguments.length; index; ) {
        var number = arguments[--index];
        var remainder;

        while (0 !== number % divisor) {
          remainder = number % divisor;
          number    = divisor;

          divisor   = remainder
        }
      }

      return divisor
    };

    Mathematics.hermite = function hermite() { /* TODO (Lapys) */ };

    Mathematics.iabs = function integer_absolute(integer) {
       return (integer ^ (integer >> 31)) - (integer >> 31)
    };

    Mathematics.icbrt = function integer_cube_root(integer) {
      var root = Infinity;

      // ...
      for (var approximation = 2048; approximation < root; ) {
        root          = approximation;
        approximation = ((2 * root) + (integer / (root * root))) / 3
      }

      return Mathematics.itrunc(root)
    };

    Mathematics.imax = function immediate_maximum(numberA, numberB) {
      return numberA > numberB ? numberA : numberB
    };

    Mathematics.imin = function immediate_minimum(numberA, numberB) {
      return numberA < numberB ? numberA : numberB
    };

    Mathematics.ipow = function integer_power(base, exponent) {
      var product    = 1;
      var signedness = exponent < +0;

      // ...
      if (signedness)
      exponent = -exponent;

      while (true) {
        if (exponent % 2) product *= base;
        exponent = Mathematics.trunc(exponent / 2);

        if (0 === exponent) break;
        base *= base
      }

      return signedness ? 1 / product : product
    };

    Mathematics.iroot = function integer_root(number, exponent) {
      var extraction = 0;
      var signedness = exponent < +0;
      var term       = 1;

      // ...
      if (signedness)
      exponent = -exponent;

      for (var exponent = --exponent; ; term = extraction) {
        extraction = ((term * exponent) + (number / Mathematics.ipow(term, exponent))) / (exponent + 1);
        if (1e-15 > Mathematics.abs(extraction - term)) break // ->> Precision ends here
      }

      return signedness ? 1 / extraction : extraction
    };

    Mathematics.isqrt = function integer_square_root(integer) {
      var extraction = 0;

      // ...
      for (var shift = 32; shift; ) {
        shift -= 2;

        extraction <<= 1;
        extraction |= 1;
        extraction ^= extraction * extraction > (integer >>> shift);
      }

      return extraction
    };

    Mathematics.itrunc = function immediate_truncate(number) {
      return number | 0
    };

    Mathematics.jsf      = function jenkins_small_fast_randomizer() { /* TODO (Lapys) */ };
    Mathematics.knuth_b  = function knuth_algorithm_b_randomizer() { /* TODO (Lapys) */ };
    Mathematics.laguerre = function laguerre() { /* TODO (Lapys) */ };
    Mathematics.lcg      = function linear_congruential_generator() { /* TODO (Lapys) */ };
    Mathematics.legendre = function legendre() { /* TODO (Lapys) */ };

    Mathematics.lerp = function lerp(ratio, start, end) {
      return start + (ratio * (end - start))
    };

    Mathematics.ln = function natural_logarithm(number) {
      if (0 !== number) {
        var currentTerm;
        var currentTermNumerator;
        var factor     = 0; // ->> of 10
        var logarithm  = 0;
        var recentTerm = 0;
        var within     = true; // --> 0 > x < 2

        // ...
        while (number <= 1e-1) { --factor; number *= 10 }
        while (number >= 1e+1) { ++factor; number /= 10 }

        if (number >= 2) { number = 1 / number; within = false }

        number              -= 1;
        currentTermNumerator = number;
        currentTerm          = number;

        for (var index = 2; 1e-15 /* ->> Precision ends here */ < Mathematics.abs(currentTerm - recentTerm); ++index) {
          logarithm += currentTerm * (index % 2 ? -1 : 1);

          recentTerm  = currentTerm;
          currentTerm = (currentTermNumerator *= number) / index
        }

        // ...
        return (Mathematics.LN10 * factor) + (logarithm * (within ? 1 : -1))
      }

      return Infinity
    };

    Mathematics.log = function logarithm(number, base) {
      return Mathematics.ln(number) / (Mathematics.E === base || arguments.length < 2 ? 1 : Mathematics.ln(base))
    };

    Mathematics.max = function maximum(numbers) {
      var maximal = -Infinity;

      // ...
      for (var index = arguments.length; index; )
      maximal = Mathematics.imax(maximal, arguments[--index]);

      return maximal
    };

    Mathematics.min = function minimum(numbers) {
      var minimal = +Infinity;

      // ...
      for (var index = arguments.length; index; )
      minimal = Mathematics.imax(minimal, arguments[--index]);

      return minimal
    };

    Mathematics.mod = function modulus(dividend, divisor) {
      return ((dividend % divisor) + divisor) % divisor
    };

    Mathematics.mt         = function mersenne_twiser() { /* TODO (Lapys) */ };
    Mathematics.mt32       = function mersenne_twiser_32_bits() { /* TODO (Lapys) */ };
    Mathematics.mt64       = function mersenne_twiser_64_bits() { /* TODO (Lapys) */ };
    Mathematics.mulberry   = function mulberry() { /* TODO (Lapys) */ };
    Mathematics.mulberry32 = function mulberry_32_bits() { /* TODO (Lapys) */ };

    Mathematics.perc = function percent(number, exponent) {
      return number * ((arguments.length < 2 ? 1 : exponent) / 100)
    };

    Mathematics.pow = function power(base, exponent) {
      return exponent % 1 ? Mathematics.root(base, 1 / exponent) : Mathematics.ipow(base, exponent)
    };

    Mathematics.randint      = function randint() { /* TODO (Lapys) */ };
    Mathematics.random       = function random() { /* TODO (Lapys) */ };
    Mathematics.riemann_zeta = function riemann_zeta() { /* TODO (Lapys) */ };

    Mathematics.root = function root(number, exponent) {
      if (0 === (1 / exponent) % 1) return Mathematics.ipow(number, 1 / exponent);
      if (0 === exponent % 1) return Mathematics.iroot(number, exponent);

      // ...
      var extraction;
      var fraction = Functions.numberToFraction(exponent).toImproper();

      while (true) {
        extraction = Mathematics.ipow(number, fraction.denominator);
        if (Infinity !== extraction) break;

        fraction.denominator = Mathematics.trunc(fraction.denominator / 10);
        fraction.numerator   = Mathematics.trunc(fraction.numerator / 10)
      }

      return Mathematics.iroot(extraction, fraction.numerator)
    };

    Mathematics.round = function round(number) {
      var characteristics = Mathematics.trunc(number);
      return characteristics + (number - characteristics >= 0.5)
    };

    Mathematics.sec = function sec(number) {
      return 1 / Mathematics.cos(number)
    };

    Mathematics.sech = function sech(number) {
      return 1 / Mathematics.cosh(number)
    };

    Mathematics.sin = function sin(number) {
      var angle      = 0;
      var index      = 1;
      var signedness = Mathematics.ipow(-1, Mathematics.trunc(number / Mathematics.PI)) === -1;
      var term;
      var termDenominator = 1;
      var termNumerator   = number %= Mathematics.PI;

      // ...
      do {
        term   = angle;
        angle += (termNumerator / termDenominator) * (signedness ? -1 : 1);

        termDenominator *= ++index;
        termDenominator *= ++index;
        termNumerator   *= number * number;
        signedness       = false === signedness
      } while (1e-15 < Mathematics.abs(term - angle)); // ->> Precision ends here

      return angle
    };

    Mathematics.sinh = function sinh(number) {
      return (Mathematics.exp(+number) - Mathematics.exp(-number)) / 2
    };

    Mathematics.sph_bessel   = function spherical_bessel() { /* TODO (Lapys) */ };
    Mathematics.sph_legendre = function spherical_legendre() { /* TODO (Lapys) */ };
    Mathematics.sph_neumann  = function spherical_neumann() { /* TODO (Lapys) */ };

    Mathematics.sqrt = function sqrt(number) {
      return Mathematics.iroot(number, 2)
    };

    Mathematics.tan = function tan(number) {
      return Mathematics.sin(number) / Mathematics.cos(number)
    };

    Mathematics.tanh = function tanh(number) {
      return Mathematics.sinh(number) / Mathematics.cosh(number)
    };

    Mathematics.trunc = function truncate(number) {
      var counter    = 1;
      var signedness = number < +0;
      var truncation;

      // ...
      if (signedness)
      number = -number;

      while (counter < number)
      counter *= 2;

      for (truncation = 0; counter >= 1; counter /= 2)
      truncation += counter * (number >= counter + truncation);

      // ...
      return truncation * (signedness ? -1 : 1)
    };

    Mathematics.wrap = function wrap(number, start, end) {
      return Mathematics.mod(number - start, end - (start - 1))
    };

    Mathematics.xorshift       = function xorshift() { /* TODO (Lapys) */ };
    Mathematics.xorshift128    = function xorshift_128_bits() { /* TODO (Lapys) */ };
    Mathematics.xorshift128_p  = function xorshift_128_bits_plus() { /* TODO (Lapys) */ };
    Mathematics.xorshift128_s  = function xorshift_128_bits_star() { /* TODO (Lapys) */ };
    Mathematics.xorshift256    = function xorshift_256_bits() { /* TODO (Lapys) */ };
    Mathematics.xorshift256_p  = function xorshift_256_bits_plus() { /* TODO (Lapys) */ };
    Mathematics.xorshift256_ss = function xorshift_256_bits_star() { /* TODO (Lapys) */ };
    Mathematics.xorshift_p     = function xorshift_plus() { /* TODO (Lapys) */ };
    Mathematics.xorshift_s     = function xorshift_star() { /* TODO (Lapys) */ };
    Mathematics.xorshift_ss    = function xorshift_star() { /* TODO (Lapys) */ };
    Mathematics.xorwow         = function xorwow() { /* TODO (Lapys) */ };

    /* Support > ... */
    try { Support.STRICT_MODE = arguments.callee, false }
    catch (error) { Support.STRICT_MODE = true }

    Support.STRING_CHARACTER_ACCESS_BRACKET_NOTATION = false === Support.STRICT_MODE && false === delete 'ඞ'[0]; // ->> Unable to assert on strict mode

    /* Native > ... */
    try { Native.Object$prototype$toString$ = Native.Object$prototype.toString }
    catch (error) { throw new NativeAssertionError("Unable to evaluate `Object.prototype.toString()`") }

    try {
      Pseudo.prototype = GLOBAL.Function.prototype;
      if (false === (Pseudo.prototype !== Native.Object$prototype && Pseudo instanceof Pseudo && (function() {}) instanceof Pseudo && false === ({}) instanceof Pseudo)) throw new PseudoError();

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

    Native.Function$prototype$toString = nativeof(Native.Function$prototype, "toString", Enumeration.AS_FUNCTION | Enumeration.AS_PROPERTY | Enumeration.NAMED_FUNCTION | Enumeration.STRICT, "Function.prototype").get()["finally"](function(native) {
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

    Native.Function$prototype$apply = nativeof(Native.Function$prototype, "apply", Enumeration.AS_FUNCTION | Enumeration.AS_PROPERTY | Enumeration.NAMED_FUNCTION | Enumeration.STRICT, "Function.prototype").get()["finally"](function(native) {
      return nativeof(native, "apply", Enumeration.AS_FUNCTION | Enumeration.AS_PROPERTY | Enumeration.NAMED_FUNCTION | Enumeration.STRICT, "Function.prototype").get()["finally"](function(subnative) {
        if (native === subnative && false === "apply" in Native.Object$prototype && delete Native.Function$prototype["apply"]) {
          Native.Function$prototype.apply = native;
          return native
        }

        return ERROR
      })
    });

    Native.Function$prototype$bind = nativeof(Native.Function$prototype, "bind", Enumeration.AS_FUNCTION | Enumeration.AS_PROPERTY | Enumeration.NAMED_FUNCTION | Enumeration.STRICT, "Function.prototype").get(null)["finally"](function(native) {
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
    ) : nativeof("", "charAt", Enumeration.AS_FUNCTION | Enumeration.NAMED_FUNCTION | Enumeration.STRICT, "String.prototype")["try"](function() {
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
