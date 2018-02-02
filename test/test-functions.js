/* global suite, test */
import Irid from "../src/irid";
import chai from "chai";

const assert = chai.assert;

suite("functions", function() {
  test("hexToRGB (6 digits)", function() {
    var rgb = Irid.hexToRGB("#0088ff");
    assert.equal(rgb.r, 0);
    assert.equal(rgb.g, 136);
    assert.equal(rgb.b, 255);
    assert.equal(rgb.a, undefined);
  });

  test("hexToRGB (8 digits)", function() {
    var rgb = Irid.hexToRGB("#0088ff7f");
    assert.equal(rgb.r, 0);
    assert.equal(rgb.g, 136);
    assert.equal(rgb.b, 255);
    assert.equal(rgb.a.toFixed(1), 0.5);
  });

  test("hexToRGB (3 digits)", function() {
    var rgb = Irid.hexToRGB("#08f");
    assert.equal(rgb.r, 0);
    assert.equal(rgb.g, 136);
    assert.equal(rgb.b, 255);
    assert.equal(rgb.a, undefined);
  });

  test("hexToRGB (4 digits)", function() {
    var rgb = Irid.hexToRGB("#08f8");
    assert.equal(rgb.r, 0);
    assert.equal(rgb.g, 136);
    assert.equal(rgb.b, 255);
    assert.equal(rgb.a.toFixed(1), 0.5);
  });

  test("simple rgb", function() {
    var rgb = Irid.cssRGBToRGB("rgb(0, 136, 255)");
    assert.equal(rgb.r, 0);
    assert.equal(rgb.g, 136);
    assert.equal(rgb.b, 255);
    assert.equal(rgb.a, undefined);
  });

  test("rgb with percent", function() {
    var rgb = Irid.cssRGBToRGB("rgb(0%, 50%, 100%)");
    assert.equal(rgb.r, 0);
    assert.equal(rgb.g, 127);
    assert.equal(rgb.b, 255);
    assert.equal(rgb.a, undefined);
  });

  test("rgba", function() {
    var rgb = Irid.cssRGBToRGB("rgba(0, 136, 255, 0.7)");
    assert.equal(rgb.r, 0);
    assert.equal(rgb.g, 136);
    assert.equal(rgb.b, 255);
    assert.equal(rgb.a, 0.7);
  });

  test("hsl", function() {
    var hsl = Irid.cssHSLToHSL("hsl(180, 60%, 70%)");
    assert.equal(hsl.h, 0.5);
    assert.equal(hsl.s, 0.6);
    assert.equal(hsl.l, 0.7);
    assert.equal(hsl.a, undefined);
  });

  test("hsla", function() {
    var hsl = Irid.cssHSLToHSL("hsl(180, 60%, 70%, 0.8)");
    assert.equal(hsl.h, 0.5);
    assert.equal(hsl.s, 0.6);
    assert.equal(hsl.l, 0.7);
    assert.equal(hsl.a, 0.8);
  });

  test("rgbToCSSRGB", function() {
    assert.equal(
      Irid.rgbToCSSRGB({ r: 0, g: 136, b: 255 }),
      "rgb(0, 136, 255)"
    );
  });

  test("rgbToCSSRGB with alpha", function() {
    assert.equal(
      Irid.rgbToCSSRGB({ r: 0, g: 136, b: 255, a: 0.7 }),
      "rgba(0, 136, 255, 0.70)"
    );
  });

  test("hslToCSSHSL", function() {
    assert.equal(
      Irid.hslToCSSHSL({ h: 0.5, s: 0.6, l: 0.7 }),
      "hsl(180, 60%, 70%)"
    );
  });

  test("hslToCSSHSL with alpha", function() {
    assert.equal(
      Irid.hslToCSSHSL({ h: 0.5, s: 0.6, l: 0.7, a: 0.8 }),
      "hsla(180, 60%, 70%, 0.80)"
    );
  });

  test("rgbToHex", function() {
    assert.equal(Irid.rgbToHex({ r: 0, g: 136, b: 255 }), "#0088ff");
  });

  test("rgbToHex with alpha", function() {
    assert.equal(Irid.rgbToHex({ r: 0, g: 136, b: 255, a: 0.5 }), "#0088ff7f");
  });

  test("hslToRGB", function() {
    var rgb = Irid.hslToRGB({ h: 147 / 255, s: 1, l: 128 / 255 });
    assert.equal(rgb.r, 0);
    assert.equal(rgb.g, 138);
    assert.equal(rgb.b, 255);
    assert.equal(rgb.a, undefined);
  });

  test("hslToRGB with alpha", function() {
    var rgb = Irid.hslToRGB({ h: 147 / 255, s: 1, l: 128 / 255, a: 0.5 });
    assert.equal(rgb.r, 0);
    assert.equal(rgb.g, 138);
    assert.equal(rgb.b, 255);
    assert.equal(rgb.a, 0.5);
  });

  test("hslToRGB (white)", function() {
    var rgb = Irid.hslToRGB({ h: 0, s: 1, l: 1 });
    assert.equal(rgb.r, 255);
    assert.equal(rgb.g, 255);
    assert.equal(rgb.b, 255);
    assert.equal(rgb.a, undefined);
  });

  test("hslToRGB (hue=1)", function() {
    var rgb = Irid.hslToRGB({ h: 1, s: 1, l: 0.5 });
    assert.equal(rgb.r, 255);
    assert.equal(rgb.g, 0);
    assert.equal(rgb.b, 0);
    assert.equal(rgb.a, undefined);
  });

  test("hslToRGB (negative hue)", function() {
    var rgb = Irid.hslToRGB({ h: -0.25, s: 1, l: 0.5 });
    assert.equal(rgb.r, 127);
    assert.equal(rgb.g, 0);
    assert.equal(rgb.b, 255);
    assert.equal(rgb.a, undefined);
  });

  test("rgbToHSL", function() {
    var hsl = Irid.rgbToHSL({ r: 0, g: 138, b: 255 });
    assert.equal(hsl.h.toFixed(2), (147 / 255).toFixed(2));
    assert.equal(hsl.s.toFixed(2), 1);
    assert.equal(hsl.l.toFixed(2), (128 / 255).toFixed(2));
    assert.equal(hsl.a, undefined);
  });

  test("rgbToHSL", function() {
    var hsl = Irid.rgbToHSL({ r: 0, g: 138, b: 255, a: 0.5 });
    assert.equal(hsl.h.toFixed(2), (147 / 255).toFixed(2));
    assert.equal(hsl.s.toFixed(2), 1);
    assert.equal(hsl.l.toFixed(2), (128 / 255).toFixed(2));
    assert.equal(hsl.a, 0.5);
  });

  test("rgbToHSL (white)", function() {
    var hsl = Irid.rgbToHSL({ r: 255, g: 255, b: 255 });
    assert.equal(hsl.h.toFixed(2), 0);
    assert.equal(hsl.s.toFixed(2), 0);
    assert.equal(hsl.l.toFixed(2), 1);
    assert.equal(hsl.a, undefined);
  });

  test("canInterpret", function() {
    assert.ok(Irid.canInterpret("#fff"));
    assert.ok(Irid.canInterpret("white"));
    assert.ok(Irid.canInterpret("rgb(100, 101, 102)"));
    assert.ok(Irid.canInterpret(Irid("#fff")));
    assert.ok(Irid.canInterpret({ r: 255, g: 255, b: 255 }));
    assert.notOk(Irid.canInterpret(""));
    assert.notOk(Irid.canInterpret("rkbyucvgtsaerklyuigbfakl"));
    assert.notOk(Irid.canInterpret("#ab"));
    assert.notOk(Irid.canInterpret(NaN));
    assert.notOk(Irid.canInterpret(null));
    assert.notOk(Irid.canInterpret(undefined));
    assert.notOk(Irid.canInterpret(5));
    assert.notOk(Irid.canInterpret(true));
    assert.notOk(Irid.canInterpret([]));
    assert.notOk(Irid.canInterpret([1, 2, 3]));
    assert.notOk(Irid.canInterpret({ foo: "bar" }));
  });
});
