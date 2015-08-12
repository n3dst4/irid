/*global require */

if (typeof require !== "undefined") {
    if (typeof QUnit == 'undefined') {
        var QUnit = require('qunit-cli');
    }
    var Colour = require("../colour.js");
}










QUnit.module("functions");




QUnit.test("hexToRGB (6 digits)", function (assert) {
    var rgb = Colour.hexToRGB("#0088ff");
    assert.equal( rgb.r, 0 );
    assert.equal( rgb.g, 136 );
    assert.equal( rgb.b, 255 );
    assert.equal( rgb.a, undefined );
});




QUnit.test("hexToRGB (8 digits)", function (assert) {
    var rgb = Colour.hexToRGB("#0088ff7f");
    assert.equal( rgb.r, 0 );
    assert.equal( rgb.g, 136 );
    assert.equal( rgb.b, 255 );
    assert.equal( rgb.a.toFixed(1), 0.5 );
});

QUnit.test("hexToRGB (3 digits)", function (assert) {
    var rgb = Colour.hexToRGB("#08f");
    assert.equal( rgb.r, 0 );
    assert.equal( rgb.g, 136 );
    assert.equal( rgb.b, 255 );
    assert.equal( rgb.a, undefined );
});

QUnit.test("hexToRGB (4 digits)", function (assert) {
    var rgb = Colour.hexToRGB("#08f8");
    assert.equal( rgb.r, 0 );
    assert.equal( rgb.g, 136 );
    assert.equal( rgb.b, 255 );
    assert.equal( rgb.a.toFixed(1), 0.5 );
});

QUnit.test("simple rgb", function (assert) {
    var rgb = Colour.cssRGBToRGB("rgb(0, 136, 255)");
    assert.equal( rgb.r, 0 );
    assert.equal( rgb.g, 136 );
    assert.equal( rgb.b, 255 );
    assert.equal( rgb.a, undefined );
});

QUnit.test("rgb with percent", function (assert) {
    var rgb = Colour.cssRGBToRGB("rgb(0%, 50%, 100%)");
    assert.equal( rgb.r, 0 );
    assert.equal( rgb.g, 127 );
    assert.equal( rgb.b, 255 );
    assert.equal( rgb.a, undefined );
});

QUnit.test("rgba", function (assert) {
    var rgb = Colour.cssRGBToRGB("rgba(0, 136, 255, 0.7)");
    assert.equal( rgb.r, 0 );
    assert.equal( rgb.g, 136 );
    assert.equal( rgb.b, 255 );
    assert.equal( rgb.a, 0.7 );
});

QUnit.test("hsl", function (assert) {
    var hsl = Colour.cssHSLToHSL("hsl(180, 60%, 70%)");
    assert.equal( hsl.h, 0.5 );
    assert.equal( hsl.s, 0.6 );
    assert.equal( hsl.l, 0.7 );
    assert.equal( hsl.a, undefined );
});

QUnit.test("hsla", function (assert) {
    var hsl = Colour.cssHSLToHSL("hsl(180, 60%, 70%, 0.8)");
    assert.equal( hsl.h, 0.5 );
    assert.equal( hsl.s, 0.6 );
    assert.equal( hsl.l, 0.7 );
    assert.equal( hsl.a, 0.8 );
});

QUnit.test("rgbToCSSRGB", function (assert) {
    assert.equal( Colour.rgbToCSSRGB({r: 0, g: 136, b: 255 }), "rgb(0, 136, 255)" );
});

QUnit.test("rgbToCSSRGB with alpha", function (assert) {
    assert.equal( Colour.rgbToCSSRGB({r: 0, g: 136, b: 255, a: 0.7 }), "rgba(0, 136, 255, 0.70)" );
});

QUnit.test("hslToCSSHSL", function (assert) {
    assert.equal( Colour.hslToCSSHSL({h: 0.5, s: 0.6, l: 0.7}), "hsl(180, 60%, 70%)" );
});

QUnit.test("hslToCSSHSL with alpha", function (assert) {
    assert.equal( Colour.hslToCSSHSL({h: 0.5, s: 0.6, l: 0.7, a: 0.8}), "hsla(180, 60%, 70%, 0.80)" );
});

QUnit.test("rgbToHex", function (assert) {
    assert.equal( Colour.rgbToHex({r: 0, g: 136, b: 255 }), "#0088ff" );
});

