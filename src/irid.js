import hexToRGB from "./hex-to-rgb";
import cssHSLToHSL from "./css-hsl-to-hsl";
import cssRGBToRGB from "./css-rgb-to-rgb";
import hslToCSSHSL from "./hsl-to-css-hsl";
import rgbToCSSRGB from "./rgb-to-css-rgb";
import rgbToHex from "./rgb-to-hex";
import rgbToHSL from "./rgb-to-hsl";
import hslToRGB from "./hsl-to-rgb";
import canInterpret from "./can-interpret";
import { swatches } from "./swatches";

const invalidError = "Invalid color specification";

const Irid = function(initial) {
  if (!(this instanceof Irid)) {
    return new Irid(initial);
  }
  if (!initial) {
    throw invalidError;
  }
  if (initial instanceof Irid) {
    this.hsl = initial.hsl;
    this.rgb = initial.rgb;
  } else if (
    initial.h !== undefined &&
    initial.s !== undefined &&
    initial.l !== undefined
  ) {
    this.hsl = initial;
  } else if (typeof initial == "string") {
    this.rgb =
      hexToRGB(initial) ||
      cssRGBToRGB(initial) ||
      hexToRGB(swatches[initial.toLowerCase()]);
    if (!this.rgb) {
      this.hsl = cssHSLToHSL(initial);
      if (!this.hsl) {
        throw invalidError;
      }
    }
  } else if (
    initial.r !== undefined &&
    initial.g !== undefined &&
    initial.b !== undefined
  ) {
    this.rgb = initial;
  }
};

Irid.prototype = {
  _makeRGB: function() {
    if (typeof this.rgb == "undefined") {
      this.rgb = hslToRGB(this.hsl);
    }
  },
  _makeHSL: function() {
    if (typeof this.hsl == "undefined") {
      this.hsl = rgbToHSL(this.rgb);
    }
  },
  // See http://en.wikipedia.org/wiki/HSL_and_HSV#Lightness
  luma: function() {
    this._makeRGB();
    const rgb = this.rgb;
    return (0.3 * rgb.r + 0.59 * rgb.g + 0.11 * rgb.b) / 255;
  },
  // see http://www.w3.org/TR/WCAG/#relativeluminancedef
  relativeLuminance: function() {
    this._makeRGB();
    function calc(x) {
      const srgb = x / 255;
      return srgb <= 0.03928
        ? srgb / 12.92
        : Math.pow((srgb + 0.055) / 1.055, 2.4);
    }
    return (
      0.2126 * calc(this.rgb.r) +
      0.7152 * calc(this.rgb.g) +
      0.0722 * calc(this.rgb.b)
    );
  },
  // see http://www.w3.org/TR/WCAG20/#visual-audio-contrast
  // http://www.w3.org/TR/WCAG20/#contrast-ratiodefs
  contrastRatio: function(other) {
    other = Irid(other);
    let lighter, darker;
    if (other.relativeLuminance() > this.relativeLuminance()) {
      lighter = other;
      darker = this;
    } else {
      lighter = this;
      darker = other;
    }
    return (
      (lighter.relativeLuminance() + 0.05) / (darker.relativeLuminance() + 0.05)
    );
  },
  red: function(r) {
    this._makeRGB();
    return typeof r == "undefined"
      ? this.rgb.r
      : new Irid({
          r: parseInt(r, 10),
          g: this.rgb.g,
          b: this.rgb.b,
          a: this.rgb.a
        });
  },
  green: function(g) {
    this._makeRGB();
    return typeof g == "undefined"
      ? this.rgb.g
      : new Irid({
          r: this.rgb.r,
          g: parseInt(g, 10),
          b: this.rgb.b,
          a: this.rgb.a
        });
  },
  blue: function(b) {
    this._makeRGB();
    return typeof b == "undefined"
      ? this.rgb.b
      : new Irid({
          r: this.rgb.r,
          g: this.rgb.g,
          b: parseInt(b, 10),
          a: this.rgb.a
        });
  },
  hue: function(h) {
    this._makeHSL();
    return typeof h == "undefined"
      ? this.hsl.h
      : new Irid({
          h: parseFloat(h),
          s: this.hsl.s,
          l: this.hsl.l,
          a: this.hsl.a
        });
  },
  saturation: function(s) {
    this._makeHSL();
    return typeof s == "undefined"
      ? this.hsl.s
      : new Irid({
          h: this.hsl.h,
          s: parseFloat(s),
          l: this.hsl.l,
          a: this.hsl.a
        });
  },
  lightness: function(l) {
    this._makeHSL();
    return typeof l == "undefined"
      ? this.hsl.l
      : new Irid({
          h: this.hsl.h,
          s: this.hsl.s,
          l: parseFloat(l),
          a: this.hsl.a
        });
  },
  alpha: function(a) {
    if (arguments.length === 0) {
      return (this.hsl || this.rgb).a;
    } else {
      a = a === null || a === undefined ? undefined : parseFloat(a);
      if (this.hsl) {
        return new Irid({ h: this.hsl.h, s: this.hsl.s, l: this.hsl.l, a: a });
      } else {
        return new Irid({ r: this.rgb.r, g: this.rgb.g, b: this.rgb.b, a: a });
      }
    }
  },
  opacity: function(a) {
    if (arguments.length === 0) {
      return this.alpha();
    }
    else {
      return this.alpha(a);
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
  contrast: function(a, b) {
    // return new Irid((this.l > 0.5) ? "#111": "#eee"); // naive
    a = Irid(a || "#fff");
    b = Irid(b || "#000");
    const aContrast = Math.abs(a.luma() - this.luma());
    const bContrast = Math.abs(b.luma() - this.luma());
    return aContrast > bContrast ? a : b;
  },
  analagous: function() {
    return [this, this.hue(this.hue() - 1 / 12), this.hue(this.hue() + 1 / 12)];
  },
  tetrad: function() {
    const hue = this.hue();
    return [
      this,
      this.hue(hue + 1 / 4),
      this.hue(hue + 2 / 4),
      this.hue(hue + 3 / 4)
    ];
  },
  rectTetrad: function() {
    return [
      this,
      this.hue(this.hue() + 1 / 6),
      this.hue(this.hue() + 3 / 6),
      this.hue(this.hue() + 4 / 6)
    ];
  },
  triad: function() {
    return [this, this.hue(this.hue() - 1 / 3), this.hue(this.hue() + 1 / 3)];
  },
  splitComplementary: function() {
    return [this, this.hue(this.hue() - 5 / 12), this.hue(this.hue() + 5 / 12)];
  },
  blend: function(other, opacity) {
    if (typeof opacity == "undefined") opacity = 0.5;
    const thisOpacity = 1 - opacity;
    other = new Irid(other);
    return new Irid({
      r: Math.floor(this.red() * thisOpacity + other.red() * opacity),
      g: Math.floor(this.green() * thisOpacity + other.green() * opacity),
      b: Math.floor(this.blue() * thisOpacity + other.blue() * opacity)
    });
  },
  toString: function() {
    // TODO: make this smarter, return rgba when needed
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

console.log(cssHSLToHSL);

setTimeout(() => {
  Irid.swatches = swatches;
  Irid.canInterpret = canInterpret;
}, 0);

export default Irid;
