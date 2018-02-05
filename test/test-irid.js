/*global suite, test */

import chai from "chai";
import Irid from "../src/irid";

const assert = chai.assert;

suite("Irid", function() {
  test("from string (#fff)", function() {
    const color = new Irid("#fff");
    assert.equal(color.hue().toFixed(2), 0);
    assert.equal(color.saturation().toFixed(2), 0);
    assert.equal(color.lightness().toFixed(2), 1);
    assert.equal(color.a, undefined);
  });

  test("from string (#FFF)", function() {
    const color = new Irid("#FFF");
    assert.equal(color.hue().toFixed(2), 0);
    assert.equal(color.saturation().toFixed(2), 0);
    assert.equal(color.lightness().toFixed(2), 1);
    assert.equal(color.a, undefined);
  });

  test("from string (#000)", function() {
    const color = new Irid("#000");
    assert.equal(color.hue().toFixed(2), 0);
    assert.equal(color.saturation().toFixed(2), 0);
    assert.equal(color.lightness().toFixed(2), 0);
    assert.equal(color.a, undefined);
  });

  test("from invalid string (#yyy)", function() {
    let failed = false;
    try {
      Irid("#yyy");
    } catch (e) {
      assert.equal(e, "Invalid color specification");
      failed = true;
    } finally {
      assert.ok(failed, "An error was correctly raised");
    }
  });

  test("from Irid object", function() {
    let color = new Irid("#000");
    color = new Irid(color);
    assert.equal(color.hue().toFixed(2), 0);
    assert.equal(color.saturation().toFixed(2), 0);
    assert.equal(color.lightness().toFixed(2), 0);
    assert.equal(color.a, undefined);
  });

  test("from RGB object", function() {
    const c = Irid({ r: 255, g: 0, b: 0 });
    assert.equal(c.hue(), 0);
    assert.equal(c.saturation(), 1);
    assert.equal(c.lightness(), 0.5);
  });

  test("from named color", function() {
    const c = Irid("lightgoldenrodyellow");
    assert.equal(c.hue().toFixed(2), "0.17");
    assert.equal(c.saturation().toFixed(2), "0.80");
    assert.equal(c.lightness().toFixed(2), "0.90");
  });

  test("from named color (case insensitive)", function() {
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
      assert.equal(e, "Invalid color specification");
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
      assert.equal(e, "Invalid color specification");
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
      assert.equal(e, "Invalid color specification");
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
      assert.equal(e, "Invalid color specification");
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
      assert.equal(e, "Invalid color specification");
      failed = true;
    } finally {
      assert.ok(failed, "An error was correctly raised");
    }
  });

  test("lighten", function() {
    let color = new Irid("#000").lighten(0.5);
    assert.equal(color.hue().toFixed(2), 0);
    assert.equal(color.saturation().toFixed(2), 0);
    assert.equal(color.lightness().toFixed(2), 0.5);
    assert.equal(color.a, undefined);
    assert.equal(color.toHexString(), "#7f7f7f");
    color = new Irid({ h: 0, s: 0, l: 0.5 }).lighten(0.5);
    assert.equal(color.lightness().toFixed(2), 0.75);
  });

  test("darken", function() {
    const color = new Irid("#fff").darken(0.5);
    assert.equal(color.hue().toFixed(2), 0);
    assert.equal(color.saturation().toFixed(2), 0);
    assert.equal(color.lightness().toFixed(2), 0.5);
    assert.equal(color.a, undefined);
    assert.equal(color.toHexString(), "#7f7f7f");
  });

  test("invert", function() {
    let color = new Irid("#fff").invert();
    assert.equal(color.hue().toFixed(2), 0);
    assert.equal(color.saturation().toFixed(2), 0);
    assert.equal(color.lightness().toFixed(2), 0);
    color = new Irid("#000").invert();
    assert.equal(color.hue().toFixed(2), 0);
    assert.equal(color.hsl.s.toFixed(2), 0);
    assert.equal(color.lightness().toFixed(2), 1);
    assert.equal(new Irid("#f00").invert().toHexString(), "#00ffff");
    assert.equal(new Irid("#0f0").invert().toHexString(), "#ff00ff");
    assert.equal(new Irid("#00f").invert().toHexString(), "#ffff00");
    assert.equal(new Irid("#ace").invert().toHexString(), "#553311");
  });

  test("complement", function() {
    let color = new Irid("#fff").complement();
    assert.equal(color.hue().toFixed(2), 0.5);
    assert.equal(color.hsl.s.toFixed(2), 0);
    assert.equal(color.lightness().toFixed(2), 1);
    color = new Irid("#000").complement();
    assert.equal(color.hue().toFixed(2), 0.5);
    assert.equal(color.hsl.s.toFixed(2), 0);
    assert.equal(color.lightness().toFixed(2), 0);
    assert.equal(new Irid("#f00").complement().toHexString(), "#00ffff");
    assert.equal(new Irid("#0f0").complement().toHexString(), "#ff00ff");
    assert.equal(new Irid("#00f").complement().toHexString(), "#fffe00");
    assert.equal(new Irid("#ace").complement().toHexString(), "#eeccaa");
  });

  test("desaturate", function() {
    let color = new Irid("#fff").desaturate();
    assert.equal(color.hue().toFixed(2), 0);
    assert.equal(color.hsl.s.toFixed(2), 0);
    assert.equal(color.lightness().toFixed(2), 1);
    color = new Irid("#000").desaturate();
    assert.equal(color.hue().toFixed(2), 0);
    assert.equal(color.hsl.s.toFixed(2), 0);
    assert.equal(color.lightness().toFixed(2), 0);
    assert.equal(new Irid("#f00").desaturate().toHexString(), "#7f7f7f");
    assert.equal(new Irid("#0f0").desaturate().toHexString(), "#7f7f7f");
    assert.equal(new Irid("#00f").desaturate().toHexString(), "#7f7f7f");
    assert.equal(new Irid("#ace").desaturate().toHexString(), "#cccccc");
  });

  test("contrast defaults", function() {
    let color = new Irid("#fff").contrast();
    assert.equal(color.toString(), "#000000");
    color = new Irid("#000").contrast();
    assert.equal(color.toString(), "#ffffff");
  });

  test("contrast with given light/dark values", function() {
    let color = new Irid("#fff").contrast("#dddddd", "#222222");
    assert.equal(color.toString(), "#222222");
    color = new Irid("#000").contrast("#dddddd", "#222222");
    assert.equal(color.toString(), "#dddddd");
  });

  test("contrast with pathologically dumb values", function() {
    const color = new Irid("#aaaaaa").contrast("#ffffff", "#aaaaaa");
    assert.equal(color.toString(), "#ffffff");
  });

  test("contrast uses luma", function() {
    let color = new Irid("#3531ff").contrast();
    assert.equal(color.toString(), "#ffffff");
    color = new Irid("#d8ec00").contrast();
    assert.equal(color.toString(), "#000000");
  });

  test("get red", function() {
    const color = new Irid("#3531ff");
    assert.equal(color.red(), 0x35);
  });

  test("get blue", function() {
    const color = new Irid("#3531ff");
    assert.equal(color.blue(), 0xff);
  });

  test("get green", function() {
    const color = new Irid("#3531ff");
    assert.equal(color.green(), 0x31);
  });

  test("set red", function() {
    const color = new Irid("#3531ff");
    assert.equal(color.red(128).toString(), "#8031ff");
  });

  test("set blue", function() {
    const color = new Irid("#3531ff");
    assert.equal(color.blue(128).toString(), "#353180");
  });

  test("set green", function() {
    const color = new Irid("#3531ff");
    assert.equal(color.green(128).toString(), "#3580ff");
  });
  test("get hue", function() {
    const color = new Irid("#3531ff");
    assert.equal(color.hue().toFixed(2), "0.67");
  });

  test("get saturation", function() {
    const color = new Irid("#3531ff");
    assert.equal(color.saturation().toFixed(2), "1.00");
  });

  test("get lightness", function() {
    const color = new Irid("#3531ff");
    assert.equal(color.lightness().toFixed(2), "0.60");
  });

  test("set hue", function() {
    const color = new Irid("#3531ff");
    assert.equal(color.hue(0.5).toString(), "#30ffff");
  });

  test("set saturation", function() {
    const color = new Irid("#3531ff");
    assert.equal(color.saturation(0.5).toString(), "#6664cb");
  });

  test("set lightness", function() {
    const color = new Irid("#3531ff");
    assert.equal(color.lightness(0.5).toString(), "#0400ff");
  });

  test("component values can assigned by string", function() {
    const color = new Irid("black").green("101");
    assert.equal(color.toString(), "#006500");
  });

  test("get alpha", function() {
    const color = new Irid("#ffffff80");
    assert.equal(color.alpha().toFixed(2), "0.50");
  });

  test("set alpha", function() {
    const color = new Irid("#ffffff").alpha(0.5);
    assert.equal(color.toString(), "#ffffff7f");
  });

  test("set alpha to null", function() {
    const color = new Irid("#ffffff55").alpha(null);
    assert.equal(color.toString(), "#ffffff");
  });

  test("set alpha to undefined", function() {
    const color = new Irid("#ffffff55").alpha(undefined);
    assert.equal(color.toString(), "#ffffff");
  });

  test("undefined alpha returned correctly", function() {
    assert.equal(Irid("#ffffff").alpha(), undefined);
  });

  test("get opacity", function() {
    const color = new Irid("#ffffff80");
    assert.equal(color.opacity().toFixed(2), "0.50");
  });

  test("set opacity", function() {
    const color = new Irid("#ffffff").opacity(0.5);
    assert.equal(color.toString(), "#ffffff7f");
  });

  test("set opacity to null", function() {
    const color = new Irid("#ffffff55").opacity(null);
    assert.equal(color.toString(), "#ffffff");
  });

  test("set opacity to undefined", function() {
    const color = new Irid("#ffffff55").opacity(undefined);
    assert.equal(color.toString(), "#ffffff");
  });

  test("undefined opacity returned correctly", function() {
    assert.equal(Irid("#ffffff").opacity(), undefined);
  });

  test("analagous colors", function() {
    const c = new Irid("red"),
      anal = c.analagous();
    assert.equal(anal.length, 3);
    assert.equal(anal[0].toString(), "#ff0000");
    assert.equal(anal[1].toString(), "#ff007f");
    assert.equal(anal[2].toString(), "#ff7f00");
  });

  test("tetradic colors", function() {
    const c = new Irid("red"),
      tet = c.tetrad();
    assert.equal(tet.length, 4);
    assert.equal(tet[0].toString(), "#ff0000");
    assert.equal(tet[1].toString(), "#7fff00");
    assert.equal(tet[2].toString(), "#00ffff");
    assert.equal(tet[3].toString(), "#7f00ff");
  });

  test("rectangular tetradic colors", function() {
    const c = new Irid("red"),
      tet = c.rectTetrad();
    assert.equal(tet.length, 4);
    assert.equal(tet[0].toString(), "#ff0000");
    assert.equal(tet[1].toString(), "#ffff00");
    assert.equal(tet[2].toString(), "#00ffff");
    assert.equal(tet[3].toString(), "#0000ff");
  });

  test("triadic colors", function() {
    const c = new Irid("red"),
      tri = c.triad();
    assert.equal(tri.length, 3);
    assert.equal(tri[0].toString(), "#ff0000");
    assert.equal(tri[1].toString(), "#0000ff");
    assert.equal(tri[2].toString(), "#00ff00");
  });

  test("split complementary colors", function() {
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

  suite("luma calculation", function() {
    [
      ["#fff", 1],
      ["#f00", 0.3],
      ["#0f0", 0.59],
      ["#00f", 0.11],
      ["#ff0", 0.89],
      ["#0ff", 0.7],
      ["#f0f", 0.41]
    ].forEach(([color, expectedLuma]) => {
      test(color, function() {
        assert.equal(
          Irid(color)
            .luma()
            .toFixed(2),
          expectedLuma.toFixed(2)
        );
      });
    });
  });

  suite("set luma", function() {
    const colors = [
      "#fff",
      "#f00",
      "#0f0",
      "#00f",
      "#660",
      "#066",
      "#606",
      "#600",
      "#060",
      "#006"
    ];
    const expectedLumas = [1, 0.9, 0.7, 0.5, 0.3, 0.1, 0];
    colors.forEach(color => {
      expectedLumas.forEach(luma => {
        test(`set luma of ${color} to ${luma}`, function() {
          assert.equal(
            Irid(color)
              .luma(luma)
              .luma()
              .toFixed(2),
            luma.toFixed(2)
          );
        });
      });
    });
  });

  test("set luma", function() {
    const expectedLuma = 0.7;
    const color1 = Irid("#123");
    const color2 = color1.luma(expectedLuma);
    const luma = color2.luma();
    assert.equal(luma.toFixed(2), expectedLuma.toFixed(2));
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
