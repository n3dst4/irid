/*global suite, test */

import chai from "chai";
import Irid from "../src/irid";

const assert = chai.assert;

suite("Irid", function() {
  test("from string (#fff)", function() {
    const colour = new Irid("#fff");
    assert.equal(colour.hue().toFixed(2), 0);
    assert.equal(colour.saturation().toFixed(2), 0);
    assert.equal(colour.lightness().toFixed(2), 1);
    assert.equal(colour.a, undefined);
  });

  test("from string (#FFF)", function() {
    const colour = new Irid("#FFF");
    assert.equal(colour.hue().toFixed(2), 0);
    assert.equal(colour.saturation().toFixed(2), 0);
    assert.equal(colour.lightness().toFixed(2), 1);
    assert.equal(colour.a, undefined);
  });

  test("from string (#000)", function() {
    const colour = new Irid("#000");
    assert.equal(colour.hue().toFixed(2), 0);
    assert.equal(colour.saturation().toFixed(2), 0);
    assert.equal(colour.lightness().toFixed(2), 0);
    assert.equal(colour.a, undefined);
  });

  test("from invalid string (#yyy)", function() {
    let failed = false;
    try {
      Irid("#yyy");
    } catch (e) {
      assert.equal(e, "Invalid colour specification");
      failed = true;
    } finally {
      assert.ok(failed, "An error was correctly raised");
    }
  });

  test("from Irid object", function() {
    let colour = new Irid("#000");
    colour = new Irid(colour);
    assert.equal(colour.hue().toFixed(2), 0);
    assert.equal(colour.saturation().toFixed(2), 0);
    assert.equal(colour.lightness().toFixed(2), 0);
    assert.equal(colour.a, undefined);
  });

  test("from RGB object", function() {
    const c = Irid({ r: 255, g: 0, b: 0 });
    assert.equal(c.hue(), 0);
    assert.equal(c.saturation(), 1);
    assert.equal(c.lightness(), 0.5);
  });

  test("from named colour", function() {
    const c = Irid("lightgoldenrodyellow");
    assert.equal(c.hue().toFixed(2), "0.17");
    assert.equal(c.saturation().toFixed(2), "0.80");
    assert.equal(c.lightness().toFixed(2), "0.90");
  });

  test("from named colour (case insensitive)", function() {
    const c = Irid("LightGoldenrodYellow");
    assert.equal(c.hue().toFixed(2), "0.17");
    assert.equal(c.saturation().toFixed(2), "0.80");
    assert.equal(c.lightness().toFixed(2), "0.90");
  });

  test("from undefined", function() {
    let failed = false;
    try {
      Irid(undefined);
    } catch (e) {
      assert.equal(e, "Invalid colour specification");
      failed = true;
    } finally {
      assert.ok(failed, "An error was correctly raised");
    }
  });

  test("from gibberish", function() {
    let failed = false;
    try {
      Irid("ThisIsDefinitelyNotTheNameOfAIrid");
    } catch (e) {
      assert.equal(e, "Invalid colour specification");
      failed = true;
    } finally {
      assert.ok(failed, "An error was correctly raised");
    }
  });

  test("from null", function() {
    let failed = false;
    try {
      Irid(null);
    } catch (e) {
      assert.equal(e, "Invalid colour specification");
      failed = true;
    } finally {
      assert.ok(failed, "An error was correctly raised");
    }
  });

  test("from NaN", function() {
    let failed = false;
    try {
      Irid(NaN);
    } catch (e) {
      assert.equal(e, "Invalid colour specification");
      failed = true;
    } finally {
      assert.ok(failed, "An error was correctly raised");
    }
  });

  test("from malformed hex code", function() {
    let failed = false;
    try {
      Irid("#ab");
    } catch (e) {
      assert.equal(e, "Invalid colour specification");
      failed = true;
    } finally {
      assert.ok(failed, "An error was correctly raised");
    }
  });

  test("lighten", function() {
    let colour = new Irid("#000").lighten(0.5);
    assert.equal(colour.hue().toFixed(2), 0);
    assert.equal(colour.saturation().toFixed(2), 0);
    assert.equal(colour.lightness().toFixed(2), 0.5);
    assert.equal(colour.a, undefined);
    assert.equal(colour.toHexString(), "#7f7f7f");
    colour = new Irid({ h: 0, s: 0, l: 0.5 }).lighten(0.5);
    assert.equal(colour.lightness().toFixed(2), 0.75);
  });

  test("darken", function() {
    const colour = new Irid("#fff").darken(0.5);
    assert.equal(colour.hue().toFixed(2), 0);
    assert.equal(colour.saturation().toFixed(2), 0);
    assert.equal(colour.lightness().toFixed(2), 0.5);
    assert.equal(colour.a, undefined);
    assert.equal(colour.toHexString(), "#7f7f7f");
  });

  test("invert", function() {
    let colour = new Irid("#fff").invert();
    assert.equal(colour.hue().toFixed(2), 0);
    assert.equal(colour.saturation().toFixed(2), 0);
    assert.equal(colour.lightness().toFixed(2), 0);
    colour = new Irid("#000").invert();
    assert.equal(colour.hue().toFixed(2), 0);
    assert.equal(colour.hsl.s.toFixed(2), 0);
    assert.equal(colour.lightness().toFixed(2), 1);
    assert.equal(new Irid("#f00").invert().toHexString(), "#00ffff");
    assert.equal(new Irid("#0f0").invert().toHexString(), "#ff00ff");
    assert.equal(new Irid("#00f").invert().toHexString(), "#ffff00");
    assert.equal(new Irid("#ace").invert().toHexString(), "#553311");
  });

  test("complement", function() {
    let colour = new Irid("#fff").complement();
    assert.equal(colour.hue().toFixed(2), 0.5);
    assert.equal(colour.hsl.s.toFixed(2), 0);
    assert.equal(colour.lightness().toFixed(2), 1);
    colour = new Irid("#000").complement();
    assert.equal(colour.hue().toFixed(2), 0.5);
    assert.equal(colour.hsl.s.toFixed(2), 0);
    assert.equal(colour.lightness().toFixed(2), 0);
    assert.equal(new Irid("#f00").complement().toHexString(), "#00ffff");
    assert.equal(new Irid("#0f0").complement().toHexString(), "#ff00ff");
    assert.equal(new Irid("#00f").complement().toHexString(), "#fffe00");
    assert.equal(new Irid("#ace").complement().toHexString(), "#eeccaa");
  });

  test("desaturate", function() {
    let colour = new Irid("#fff").desaturate();
    assert.equal(colour.hue().toFixed(2), 0);
    assert.equal(colour.hsl.s.toFixed(2), 0);
    assert.equal(colour.lightness().toFixed(2), 1);
    colour = new Irid("#000").desaturate();
    assert.equal(colour.hue().toFixed(2), 0);
    assert.equal(colour.hsl.s.toFixed(2), 0);
    assert.equal(colour.lightness().toFixed(2), 0);
    assert.equal(new Irid("#f00").desaturate().toHexString(), "#7f7f7f");
    assert.equal(new Irid("#0f0").desaturate().toHexString(), "#7f7f7f");
    assert.equal(new Irid("#00f").desaturate().toHexString(), "#7f7f7f");
    assert.equal(new Irid("#ace").desaturate().toHexString(), "#cccccc");
  });

  test("contrast defaults", function() {
    let colour = new Irid("#fff").contrast();
    assert.equal(colour.toString(), "#000000");
    colour = new Irid("#000").contrast();
    assert.equal(colour.toString(), "#ffffff");
  });

  test("contrast with given light/dark values", function() {
    let colour = new Irid("#fff").contrast("#dddddd", "#222222");
    assert.equal(colour.toString(), "#222222");
    colour = new Irid("#000").contrast("#dddddd", "#222222");
    assert.equal(colour.toString(), "#dddddd");
  });

  test("contrast with pathologically dumb values", function() {
    const colour = new Irid("#aaaaaa").contrast("#ffffff", "#aaaaaa");
    assert.equal(colour.toString(), "#ffffff");
  });

  test("contrast uses luma", function() {
    let colour = new Irid("#3531ff").contrast();
    assert.equal(colour.toString(), "#ffffff");
    colour = new Irid("#d8ec00").contrast();
    assert.equal(colour.toString(), "#000000");
  });

  test("get red", function() {
    const colour = new Irid("#3531ff");
    assert.equal(colour.red(), 0x35);
  });

  test("get blue", function() {
    const colour = new Irid("#3531ff");
    assert.equal(colour.blue(), 0xff);
  });

  test("get green", function() {
    const colour = new Irid("#3531ff");
    assert.equal(colour.green(), 0x31);
  });

  test("set red", function() {
    const colour = new Irid("#3531ff");
    assert.equal(colour.red(128).toString(), "#8031ff");
  });

  test("set blue", function() {
    const colour = new Irid("#3531ff");
    assert.equal(colour.blue(128).toString(), "#353180");
  });

  test("set green", function() {
    const colour = new Irid("#3531ff");
    assert.equal(colour.green(128).toString(), "#3580ff");
  });
  test("get hue", function() {
    const colour = new Irid("#3531ff");
    assert.equal(colour.hue().toFixed(2), "0.67");
  });

  test("get saturation", function() {
    const colour = new Irid("#3531ff");
    assert.equal(colour.saturation().toFixed(2), "1.00");
  });

  test("get lightness", function() {
    const colour = new Irid("#3531ff");
    assert.equal(colour.lightness().toFixed(2), "0.60");
  });

  test("set hue", function() {
    const colour = new Irid("#3531ff");
    assert.equal(colour.hue(0.5).toString(), "#30ffff");
  });

  test("set saturation", function() {
    const colour = new Irid("#3531ff");
    assert.equal(colour.saturation(0.5).toString(), "#6664cb");
  });

  test("set lightness", function() {
    const colour = new Irid("#3531ff");
    assert.equal(colour.lightness(0.5).toString(), "#0400ff");
  });

  test("component values can assigned by string", function() {
    const colour = new Irid("black").green("101");
    assert.equal(colour.toString(), "#006500");
  });

  test("get alpha", function() {
    const colour = new Irid("#ffffff80");
    assert.equal(colour.alpha().toFixed(2), "0.50");
  });

  test("set alpha", function() {
    const colour = new Irid("#ffffff").alpha(0.5);
    assert.equal(colour.toString(), "#ffffff7f");
  });

  test("set alpha to null", function() {
    const colour = new Irid("#ffffff55").alpha(null);
    assert.equal(colour.toString(), "#ffffff");
  });

  test("set alpha to undefined", function() {
    const colour = new Irid("#ffffff55").alpha(undefined);
    assert.equal(colour.toString(), "#ffffff");
  });

  test("undefined alpha returned correctly", function() {
    assert.equal(Irid("#ffffff").alpha(), undefined);
  });

  test("analagous colours", function() {
    const c = new Irid("red"),
      anal = c.analagous();
    assert.equal(anal.length, 3);
    assert.equal(anal[0].toString(), "#ff0000");
    assert.equal(anal[1].toString(), "#ff007f");
    assert.equal(anal[2].toString(), "#ff7f00");
  });

  test("tetradic colours", function() {
    const c = new Irid("red"),
      tet = c.tetrad();
    assert.equal(tet.length, 4);
    assert.equal(tet[0].toString(), "#ff0000");
    assert.equal(tet[1].toString(), "#7fff00");
    assert.equal(tet[2].toString(), "#00ffff");
    assert.equal(tet[3].toString(), "#7f00ff");
  });

  test("rectangular tetradic colours", function() {
    const c = new Irid("red"),
      tet = c.rectTetrad();
    assert.equal(tet.length, 4);
    assert.equal(tet[0].toString(), "#ff0000");
    assert.equal(tet[1].toString(), "#ffff00");
    assert.equal(tet[2].toString(), "#00ffff");
    assert.equal(tet[3].toString(), "#0000ff");
  });

  test("triadic colours", function() {
    const c = new Irid("red"),
      tri = c.triad();
    assert.equal(tri.length, 3);
    assert.equal(tri[0].toString(), "#ff0000");
    assert.equal(tri[1].toString(), "#0000ff");
    assert.equal(tri[2].toString(), "#00ff00");
  });

  test("split complementary colours", function() {
    const c = new Irid("red"),
      comp = c.splitComplementary();
    assert.equal(comp.length, 3);
    assert.equal(comp[0].toString(), "#ff0000");
    assert.equal(comp[1].toString(), "#007fff");
    assert.equal(comp[2].toString(), "#00ff7f");
  });

  test("blending", function() {
    const white = new Irid("white"),
      black = new Irid("black"),
      blend = white.blend(black);
    assert.equal(blend.toString(), "#7f7f7f");
  });

  test("blending with opacity 0.25", function() {
    const white = new Irid("white"),
      black = new Irid("black"),
      blend = white.blend(black, 0.25);
    assert.equal(blend.toString(), "#bfbfbf");
  });

  test("blending with opacity 0.75", function() {
    const white = new Irid("white"),
      black = new Irid("black"),
      blend = white.blend(black, 0.75);
    assert.equal(blend.toString(), "#3f3f3f");
  });

  test("luma calculation", function() {
    assert.equal(
      Irid("#fff")
        .luma()
        .toFixed(2),
      (1).toFixed(2)
    );
    assert.equal(
      Irid("#f00")
        .luma()
        .toFixed(2),
      (0.3).toFixed(2)
    );
    assert.equal(
      Irid("#0f0")
        .luma()
        .toFixed(2),
      (0.59).toFixed(2)
    );
    assert.equal(
      Irid("#00f")
        .luma()
        .toFixed(2),
      (0.11).toFixed(2)
    );
    assert.equal(
      Irid("#ff0")
        .luma()
        .toFixed(2),
      (0.89).toFixed(2)
    );
    assert.equal(
      Irid("#0ff")
        .luma()
        .toFixed(2),
      (0.7).toFixed(2)
    );
    assert.equal(
      Irid("#f0f")
        .luma()
        .toFixed(2),
      (0.41).toFixed(2)
    );
  });

  test("relative luminance", function() {
    assert.equal(
      Irid("#fff")
        .relativeLuminance()
        .toFixed(2),
      (1).toFixed(2)
    );
    assert.equal(
      Irid("#000")
        .relativeLuminance()
        .toFixed(2),
      (0).toFixed(2)
    );
    assert.equal(
      Irid("#f00")
        .relativeLuminance()
        .toFixed(2),
      (0.21).toFixed(2)
    );
    assert.equal(
      Irid("#0f0")
        .relativeLuminance()
        .toFixed(2),
      (0.72).toFixed(2)
    );
    assert.equal(
      Irid("#00f")
        .relativeLuminance()
        .toFixed(2),
      (0.07).toFixed(2)
    );
    assert.equal(
      Irid("#ff0")
        .relativeLuminance()
        .toFixed(2),
      (0.93).toFixed(2)
    );
    assert.equal(
      Irid("#0ff")
        .relativeLuminance()
        .toFixed(2),
      (0.79).toFixed(2)
    );
    assert.equal(
      Irid("#f0f")
        .relativeLuminance()
        .toFixed(2),
      (0.28).toFixed(2)
    );
    assert.equal(
      Irid("#08f")
        .relativeLuminance()
        .toFixed(2),
      (0.25).toFixed(2)
    );
  });

  test("contrast ratio", function() {
    assert.equal(
      Irid("#fff")
        .contrastRatio("#000")
        .toFixed(2),
      (21).toFixed(2)
    );
    assert.equal(
      Irid("#000")
        .contrastRatio("#fff")
        .toFixed(2),
      (21).toFixed(2)
    );
    assert.equal(
      Irid("#f00")
        .contrastRatio("#000")
        .toFixed(2),
      (5.25).toFixed(2)
    );
    assert.equal(
      Irid("#0f0")
        .contrastRatio("#000")
        .toFixed(2),
      (15.3).toFixed(2)
    );
    assert.equal(
      Irid("#00f")
        .contrastRatio("#000")
        .toFixed(2),
      (2.44).toFixed(2)
    );
    assert.equal(
      Irid("#f00")
        .contrastRatio("#fff")
        .toFixed(2),
      (4).toFixed(2)
    );
    assert.equal(
      Irid("#0f0")
        .contrastRatio("#fff")
        .toFixed(2),
      (1.37).toFixed(2)
    );
    assert.equal(
      Irid("#00f")
        .contrastRatio("#fff")
        .toFixed(2),
      (8.59).toFixed(2)
    );
    assert.equal(
      Irid("#08f")
        .contrastRatio("#fff")
        .toFixed(2),
      (3.52).toFixed(2)
    );
  });

  test("bug: luma calculation on numbers that haven't been RGB initialised", function() {
    assert.equal(Irid("hsl(180, 50%, 0%)").luma(), 0);
  });

  test("bug: canInterpret should recognise CSS HSL strings", function() {
    assert.ok(Irid.canInterpret("hsl(180, 60%, 70%)"));
  });
});