QUnit.test("rgbToHex with alpha", function (assert) {
    assert.equal( Colour.rgbToHex({r: 0, g: 136, b: 255, a: 0.5 }), "#0088ff7f" );
});

QUnit.test("hslToRGB", function (assert) {
    var rgb = Colour.hslToRGB({ h: 147/255, s: 1, l: 128/255 })
    assert.equal( rgb.r , 0 );
    assert.equal( rgb.g , 138 );
    assert.equal( rgb.b , 255 );
    assert.equal( rgb.a , undefined );
});

QUnit.test("hslToRGB with alpha", function (assert) {
    var rgb = Colour.hslToRGB({ h: 147/255, s: 1, l: 128/255, a: 0.5 })
    assert.equal( rgb.r , 0 );
    assert.equal( rgb.g , 138 );
    assert.equal( rgb.b , 255 );
    assert.equal( rgb.a , 0.5 );
});

QUnit.test("hslToRGB (white)", function (assert) {
    var rgb = Colour.hslToRGB({ h: 0, s: 1, l: 1 })
    assert.equal( rgb.r , 255 );
    assert.equal( rgb.g , 255 );
    assert.equal( rgb.b , 255 );
    assert.equal( rgb.a , undefined );
});

QUnit.test("hslToRGB (hue=1)", function (assert) {
    var rgb = Colour.hslToRGB({ h: 1, s: 1, l: 0.5 })
    assert.equal( rgb.r , 255 );
    assert.equal( rgb.g , 0 );
    assert.equal( rgb.b , 0 );
    assert.equal( rgb.a , undefined );
});

QUnit.test("hslToRGB (negative hue)", function (assert) {
    var rgb = Colour.hslToRGB({ h: -0.25, s: 1, l: 0.5 })
    assert.equal( rgb.r , 127 );
    assert.equal( rgb.g , 0 );
    assert.equal( rgb.b , 255 );
    assert.equal( rgb.a , undefined );
});

QUnit.test("rgbToHSL", function (assert) {
    var hsl = Colour.rgbToHSL({ r: 0, g: 138, b: 255 })
    assert.equal( hsl.h.toFixed(2) , (147/255).toFixed(2) );
    assert.equal( hsl.s.toFixed(2) , 1 );
    assert.equal( hsl.l.toFixed(2) , (128/255).toFixed(2) );
    assert.equal( hsl.a , undefined );
});

QUnit.test("rgbToHSL", function (assert) {
    var hsl = Colour.rgbToHSL({ r: 0, g: 138, b: 255, a: 0.5 })
    assert.equal( hsl.h.toFixed(2) , (147/255).toFixed(2) );
    assert.equal( hsl.s.toFixed(2) , 1 );
    assert.equal( hsl.l.toFixed(2) , (128/255).toFixed(2) );
    assert.equal( hsl.a , 0.5 );
});

QUnit.test("rgbToHSL (white)", function (assert) {
    var hsl = Colour.rgbToHSL({ r: 255, g: 255, b: 255 })
    assert.equal( hsl.h.toFixed(2) , 0 );
    assert.equal( hsl.s.toFixed(2) , 0 );
    assert.equal( hsl.l.toFixed(2) , 1 );
    assert.equal( hsl.a , undefined );
});


////////////////////////////////////////////////////////////////////////////////
QUnit.module("Colour");

QUnit.test("from string (#fff)", function (assert) {
    var colour = new Colour("#fff");
    assert.equal( colour.hue().toFixed(2) , 0 );
    assert.equal( colour.saturation().toFixed(2) , 0 );
    assert.equal( colour.lightness().toFixed(2) , 1 );
    assert.equal( colour.a , undefined );
});

QUnit.test("from string (#FFF)", function (assert) {
    var colour = new Colour("#FFF");
    assert.equal( colour.hue().toFixed(2) , 0 );
    assert.equal( colour.saturation().toFixed(2) , 0 );
    assert.equal( colour.lightness().toFixed(2) , 1 );
    assert.equal( colour.a , undefined );
});

QUnit.test("from string (#000)", function (assert) {
    var colour = new Colour("#000");
    assert.equal( colour.hue().toFixed(2) , 0 );
    assert.equal( colour.saturation().toFixed(2) , 0 );
    assert.equal( colour.lightness().toFixed(2) , 0 );
    assert.equal( colour.a , undefined );
});

