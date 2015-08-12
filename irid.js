/*global module*/
"use strict";

var invalidError = "Invalid colour specification",
    // Silly micro-optimizations (vars get minified):
    undef = "undefined",
    round = Math.round,
    max = Math.max,
    min = Math.min,
    floor = Math.floor;

var Irid = function (initial) {
    if ( ! (this instanceof Irid)) { return new Irid(initial); }
    if ( ! initial ) {
        throw invalidError;
    }
    if (initial instanceof Irid) {
        this.hsl = initial.hsl;
        this.rgb = initial.rgb;
    }
    else if (initial.h !== undefined &&
            initial.s !== undefined && initial.l !== undefined) {
        this.hsl = initial;
    }
    else if (typeof initial == "string") {
        this.rgb = hexToRGB(initial) || cssRGBToRGB(initial) ||
                hexToRGB(Irid.swatches[initial.toLowerCase()]);
        if (!this.rgb) {
            this.hsl = cssHSLToHSL(initial);
            if ( ! this.hsl ) { throw invalidError; }
        }
    }
    else if (initial.r !== undefined && initial.g !== undefined && initial.b !== undefined) {
        this.rgb = initial;
    }
};

Irid.prototype = {
    _makeRGB: function () {
        if (typeof(this.rgb) == undef) { this.rgb = hslToRGB(this.hsl); }
    },
    _makeHSL: function () {
        if (typeof(this.hsl) == undef) { this.hsl = rgbToHSL(this.rgb); }
    },
    luma: function() {
        var rgb = this.rgb;
        this._makeRGB();
        // See http://en.wikipedia.org/wiki/HSL_and_HSV#Lightness
        return  (0.3*rgb.r + 0.59*rgb.g + 0.11*rgb.b) / 255;
    },
    red: function(r) {
        this._makeRGB();
        return (typeof(r) == undef) ? this.rgb.r :
            new Irid({r: parseInt(r, 10), g: this.rgb.g, b: this.rgb.b, a: this.rgb.a});
    },
    green: function(g) {
        this._makeRGB();
        return (typeof(g) == undef) ? this.rgb.g :
            new Irid({r: this.rgb.r, g: parseInt(g, 10), b: this.rgb.b, a: this.rgb.a});
    },
    blue: function(b) {
        this._makeRGB();
        return (typeof(b) == undef) ? this.rgb.b :
            new Irid({r: this.rgb.r, g: this.rgb.g, b: parseInt(b, 10), a: this.rgb.a});
    },
    hue: function(h) {
        this._makeHSL();
        return (typeof(h) == undef) ? this.hsl.h :
            new Irid({h: parseFloat(h), s: this.hsl.s, l: this.hsl.l, a: this.hsl.a});
    },
    saturation: function(s) {
        this._makeHSL();
        return (typeof(s) == undef) ? this.hsl.s :
            new Irid({h: this.hsl.h, s: parseFloat(s), l: this.hsl.l, a: this.hsl.a});
    },
    lightness: function(l) {
        this._makeHSL();
        return (typeof(l) == undef) ? this.hsl.l :
            new Irid({h: this.hsl.h, s: this.hsl.s, l: parseFloat(l), a: this.hsl.a});
    },
    alpha: function(a) {
        if (arguments.length === 0) {
            return (this.hsl || this.rgb).a;
        }
        else {
            a = (a === null || a === undefined) ? undefined : parseFloat(a);
            if (this.hsl) {
                return new Irid({h: this.hsl.h, s: this.hsl.s, l: this.hsl.l, a: a});
            }
            else {
                return new Irid({r: this.rgb.r, g: this.rgb.g, b: this.rgb.b, a: a});
            }
        }
    },
    lighten: function(amount) {
        this._makeHSL();
        return new Irid({
            h: this.hsl.h,
            s: this.hsl.s,
            l: this.hsl.l + (1 - this.hsl.l) * amount,
            a: this.hsl.a
        });
    },
    darken: function(amount) {
        this._makeHSL();
        return new Irid({
            h: this.hsl.h,
            s: this.hsl.s,
            l: this.hsl.l * (1 - amount),
            a: this.hsl.a
        });
    },
    invert: function() {
        this._makeRGB();
        return new Irid({
            r: 255 - this.rgb.r,
            g: 255 - this.rgb.g,
            b: 255 - this.rgb.b,
            a: this.rgb.a
        });
    },
    complement: function() {
        this._makeHSL();
        return new Irid({
            h: (this.hsl.h + 0.5) % 1.0,
            s: this.hsl.s,
            l: this.hsl.l,
            a: this.hsl.a
        });
    },
    desaturate: function() {
        this._makeHSL();
        return new Irid({
            h: this.hsl.h,
            s: 0,
            l: this.hsl.l,
            a: this.hsl.a
        });
    },
    contrast: function(forDark, forLight) {
        // return new Irid((this.l > 0.5) ? "#111": "#eee"); // naive
        return new Irid((this.luma() > 0.6)?
                 forLight || "#111" :
                 forDark || "#eee");
    },
    analagous: function() {
        return [
            this,
            this.hue(this.hue() - 1/12),
            this.hue(this.hue() + 1/12)
        ];
    },
    tetrad: function() {
        var hue = this.hue();
        return [
            this,
            this.hue(hue + 1/4),
            this.hue(hue + 2/4),
            this.hue(hue + 3/4)
        ];
    },
    rectTetrad: function() {
        return [
            this,
            this.hue(this.hue() + 1/6),
            this.hue(this.hue() + 3/6),
            this.hue(this.hue() + 4/6)
        ];
    },
    triad: function() {
        return [
            this,
            this.hue(this.hue() - 1/3),
            this.hue(this.hue() + 1/3)
        ];
    },
    splitComplementary: function() {
        return [
            this,
            this.hue(this.hue() - 5/12),
            this.hue(this.hue() + 5/12)
        ];
    },
    blend: function (other, opacity) {
        if (typeof opacity == "undefined") opacity = 0.5;
        var thisOpacity = 1 - opacity;
        other = new Irid(other);
        return new Irid({
            r: Math.floor((this.red() * thisOpacity + other.red() * opacity)),
            g: Math.floor((this.green() * thisOpacity + other.green() * opacity)),
            b: Math.floor((this.blue() * thisOpacity + other.blue() * opacity))
        });
    },
    toString: function() { // TODO: make this smarter, return rgba when needed
        return this.toHexString();
    },
    toHexString: function() {
        this._makeRGB();
        return rgbToHex(this.rgb);
    },
    toRGBString: function() {
        this._makeRGB();
        return rgbToCSSRGB(this.rgb);
    },
    toHSLString: function() {
        this._makeHSL();
        return hslToCSSHSL(this.hsl);
    }
};


