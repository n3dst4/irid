/* global suite, test */
import chai from "chai";
import hexToRGB from "../src/hex-to-rgb";
import canInterpret from "../src/can-interpret";
import Irid from "../src/irid";
import rgbToHSL from "../src/rgb-to-hsl";
import hslToCSSHSL from "../src/hsl-to-css-hsl";
import cssHSLToHSL from "../src/css-hsl-to-hsl";
import rgbToCSSRGB from "../src/rgb-to-css-rgb";
import cssRGBToRGB from "../src/css-rgb-to-rgb";
import hslToRGB from "../src/hsl-to-rgb";
import rgbToHex from "../src/rgb-to-hex";

const assert = chai.assert;

suite("functions", function() {
  test("hexToRGB (6 digits)", function() {
    const rgb = hexToRGB("#0088ff");
    assert.equal(rgb.r, 0);
    assert.equal(rgb.g, 136);
    assert.equal(rgb.b, 255);
    assert.equal(rgb.a, undefined);
  });

  test("hexToRGB (8 digits)", function() {
    const rgb = hexToRGB("#0088ff7f");
    assert.equal(rgb.r, 0);
    assert.equal(rgb.g, 136);
    assert.equal(rgb.b, 255);
    assert.equal(rgb.a.toFixed(1), 0.5);
  });

  test("hexToRGB (3 digits)", function() {
    const rgb = hexToRGB("#08f");
    assert.equal(rgb.r, 0);
    assert.equal(rgb.g, 136);
    assert.equal(rgb.b, 255);
    assert.equal(rgb.a, undefined);
  });

  test("hexToRGB (4 digits)", function() {
    const rgb = hexToRGB("#08f8");
    assert.equal(rgb.r, 0);
    assert.equal(rgb.g, 136);
    assert.equal(rgb.b, 255);
    assert.equal(rgb.a.toFixed(1), 0.5);
  });

  test("simple rgb", function() {
    const rgb = cssRGBToRGB("rgb(0, 136, 255)");
    assert.equal(rgb.r, 0);
    assert.equal(rgb.g, 136);
    assert.equal(rgb.b, 255);
    assert.equal(rgb.a, undefined);
  });

  test("rgb with percent", function() {
    const rgb = cssRGBToRGB("rgb(0%, 50%, 100%)");
    assert.equal(rgb.r, 0);
    assert.equal(rgb.g, 127);
    assert.equal(rgb.b, 255);
    assert.equal(rgb.a, undefined);
  });

  test("rgba", function() {
    const rgb = cssRGBToRGB("rgba(0, 136, 255, 0.7)");
    assert.equal(rgb.r, 0);
    assert.equal(rgb.g, 136);
    assert.equal(rgb.b, 255);
    assert.equal(rgb.a, 0.7);
  });

  test("hsl", function() {
    const hsl = cssHSLToHSL("hsl(180, 60%, 70%)");
    assert.equal(hsl.h, 0.5);
    assert.equal(hsl.s, 0.6);
    assert.equal(hsl.l, 0.7);
    assert.equal(hsl.a, undefined);
  });

  test("hsla", function() {
    const hsl = cssHSLToHSL("hsl(180, 60%, 70%, 0.8)");
    assert.equal(hsl.h, 0.5);
    assert.equal(hsl.s, 0.6);
    assert.equal(hsl.l, 0.7);
    assert.equal(hsl.a, 0.8);
  });

  test("rgbToCSSRGB", function() {
    assert.equal(rgbToCSSRGB({ r: 0, g: 136, b: 255 }), "rgb(0, 136, 255)");
  });

  test("rgbToCSSRGB with alpha", function() {
    assert.equal(
      rgbToCSSRGB({ r: 0, g: 136, b: 255, a: 0.7 }),
      "rgba(0, 136, 255, 0.70)"
    );
  });

  test("hslToCSSHSL", function() {
    assert.equal(hslToCSSHSL({ h: 0.5, s: 0.6, l: 0.7 }), "hsl(180, 60%, 70%)");
  });

  test("hslToCSSHSL with alpha", function() {
    assert.equal(
      hslToCSSHSL({ h: 0.5, s: 0.6, l: 0.7, a: 0.8 }),
      "hsla(180, 60%, 70%, 0.80)"
    );
  });

  test("rgbToHex", function() {
    assert.equal(rgbToHex({ r: 0, g: 136, b: 255 }), "#0088ff");
  });

  test("rgbToHex with alpha", function() {
    assert.equal(rgbToHex({ r: 0, g: 136, b: 255, a: 0.5 }), "#0088ff7f");
  });

  test("hslToRGB", function() {
    const rgb = hslToRGB({ h: 147 / 255, s: 1, l: 128 / 255 });
    assert.equal(rgb.r, 0);
    assert.equal(rgb.g, 138);
    assert.equal(rgb.b, 255);
    assert.equal(rgb.a, undefined);
  });

  test("hslToRGB with alpha", function() {
    const rgb = hslToRGB({ h: 147 / 255, s: 1, l: 128 / 255, a: 0.5 });
    assert.equal(rgb.r, 0);
    assert.equal(rgb.g, 138);
    assert.equal(rgb.b, 255);
    assert.equal(rgb.a, 0.5);
  });

  test("hslToRGB (white)", function() {
    const rgb = hslToRGB({ h: 0, s: 1, l: 1 });
    assert.equal(rgb.r, 255);
    assert.equal(rgb.g, 255);
    assert.equal(rgb.b, 255);
    assert.equal(rgb.a, undefined);
  });

  test("hslToRGB (hue=1)", function() {
    const rgb = hslToRGB({ h: 1, s: 1, l: 0.5 });
    assert.equal(rgb.r, 255);
    assert.equal(rgb.g, 0);
    assert.equal(rgb.b, 0);
    assert.equal(rgb.a, undefined);
  });

  test("hslToRGB (negative hue)", function() {
    const rgb = hslToRGB({ h: -0.25, s: 1, l: 0.5 });
    assert.equal(rgb.r, 127);
    assert.equal(rgb.g, 0);
    assert.equal(rgb.b, 255);
    assert.equal(rgb.a, undefined);
  });

  test("rgbToHSL", function() {
    const hsl = rgbToHSL({ r: 0, g: 138, b: 255 });
    assert.equal(hsl.h.toFixed(2), (147 / 255).toFixed(2));
    assert.equal(hsl.s.toFixed(2), 1);
    assert.equal(hsl.l.toFixed(2), (128 / 255).toFixed(2));
    assert.equal(hsl.a, undefined);
  });

  test("rgbToHSL", function() {
    const hsl = rgbToHSL({ r: 0, g: 138, b: 255, a: 0.5 });
    assert.equal(hsl.h.toFixed(2), (147 / 255).toFixed(2));
    assert.equal(hsl.s.toFixed(2), 1);
    assert.equal(hsl.l.toFixed(2), (128 / 255).toFixed(2));
    assert.equal(hsl.a, 0.5);
  });

  test("rgbToHSL (white)", function() {
    const hsl = rgbToHSL({ r: 255, g: 255, b: 255 });
    assert.equal(hsl.h.toFixed(2), 0);
    assert.equal(hsl.s.toFixed(2), 0);
    assert.equal(hsl.l.toFixed(2), 1);
    assert.equal(hsl.a, undefined);
  });

  test("canInterpret", function() {
    assert.ok(canInterpret("#fff"));
    assert.ok(canInterpret("white"));
    assert.ok(canInterpret("rgb(100, 101, 102)"));
    assert.ok(canInterpret(Irid("#fff")));
    assert.ok(canInterpret({ r: 255, g: 255, b: 255 }));
    assert.notOk(canInterpret(""));
    assert.notOk(canInterpret("rkbyucvgtsaerklyuigbfakl"));
    assert.notOk(canInterpret("#ab"));
    assert.notOk(canInterpret(NaN));
    assert.notOk(canInterpret(null));
    assert.notOk(canInterpret(undefined));
    assert.notOk(canInterpret(5));
    assert.notOk(canInterpret(true));
    assert.notOk(canInterpret([]));
    assert.notOk(canInterpret([1, 2, 3]));
    assert.notOk(canInterpret({ foo: "bar" }));
  });
});
