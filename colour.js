/*
 * colour.js
 * ==================
 *
 * JavaScript library for dealing with colours and CSS-style colour literals.
 *
 * Usage
 * -----
 * Colour( string );
 * Colour( rgbObject );
 * Colour( hslObject );
 * 
 * API
 * ---
 * Colour( string )
 *      Returns a new Colour object based on a css-style colour value string.
 *      The recognised formats are:
 *      #xxx          Hex chars for red, greed, and blue
 *      #xxxxxx       Classic HTML colour values
 *      #xxxx         Hex chars for red, greed, blue, and alpha
 *      #xxxxxxxx     Hex chars for red, greed, blue, and alpha
 *      rgb(int, int, int)
 *      rgb(int%, int%, int%)
 *      rgba(int, int, int, float)
 *      rgba(int%, int%, int%, float)
 *      hsl(int, int%, int%)
 *      hsla(int, int%, int%, float)
 *      colourname
 *
 *      More detail about these formats can be found at 
 *      http://www.w3.org/TR/css3-color/
 *
 *      colourname can be any any named colour defined in CSS3. This is not
 *      browser-dependent: they're built in to the library.
 *      
 *      In rgb() and rgba() formats, the int values are either integers between
 *      0 and 255 inclusive, or percentage values (indicated by a %-sign.) The
 *      CSS3 spec stipulates that the three values should all be plain integers
 *      or percentages, but this is not enforced in colour.js.
 *
 *      In hsl() and hsla() formats, the first int value is the hue in degrees, 
 *      where 0 = 360 = red. The second and third values are percentages for the
 *      saturation and luminance, and must be followed by a %-sign.
 *
 *      In rgba() and hsla() formats, the float value is the alpha value, and
 *      should be between 0.0 and 1.0 inclusive. colour.js will actually
 *      understand if you supply an alpha float to rgb() or hsl(), or leave it
 *      out of rgba() or hsla() (in other words, the "a" is completely 
 *      optional.)
 *
 *      The #xxxx and #xxxxxxxx formats are not part of CSS3. They are like
 *      #xxx and #xxxxxx respectively, but with an alpha value given as the last
 *      one or two hex digits.
 *
 * .lighten (amount)
 *      Where amount is a number between 0 and 1. Lightens the colour towards 
 *      white by the proportion given. Colour("black").lighten(0.5) is medium 
 *      grey. Colour("black").lighten(0.5).lighten(0.5) is 75% light grey. 
 *      .lighten(0) is a no-op, .lighten(1) turns any colour into white.
 *
 * .darken (amount)
 *      Where amount is a number between 0 and 1. Darkens the colour towards 
 *      black by the proportion given. Colour("white").darken(0.5) is medium 
 *      grey. Colour("white").darken(0.5).darken(0.5) is 75% dark grey. 
 *      .darken(0) is a no-op, .darken(1) turns any colour into black.
 *   
 * .getContrast ( [light, dark] )
 *      Returns a new Colour object representing a tone which will be as legible
 *      as possible as a text/foreground colour when the original colour is
 *      used as a background. The defaults are #111 (on light backgrounds) and 
 *      #eee (on dark backgrounds.) If supplied, light and dark are strings or
 *      Colour objects which will be used instead (light should be a light 
 *      colour for use on dark backgrounds, dark should be a dark colour for use
 *      on light backgrounds.)
 *   
 * .toString ()
 *      Alias for .toHexString()
 *   
 * .toHexString()
 *      Returns a six or eight character hex colour code with leading #.
 *   
 * .toRGBString()
 *      Returns a CSS colour code in the rgb() or rgba() format.
 *   
 * .toHSLString()
 *      Returns a CSS colour code in the hsl() or hsla() format.
 *   
 *
 * Example
 * -------
 * Making the background of a <dt> proportionally darker than the parent <dl>:
 *      var myDl = $("my-dl");
 *      myDl.find("dt").css("background-colour", 
 *          Colour(myDl.css("background-colour")).darken(0.3).toString()
 *      );
 *
 * Setting the text colour in the dl automatically:
 *      myDl.css("color", 
 *          Colour(myDl.css("background-color")).getContrast().toString()
 *      );
 *
 * Notes
 * -----
 * Colours are stored internally in HSL format. See
 * http://en.wikipedia.org/wiki/HSL_and_HSV
 * for details. This means that sometimes, due to gamut changes and rounding
 * errors, a colour which starts as one RGB value can come out as another one.
 *
 * Copyright and licence
 * ---------------------
 * Copyright (c) 2009, Neil de Carteret
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the <organization> nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY <copyright holder> ''AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL <copyright holder> BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*jslint onevar: true, browser: true, undef: true, regexp: true, newcap: true */
(function(global){

var hexToRGB, rgbToHex, rgbToHSL, hslToRGB, Colour, 
    parseRGBValue, parseAlphaValue, parseSLValue, parseHueValue, parseHexValue,
    cssRGBToRGB, cssHSLToHSL, rgbToCSSRGB, hslToCSSHSL;


Colour = global.Colour = function (initial) {
    var rgb, hsl;
    if ( ! (this instanceof Colour)) { return new Colour(initial); }
    if (initial.h !== undefined && 
            initial.s !== undefined && initial.l !== undefined) {
        hsl = initial;
    }
    else if (typeof initial == "string") {
        rgb = hexToRGB(initial) || cssRGBToRGB(initial) ||
                hexToRGB(Colour.swatches[initial]);
        if (rgb) { hsl = rgbToHSL(rgb); }
        else     { hsl = cssHSLToHSL(initial); }
    }
    else if (initial.r && initial.g && initial.b) {
        this.hsl = rgbToHSL(rgb);
    }
    this.h = hsl.h;
    this.s = hsl.s;
    this.l = hsl.l;
    this.a = hsl.a;           
};


Colour.prototype = {
    lighten: function(amount) {
        this.l = (1 - this.l) * amount;
        return this;
    },
    darken: function(amount) {
        this.l = this.l * (1 - amount);
        return this;
    },
    getContrast: function() {
        return new Colour((this.l > 0.5) ? "#111": "#eee");
    },
    toString: function() {
        return this.toHexString();
    },
    toHexString: function() {
        return rgbToHex(hslToRGB(this));
    },
    toRGBString: function() {
        return rgbToCSSRGB(hslToRGB(this));
    },
    toHSLString: function() {
        return hslToCSSHSL(this);
    }
};


parseHexValue = function (str) {
    if (str.length == 1) { str += str; }
    return Math.max(0, Math.min(255, parseInt(str, 16)));
};

parseRGBValue = function (str) {
    var percent = str.charAt(str.length - 1) == "%";
    if (percent) { str = str.slice(0, str.length - 1); }
    return Math.max(0, Math.min(255, Math.round(
            parseInt(str, 10) * (percent ? 2.55 : 1)
    )));
};

parseAlphaValue = function (str) {
    return str ? Math.max(0, Math.min(1, parseFloat(str))) : undefined;
};

parseHueValue = function (str) {
    var val = parseInt(str, 10) % 360;
    if (val < 0) { val += 360; }
    return val / 360;
};

parseSLValue = function (str) {
    return Math.max(0, Math.min(100, parseInt(str, 10))) / 100;
};


hexToRGB = Colour.hexToRGB = function hexToRGB (hex) {
    var parts = /^#(\w)(\w)(\w)(\w)?$/.exec(hex) || 
            /^#(\w\w)(\w\w)(\w\w)(\w\w)?$/.exec(hex);
    return parts? {
        r: parseHexValue(parts[1]),
        g: parseHexValue(parts[2]),
        b: parseHexValue(parts[3]),
        a: (typeof parts[4] == "undefined" || parts[4] == "")? 
                undefined : 
                parseHexValue(parts[4])/255
    }:undefined;
};


cssRGBToRGB = Colour.cssRGBToRGB = function cssRGBToRGB (css) {
    var parts = /^rgba?\(\s*(-?\d+%?)\s*,\s*(-?\d+%?)\s*,\s*(-?\d+%?)\s*(?:,\s*(-?\d*(?:\.\d+)?)?)?\s*\)$/.exec(css);
    return parts? {
        r: parseRGBValue(parts[1]),
        g: parseRGBValue(parts[2]),
        b: parseRGBValue(parts[3]),
        a: parseAlphaValue(parts[4])
    }:undefined;
};


rgbToCSSRGB = Colour.rgbToCSSRGB = function rgbToCSSRGB (rgb) {
    return "rgb" + (rgb.a?"a":"") + "(" +
        Math.round(rgb.r) + ", " +
        Math.round(rgb.g) + ", " +
        Math.round(rgb.b) + 
        ( rgb.a? (", " + rgb.a.toFixed(2)) : ""  ) + ")";
};


hslToCSSHSL = Colour.hslToCSSHSL = function rgbToCSSRGB (hsl) {
    return "hsl" + (hsl.a?"a":"") + "(" +
        Math.round(hsl.h * 360) + ", " +
        Math.round(hsl.s * 100) + "%, " +
        Math.round(hsl.l * 100) + "%" +
        ( hsl.a? (", " + hsl.a.toFixed(2)) : ""  ) + ")";
};


cssHSLToHSL = Colour.cssHSLToHSL = function cssRGBToRGB (css) {
    var parts = /^hsla?\(\s*(-?\d+)\s*,\s*(-?\d+%)\s*,\s*(-?\d+%)\s*(?:,\s*(-?\d*(?:\.\d+)?)?)?\s*\)$/.exec(css);
    return parts? {
        h: parseHueValue(parts[1]),
        s: parseSLValue(parts[2]),
        l: parseSLValue(parts[3]),
        a: parseAlphaValue(parts[4])
    }:undefined;
};


rgbToHex = Colour.rgbToHex = function rgbToHex (rgb) {
    var alpha,
        str = "#" + 
        ((rgb.r < 16)? "0":"") + rgb.r.toString(16) + 
        ((rgb.g < 16)? "0":"") + rgb.g.toString(16) + 
        ((rgb.b < 16)? "0":"") + rgb.b.toString(16);
    if (rgb.a !== undefined) {
        alpha = Math.floor(rgb.a*255);
        str += ((alpha < 16 )? "0":"") + alpha.toString(16);
    }
    return str;
};


rgbToHSL = Colour.rgbToHSL = function rgbToHSL (rgb) {
    var v, m, vm, r2, g2, b2,
        r = rgb.r/255,
        g = rgb.g/255.0,
        b = rgb.b/255.0,
        h = 0,
        s = 0,
        l = 0;
    v = Math.max(r,g,b);
    m = Math.min(r,g,b);
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
    return {h: h, s: s, l: l, a: rgb.a};
};


hslToRGB = Colour.hslToRGB = function hslToRGB (hsl) {
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
        sextant = Math.floor(h);
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
        r: Math.floor(r * 255),
        g: Math.floor(g * 255),
        b: Math.floor(b * 255),
        a: hsl.a
    };
};

// see http://www.w3.org/TR/css3-color/#svg-color
Colour.swatches = {
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

}(this));






