QUnit.test("from invalid string (#yyy)", function (assert) {
    var failed = false;
    QUnit.expect(2);
    try {
        Colour("#yyy");
    }
    catch (e) {
        assert.equal(e, "Invalid colour specification");
        failed = true;
    }
    finally {
        assert.ok(failed, "An error was correctly raised");
    }
});

QUnit.test("from Colour object", function (assert) {
    var colour = new Colour("#000");
    colour = new Colour(colour);
    assert.equal( colour.hue().toFixed(2) , 0 );
    assert.equal( colour.saturation().toFixed(2) , 0 );
    assert.equal( colour.lightness().toFixed(2) , 0 );
    assert.equal( colour.a , undefined );
});

QUnit.test("from RGB object", function (assert) {
    var c = Colour({r: 255, g: 0, b:0});
    assert.equal(c.hue(), 0);
    assert.equal(c.saturation(), 1);
    assert.equal(c.lightness(), 0.5);
});

QUnit.test("from named colour", function (assert) {
    var c = Colour("lightgoldenrodyellow");
    assert.equal(c.hue().toFixed(2), "0.17");
    assert.equal(c.saturation().toFixed(2), "0.80");
    assert.equal(c.lightness().toFixed(2), "0.90");
});

QUnit.test("from named colour (case insensitive)", function (assert) {
    var c = Colour("LightGoldenrodYellow");
    assert.equal(c.hue().toFixed(2), "0.17");
    assert.equal(c.saturation().toFixed(2), "0.80");
    assert.equal(c.lightness().toFixed(2), "0.90");
});

QUnit.test("from undefined", function (assert) {
    var failed = false;
    QUnit.expect(2);
    try {
        Colour(undefined);
    }
    catch (e) {
        assert.equal(e, "Invalid colour specification");
        failed = true;
    }
    finally {
        assert.ok(failed, "An error was correctly raised");
    }
});

QUnit.test("from gibberish", function (assert) {
    var failed = false;
    QUnit.expect(2);
    try {
        Colour("ThisIsDefinitelyNotTheNameOfAColour");
    }
    catch (e) {
        assert.equal(e, "Invalid colour specification");
        failed = true;
    }
    finally {
        assert.ok(failed, "An error was correctly raised");
    }
});

QUnit.test("from null", function (assert) {
    var failed = false;
    QUnit.expect(2);
    try {
        Colour(null);
    }
    catch (e) {
        assert.equal(e, "Invalid colour specification");
        failed = true;
    }
    finally {
        assert.ok(failed, "An error was correctly raised");
    }
});

QUnit.test("from NaN", function (assert) {
    var failed = false;
    QUnit.expect(2);
    try {
        Colour(NaN);
    }
    catch (e) {
        assert.equal(e, "Invalid colour specification");
        failed = true;
    }
    finally {
        assert.ok(failed, "An error was correctly raised");
    }
});

QUnit.test("from malformed hex code", function (assert) {
    var failed = false;
    QUnit.expect(2);
    try { Colour("#ab"); }
    catch (e) {
        assert.equal(e, "Invalid colour specification");
        failed = true;
    }
    finally { assert.ok(failed, "An error was correctly raised"); }
});

QUnit.test("lighten", function (assert) {
    var colour = new Colour("#000").lighten(0.5);
    assert.equal( colour.hue().toFixed(2) , 0 );
    assert.equal( colour.saturation().toFixed(2) , 0 );
    assert.equal( colour.lightness().toFixed(2) , 0.5 );
    assert.equal( colour.a , undefined );
    assert.equal( colour.toHexString() , "#7f7f7f");
    colour = new Colour({h: 0, s: 0, l: 0.5}).lighten(0.5);
    assert.equal( colour.lightness().toFixed(2) , 0.75 );
});

QUnit.test("darken", function (assert) {
    var colour = new Colour("#fff").darken(0.5);
    assert.equal( colour.hue().toFixed(2) , 0 );
    assert.equal( colour.saturation().toFixed(2) , 0 );
    assert.equal( colour.lightness().toFixed(2) , 0.5 );
    assert.equal( colour.a , undefined );
    assert.equal( colour.toHexString() , "#7f7f7f");
});