var parseHexValue = function (str) {
    if (str.length == 1) { str += str; }
    return max(0, min(255, parseInt(str, 16)));
};

var parseRGBValue = function (str) {
    var percent = str.charAt(str.length - 1) == "%";
    if (percent) { str = str.slice(0, str.length - 1); }
    return max(0, min(255, round(
            parseInt(str, 10) * (percent ? 2.55 : 1)
    )));
};

var parseAlphaValue = function (str) {
    return str ? max(0, min(1, parseFloat(str))) : undefined;
};

var parseHueValue = function (str) {
    var val = parseInt(str, 10) % 360;
    if (val < 0) { val += 360; }
    return val / 360;
};

var parseSLValue = function (str) {
    return max(0, min(100, parseInt(str, 10))) / 100;
};


var hexToRGB = Irid.hexToRGB = function (hex) {
    var parts = /^#([\da-f])([\da-f])([\da-f])([\da-f])?$/i.exec(hex) ||
            /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})([\da-f]{2})?$/i.exec(hex);
    return parts? {
        r: parseHexValue(parts[1]),
        g: parseHexValue(parts[2]),
        b: parseHexValue(parts[3]),
        a: (typeof parts[4] == undef || parts[4] == "")?
                undefined :
                parseHexValue(parts[4])/255
    }:undefined;
};


var cssRGBToRGB = Irid.cssRGBToRGB = function (css) {
    var parts = /^rgba?\(\s*(-?\d+%?)\s*,\s*(-?\d+%?)\s*,\s*(-?\d+%?)\s*(?:,\s*(-?\d*(?:\.\d+)?)?)?\s*\)$/.exec(css);
    return parts? {
        r: parseRGBValue(parts[1]),
        g: parseRGBValue(parts[2]),
        b: parseRGBValue(parts[3]),
        a: parseAlphaValue(parts[4])
    }:undefined;
};