QUnit.test("invert", function (assert) {
    var colour = new Colour("#fff").invert();
    assert.equal( colour.hue().toFixed(2) , 0 );
    assert.equal( colour.saturation().toFixed(2) , 0 );
    assert.equal( colour.lightness().toFixed(2) , 0 );
    colour = new Colour("#000").invert();
    assert.equal( colour.hue().toFixed(2) , 0 );
    assert.equal( colour.hsl.s.toFixed(2) , 0 );
    assert.equal( colour.lightness().toFixed(2) , 1 );
    assert.equal( new Colour("#f00").invert().toHexString(), "#00ffff");
    assert.equal( new Colour("#0f0").invert().toHexString(), "#ff00ff");
    assert.equal( new Colour("#00f").invert().toHexString(), "#ffff00");
    assert.equal( new Colour("#ace").invert().toHexString(), "#553311");
});

QUnit.test("complement", function (assert) {
    var colour = new Colour("#fff").complement();
    assert.equal( colour.hue().toFixed(2) , 0.5 );
    assert.equal( colour.hsl.s.toFixed(2) , 0 );
    assert.equal( colour.lightness().toFixed(2) , 1 );
    colour = new Colour("#000").complement();
    assert.equal( colour.hue().toFixed(2) , 0.5 );
    assert.equal( colour.hsl.s.toFixed(2) , 0 );
    assert.equal( colour.lightness().toFixed(2) , 0 );
    assert.equal( new Colour("#f00").complement().toHexString(), "#00ffff");
    assert.equal( new Colour("#0f0").complement().toHexString(), "#ff00ff");
    assert.equal( new Colour("#00f").complement().toHexString(), "#fffe00");
    assert.equal( new Colour("#ace").complement().toHexString(), "#eeccaa");
});

QUnit.test("desaturate", function (assert) {
    var colour = new Colour("#fff").desaturate();
    assert.equal( colour.hue().toFixed(2) , 0 );
    assert.equal( colour.hsl.s.toFixed(2) , 0 );
    assert.equal( colour.lightness().toFixed(2) , 1 );
    colour = new Colour("#000").desaturate();
    assert.equal( colour.hue().toFixed(2) , 0 );
    assert.equal( colour.hsl.s.toFixed(2) , 0 );
    assert.equal( colour.lightness().toFixed(2) , 0 );
    assert.equal( new Colour("#f00").desaturate().toHexString(), "#7f7f7f");
    assert.equal( new Colour("#0f0").desaturate().toHexString(), "#7f7f7f");
    assert.equal( new Colour("#00f").desaturate().toHexString(), "#7f7f7f");
    assert.equal( new Colour("#ace").desaturate().toHexString(), "#cccccc");
});


QUnit.test("contrast", function (assert) {
    var colour = new Colour("#fff").contrast();
    assert.equal(colour.toString(), "#111111");
    colour = new Colour("#000").contrast();
    assert.equal(colour.toString(), "#eeeeee");
});

QUnit.test("contrast uses luma", function (assert) {
    var colour = new Colour("#3531ff").contrast();
    assert.equal(colour.toString(), "#eeeeee");
    colour = new Colour("#d8ec00").contrast();
    assert.equal(colour.toString(), "#111111");
});

QUnit.test("get red", function (assert) {
    var colour = new Colour("#3531ff");
    assert.equal(colour.red(), 0x35);
});

QUnit.test("get blue", function (assert) {
    var colour = new Colour("#3531ff");
    assert.equal(colour.blue(), 0xff);
});

QUnit.test("get green", function (assert) {
    var colour = new Colour("#3531ff");
    assert.equal(colour.green(), 0x31);
});

QUnit.test("set red", function (assert) {
    var colour = new Colour("#3531ff");
    assert.equal(colour.red(128).toString(), "#8031ff");
});

QUnit.test("set blue", function (assert) {
    var colour = new Colour("#3531ff");
    assert.equal(colour.blue(128).toString(), "#353180");
});

QUnit.test("set green", function (assert) {
    var colour = new Colour("#3531ff");
    assert.equal(colour.green(128).toString(), "#3580ff");
});
QUnit.test("get hue", function (assert) {
    var colour = new Colour("#3531ff");
    assert.equal(colour.hue().toFixed(2), "0.67");
});

QUnit.test("get saturation", function (assert) {
    var colour = new Colour("#3531ff");
    assert.equal(colour.saturation().toFixed(2), "1.00");
});

QUnit.test("get lightness", function (assert) {
    var colour = new Colour("#3531ff");
    assert.equal(colour.lightness().toFixed(2), "0.60");
});

QUnit.test("set hue", function (assert) {
    var colour = new Colour("#3531ff");
    assert.equal(colour.hue(0.5).toString(), "#30ffff");
});

QUnit.test("set saturation", function (assert) {
    var colour = new Colour("#3531ff");
    assert.equal(colour.saturation(0.5).toString(), "#6664cb");
});

QUnit.test("set lightness", function (assert) {
    var colour = new Colour("#3531ff");
    assert.equal(colour.lightness(0.5).toString(), "#0400ff");
});

QUnit.test("component values can assigned by string", function (assert) {
    var colour = new Colour("black").green("101");
    assert.equal(colour.toString(), "#006500");
});

QUnit.test("get alpha", function (assert) {
    var colour = new Colour("#ffffff80");
    assert.equal(colour.alpha().toFixed(2), "0.50");
});

QUnit.test("set alpha", function (assert) {
    var colour = new Colour("#ffffff").alpha(0.5);
    assert.equal(colour.toString(), "#ffffff7f");
});

QUnit.test("set alpha to null", function (assert) {
    var colour = new Colour("#ffffff55").alpha(null);
    assert.equal(colour.toString(), "#ffffff");
});

QUnit.test("set alpha to undefined", function (assert) {
    var colour = new Colour("#ffffff55").alpha(undefined);
    assert.equal(colour.toString(), "#ffffff");
});

QUnit.test("undefined alpha returned correctly", function (assert) {
    assert.equal(Colour("#ffffff").alpha(), undefined);
});

QUnit.test("analagous colours", function (assert) {
    var c = new Colour("red"),
        anal = c.analagous();
    assert.equal(anal.length, 3);
    assert.equal(anal[0].toString(), "#ff0000");
    assert.equal(anal[1].toString(), "#ff007f");
    assert.equal(anal[2].toString(), "#ff7f00");
});

QUnit.test("tetradic colours", function (assert) {
    var c = new Colour("red"),
        tet = c.tetrad();
    assert.equal(tet.length, 4);
    assert.equal(tet[0].toString(), "#ff0000");
    assert.equal(tet[1].toString(), "#7fff00");
    assert.equal(tet[2].toString(), "#00ffff");
    assert.equal(tet[3].toString(), "#7f00ff");
});

QUnit.test("rectangular tetradic colours", function (assert) {
    var c = new Colour("red"),
        tet = c.rectTetrad();
    assert.equal(tet.length, 4);
    assert.equal(tet[0].toString(), "#ff0000");
    assert.equal(tet[1].toString(), "#ffff00");
    assert.equal(tet[2].toString(), "#00ffff");
    assert.equal(tet[3].toString(), "#0000ff");
});

QUnit.test("triadic colours", function (assert) {
    var c = new Colour("red"),
        tri = c.triad();
    assert.equal(tri.length, 3);
    assert.equal(tri[0].toString(), "#ff0000");
    assert.equal(tri[1].toString(), "#0000ff");
    assert.equal(tri[2].toString(), "#00ff00");
});

QUnit.test("split complementary colours", function (assert) {
    var c = new Colour("red"),
        comp = c.splitComplementary();
    assert.equal(comp.length, 3);
    assert.equal(comp[0].toString(), "#ff0000");
    assert.equal(comp[1].toString(), "#007fff");
    assert.equal(comp[2].toString(), "#00ff7f");
});

QUnit.test("blending", function (assert) {
    var white = new Colour("white"),
        black = new Colour("black"),
        blend = white.blend(black);
    assert.equal(blend.toString(), "#7f7f7f");
});

QUnit.test("blending with opacity 0.25", function (assert) {
    var white = new Colour("white"),
        black = new Colour("black"),
        blend = white.blend(black, 0.25);
    assert.equal(blend.toString(), "#bfbfbf");
});

QUnit.test("blending with opacity 0.75", function (assert) {
    var white = new Colour("white"),
        black = new Colour("black"),
        blend = white.blend(black, 0.75);
    assert.equal(blend.toString(), "#3f3f3f");
});