var rgbToCSSRGB = Irid.rgbToCSSRGB = function (rgb) {
    return "rgb" + (rgb.a?"a":"") + "(" +
        round(rgb.r) + ", " +
        round(rgb.g) + ", " +
        round(rgb.b) +
        ( rgb.a? (", " + rgb.a.toFixed(2)) : ""  ) + ")";
};


var hslToCSSHSL = Irid.hslToCSSHSL = function (hsl) {
    return "hsl" + (hsl.a?"a":"") + "(" +
        round(hsl.h * 360) + ", " +
        round(hsl.s * 100) + "%, " +
        round(hsl.l * 100) + "%" +
        ( hsl.a? (", " + hsl.a.toFixed(2)) : ""  ) + ")";
};


var cssHSLToHSL = Irid.cssHSLToHSL = function (css) {
    var parts = /^hsla?\(\s*(-?\d+)\s*,\s*(-?\d+%)\s*,\s*(-?\d+%)\s*(?:,\s*(-?\d*(?:\.\d+)?)?)?\s*\)$/.exec(css);
    return parts? {
        h: parseHueValue(parts[1]),
        s: parseSLValue(parts[2]),
        l: parseSLValue(parts[3]),
        a: parseAlphaValue(parts[4])
    }:undefined;
};


var rgbToHex = Irid.rgbToHex = function (rgb) {
    var alpha,
        str = "#" +
        ((rgb.r < 16)? "0":"") + rgb.r.toString(16) +
        ((rgb.g < 16)? "0":"") + rgb.g.toString(16) +
        ((rgb.b < 16)? "0":"") + rgb.b.toString(16);
    if (rgb.a !== undefined) {
        alpha = floor(rgb.a*255);
        str += ((alpha < 16 )? "0":"") + alpha.toString(16);
    }
    return str;
};


var rgbToHSL = Irid.rgbToHSL = function (rgb) {
    var v, m, vm, r2, g2, b2,
        r = rgb.r/255,
        g = rgb.g/255,
        b = rgb.b/255,
        h = 0,
        s = 0,
        l = 0;
    v = max(r,g,b);
    m = min(r,g,b);
    l = (m + v) / 2;
    if (l > 0) {
        vm = v - m;
        s = vm;
        if (s > 0) {
            s = s / ((l <= 0.5) ? (v + m) : (2 - v - m)) ;
            r2 = (v - r) / vm;
            g2 = (v - g) / vm;
            b2 = (v - b) / vm;
            if (r == v) { h = (g == m ? 5.0 + b2 : 1.0 - g2); }
            else if (g == v) { h = (b == m ? 1.0 + r2 : 3.0 - b2); }
            else { h = (r == m ? 3.0 + g2 : 5.0 - r2); }
            h = h / 6;
        }
    }
    return {h: h%1, s: s, l: l, a: rgb.a};
};


var hslToRGB = Irid.hslToRGB = function (hsl) {
    var v, r, g, b, m, sv, sextant, fract, vsf, mid1, mid2,
        h = hsl.h % 1,
        sl = hsl.s,
        l = hsl.l;
    if (h < 0) { h += 1; }
    r = g = b = l;
    v = (l <= 0.5) ? (l * (1.0 + sl)) : (l + sl - l * sl);
    if (v > 0) {
        m = l + l - v;
        sv = (v - m ) / v;
        h *= 6.0;
        sextant = floor(h);
        fract = h - sextant;
        vsf = v * sv * fract;
        mid1 = m + vsf;
        mid2 = v - vsf;
        switch (sextant) {
            case 0:  r = v;     g = mid1;  b = m;     break;
            case 1:  r = mid2;  g = v;     b = m;     break;
            case 2:  r = m;     g = v;     b = mid1;  break;
            case 3:  r = m;     g = mid2;  b = v;     break;
            case 4:  r = mid1;  g = m;     b = v;     break;
            case 5:  r = v;     g = m;     b = mid2;  break;
        }
    }
    return {
        r: floor(r * 255),
        g: floor(g * 255),
        b: floor(b * 255),
        a: hsl.a
    };
};

// see http://www.w3.org/TR/css3-color/#svg-color
Irid.swatches = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
};

module.exports = Irid;
