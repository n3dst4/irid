////////////////////////////////////////////////////////////////////////////////
module("functions");

test("hexToRGB (6 digits)", function() {
    var rgb = Colour.hexToRGB("#0088ff");
    equals( rgb.r, 0 );
    equals( rgb.g, 136 );
    equals( rgb.b, 255 );
    equals( rgb.a, undefined );
});

test("hexToRGB (8 digits)", function() {
    var rgb = Colour.hexToRGB("#0088ff7f");
    equals( rgb.r, 0 );
    equals( rgb.g, 136 );
    equals( rgb.b, 255 );
    equals( rgb.a.toFixed(1), 0.5 );
});

test("hexToRGB (3 digits)", function() {
    var rgb = Colour.hexToRGB("#08f");
    equals( rgb.r, 0 );
    equals( rgb.g, 136 );
    equals( rgb.b, 255 );
    equals( rgb.a, undefined );
});

test("hexToRGB (4 digits)", function() {
    var rgb = Colour.hexToRGB("#08f8");
    equals( rgb.r, 0 );
    equals( rgb.g, 136 );
    equals( rgb.b, 255 );
    equals( rgb.a.toFixed(1), 0.5 );
});

test("simple rgb", function() {
    var rgb = Colour.cssRGBToRGB("rgb(0, 136, 255)");
    equals( rgb.r, 0 );
    equals( rgb.g, 136 );
    equals( rgb.b, 255 );
    equals( rgb.a, undefined );
});

test("rgb with percent", function() {
    var rgb = Colour.cssRGBToRGB("rgb(0%, 50%, 100%)");
    equals( rgb.r, 0 );
    equals( rgb.g, 127 );
    equals( rgb.b, 255 );
    equals( rgb.a, undefined );
});

test("rgba", function() {
    var rgb = Colour.cssRGBToRGB("rgba(0, 136, 255, 0.7)");
    equals( rgb.r, 0 );
    equals( rgb.g, 136 );
    equals( rgb.b, 255 );
    equals( rgb.a, 0.7 );
});

test("hsl", function() {
    var hsl = Colour.cssHSLToHSL("hsl(180, 60%, 70%)");
    equals( hsl.h, 0.5 );
    equals( hsl.s, 0.6 );
    equals( hsl.l, 0.7 );
    equals( hsl.a, undefined );
});

test("hsla", function() {
    var hsl = Colour.cssHSLToHSL("hsl(180, 60%, 70%, 0.8)");
    equals( hsl.h, 0.5 );
    equals( hsl.s, 0.6 );
    equals( hsl.l, 0.7 );
    equals( hsl.a, 0.8 );
});

test("rgbToCSSRGB", function() {
    equals( Colour.rgbToCSSRGB({r: 0, g: 136, b: 255 }), "rgb(0, 136, 255)" );
});

test("rgbToCSSRGB with alpha", function() {
    equals( Colour.rgbToCSSRGB({r: 0, g: 136, b: 255, a: 0.7 }), "rgba(0, 136, 255, 0.70)" );
});

test("hslToCSSHSL", function() {
    equals( Colour.hslToCSSHSL({h: 0.5, s: 0.6, l: 0.7}), "hsl(180, 60%, 70%)" );
});

test("hslToCSSHSL with alpha", function() {
    equals( Colour.hslToCSSHSL({h: 0.5, s: 0.6, l: 0.7, a: 0.8}), "hsla(180, 60%, 70%, 0.80)" );
});

test("rgbToHex", function() {
    equals( Colour.rgbToHex({r: 0, g: 136, b: 255 }), "#0088ff" );
});

test("rgbToHex with alpha", function() {
    equals( Colour.rgbToHex({r: 0, g: 136, b: 255, a: 0.5 }), "#0088ff7f" );
});

test("hslToRGB", function() {
    var rgb = Colour.hslToRGB({ h: 147/255, s: 1, l: 128/255 })
    equals( rgb.r , 0 );
    equals( rgb.g , 138 );
    equals( rgb.b , 255 );
    equals( rgb.a , undefined );
});

test("hslToRGB with alpha", function() {
    var rgb = Colour.hslToRGB({ h: 147/255, s: 1, l: 128/255, a: 0.5 })
    equals( rgb.r , 0 );
    equals( rgb.g , 138 );
    equals( rgb.b , 255 );
    equals( rgb.a , 0.5 );
});

test("hslToRGB (white)", function() {
    var rgb = Colour.hslToRGB({ h: 0, s: 1, l: 1 })
    equals( rgb.r , 255 );
    equals( rgb.g , 255 );
    equals( rgb.b , 255 );
    equals( rgb.a , undefined ); 
});

test("hslToRGB (hue=1)", function() {
    var rgb = Colour.hslToRGB({ h: 1, s: 1, l: 0.5 })
    equals( rgb.r , 255 );
    equals( rgb.g , 0 );
    equals( rgb.b , 0 );
    equals( rgb.a , undefined ); 
});

test("hslToRGB (negative hue)", function() {
    var rgb = Colour.hslToRGB({ h: -0.25, s: 1, l: 0.5 })
    equals( rgb.r , 127 );
    equals( rgb.g , 0 );
    equals( rgb.b , 255 );
    equals( rgb.a , undefined ); 
});

test("rgbToHSL", function() {
    var hsl = Colour.rgbToHSL({ r: 0, g: 138, b: 255 })
    equals( hsl.h.toFixed(2) , (147/255).toFixed(2) );
    equals( hsl.s.toFixed(2) , 1 );
    equals( hsl.l.toFixed(2) , (128/255).toFixed(2) );
    equals( hsl.a , undefined );
});

test("rgbToHSL", function() {
    var hsl = Colour.rgbToHSL({ r: 0, g: 138, b: 255, a: 0.5 })
    equals( hsl.h.toFixed(2) , (147/255).toFixed(2) );
    equals( hsl.s.toFixed(2) , 1 );
    equals( hsl.l.toFixed(2) , (128/255).toFixed(2) );
    equals( hsl.a , 0.5 );
});

test("rgbToHSL (white)", function() {
    var hsl = Colour.rgbToHSL({ r: 255, g: 255, b: 255 })
    equals( hsl.h.toFixed(2) , 0 );
    equals( hsl.s.toFixed(2) , 0 );
    equals( hsl.l.toFixed(2) , 1 );
    equals( hsl.a , undefined );
});


////////////////////////////////////////////////////////////////////////////////
module("Colour");

test("from string (#fff)", function() {
    var colour = new Colour("#fff");
    equals( colour.hue().toFixed(2) , 0 );
    equals( colour.saturation().toFixed(2) , 0 );
    equals( colour.lightness().toFixed(2) , 1 );
    equals( colour.a , undefined );
});

test("from string (#FFF)", function() {
    var colour = new Colour("#FFF");
    equals( colour.hue().toFixed(2) , 0 );
    equals( colour.saturation().toFixed(2) , 0 );
    equals( colour.lightness().toFixed(2) , 1 );
    equals( colour.a , undefined );
});

test("from string (#000)", function() {
    var colour = new Colour("#000");
    equals( colour.hue().toFixed(2) , 0 );
    equals( colour.saturation().toFixed(2) , 0 );
    equals( colour.lightness().toFixed(2) , 0 );
    equals( colour.a , undefined );
});

test("from invalid string (#yyy)", function() {
    var failed = false;
    expect(2);
    try {
        var colour = new Colour("#yyy");
    }
    catch (e) {
        equals(e, "Invalid colour specification");
        failed = true;
    }
    finally {
        ok(failed, "An error was correctly raised");
    }
});

test("from Colour object", function() {
    var colour = new Colour("#000");
    colour = new Colour(colour);
    equals( colour.hue().toFixed(2) , 0 );
    equals( colour.saturation().toFixed(2) , 0 );
    equals( colour.lightness().toFixed(2) , 0 );
    equals( colour.a , undefined );
});

test("from RGB object", function () {
    var c = Colour({r: 255, g: 0, b:0});
    equals(c.hue(), 0);
    equals(c.saturation(), 1);
    equals(c.lightness(), 0.5);
});

test("from named colour", function() {
    var c = Colour("lightgoldenrodyellow");
    equals(c.hue().toFixed(2), "0.17");
    equals(c.saturation().toFixed(2), "0.80");
    equals(c.lightness().toFixed(2), "0.90");
});

test("from named colour (case insensitive)", function() {
    var c = Colour("LightGoldenrodYellow");
    equals(c.hue().toFixed(2), "0.17");
    equals(c.saturation().toFixed(2), "0.80");
    equals(c.lightness().toFixed(2), "0.90");
});

test("from undefined", function () {
    var failed = false;
    expect(2);
    try {
        var colour = new Colour(undefined);
    }
    catch (e) {
        equals(e, "Invalid colour specification");
        failed = true;
    }
    finally {
        ok(failed, "An error was correctly raised");
    }
});

test("from gibberish", function () {
    var failed = false;
    expect(2);
    try {
        var c = new Colour("ThisIsDefinitelyNotTheNameOfAColour");
    }
    catch (e) {
        equals(e, "Invalid colour specification");
        failed = true;
    }
    finally {
        ok(failed, "An error was correctly raised");
    }
});

test("from null", function () {
    var failed = false;
    expect(2);
    try {
        var c = new Colour(null);
    }
    catch (e) {
        equals(e, "Invalid colour specification");
        failed = true;
    }
    finally {
        ok(failed, "An error was correctly raised");
    }
});

test("from NaN", function () {
    var failed = false;
    expect(2);
    try {
        var c = new Colour(NaN);
    }
    catch (e) {
        equals(e, "Invalid colour specification");
        failed = true;
    }
    finally {
        ok(failed, "An error was correctly raised");
    }
});

test("from malformed hex code", function () {
    var c, failed = false;
    expect(2);
    try { c = new Colour("#ab"); }
    catch (e) {
        equals(e, "Invalid colour specification");
        failed = true;
    }
    finally { ok(failed, "An error was correctly raised"); }
});

test("lighten", function() {
    var colour = new Colour("#000").lighten(0.5);
    equals( colour.hue().toFixed(2) , 0 );
    equals( colour.saturation().toFixed(2) , 0 );
    equals( colour.lightness().toFixed(2) , 0.5 );
    equals( colour.a , undefined );
    equals( colour.toHexString() , "#7f7f7f");
    colour = new Colour({h: 0, s: 0, l: 0.5}).lighten(0.5);
    equals( colour.lightness().toFixed(2) , 0.75 );
});

test("darken", function() {
    var colour = new Colour("#fff").darken(0.5);
    equals( colour.hue().toFixed(2) , 0 );
    equals( colour.saturation().toFixed(2) , 0 );
    equals( colour.lightness().toFixed(2) , 0.5 );
    equals( colour.a , undefined );
    equals( colour.toHexString() , "#7f7f7f");
});

test("invert", function() {
    var colour = new Colour("#fff").invert();
    equals( colour.hue().toFixed(2) , 0 );
    equals( colour.saturation().toFixed(2) , 0 );
    equals( colour.lightness().toFixed(2) , 0 );
    colour = new Colour("#000").invert();
    equals( colour.hue().toFixed(2) , 0 );
    equals( colour.hsl.s.toFixed(2) , 0 );
    equals( colour.lightness().toFixed(2) , 1 );
    equals( new Colour("#f00").invert().toHexString(), "#00ffff");
    equals( new Colour("#0f0").invert().toHexString(), "#ff00ff");
    equals( new Colour("#00f").invert().toHexString(), "#ffff00");
    equals( new Colour("#ace").invert().toHexString(), "#553311");
});

test("complement", function() {
    var colour = new Colour("#fff").complement();
    equals( colour.hue().toFixed(2) , 0.5 );
    equals( colour.hsl.s.toFixed(2) , 0 );
    equals( colour.lightness().toFixed(2) , 1 );
    colour = new Colour("#000").complement();
    equals( colour.hue().toFixed(2) , 0.5 );
    equals( colour.hsl.s.toFixed(2) , 0 );
    equals( colour.lightness().toFixed(2) , 0 );
    equals( new Colour("#f00").complement().toHexString(), "#00ffff");
    equals( new Colour("#0f0").complement().toHexString(), "#ff00ff");
    equals( new Colour("#00f").complement().toHexString(), "#fffe00");
    equals( new Colour("#ace").complement().toHexString(), "#eeccaa");
});

test("desaturate", function() {
    var colour = new Colour("#fff").desaturate();
    equals( colour.hue().toFixed(2) , 0 );
    equals( colour.hsl.s.toFixed(2) , 0 );
    equals( colour.lightness().toFixed(2) , 1 );
    colour = new Colour("#000").desaturate();
    equals( colour.hue().toFixed(2) , 0 );
    equals( colour.hsl.s.toFixed(2) , 0 );
    equals( colour.lightness().toFixed(2) , 0 );
    equals( new Colour("#f00").desaturate().toHexString(), "#7f7f7f");
    equals( new Colour("#0f0").desaturate().toHexString(), "#7f7f7f");
    equals( new Colour("#00f").desaturate().toHexString(), "#7f7f7f");
    equals( new Colour("#ace").desaturate().toHexString(), "#cccccc");
});


test("contrast", function () {
    var colour = new Colour("#fff").contrast();
    equals(colour.toString(), "#111111");
    colour = new Colour("#000").contrast();
    equals(colour.toString(), "#eeeeee");
});

test("contrast uses luma", function () {
    var colour = new Colour("#3531ff").contrast();
    equals(colour.toString(), "#eeeeee");
    colour = new Colour("#d8ec00").contrast();
    equals(colour.toString(), "#111111");
});

test("get red", function () {
    var colour = new Colour("#3531ff");
    equals(colour.red(), 0x35);
});

test("get blue", function () {
    var colour = new Colour("#3531ff");
    equals(colour.blue(), 0xff);
});

test("get green", function () {
    var colour = new Colour("#3531ff");
    equals(colour.green(), 0x31);
});

test("set red", function () {
    var colour = new Colour("#3531ff");
    equals(colour.red(128).toString(), "#8031ff");
});

test("set blue", function () {
    var colour = new Colour("#3531ff");
    equals(colour.blue(128).toString(), "#353180");
});

test("set green", function () {
    var colour = new Colour("#3531ff");
    equals(colour.green(128).toString(), "#3580ff");
});
test("get hue", function () {
    var colour = new Colour("#3531ff");
    equals(colour.hue().toFixed(2), "0.67");
});

test("get saturation", function () {
    var colour = new Colour("#3531ff");
    equals(colour.saturation().toFixed(2), "1.00");
});

test("get lightness", function () {
    var colour = new Colour("#3531ff");
    equals(colour.lightness().toFixed(2), "0.60");
});

test("set hue", function () {
    var colour = new Colour("#3531ff");
    equals(colour.hue(0.5).toString(), "#30ffff");
});

test("set saturation", function () {
    var colour = new Colour("#3531ff");
    equals(colour.saturation(0.5).toString(), "#6664cb");
});

test("set lightness", function () {
    var colour = new Colour("#3531ff");
    equals(colour.lightness(0.5).toString(), "#0400ff");
});

test("component values can assigned by string", function () {
    var colour = new Colour("black").green("101");
    equals(colour.toString(), "#006500");
});

test("get alpha", function () {
    var colour = new Colour("#ffffff80");
    equals(colour.alpha().toFixed(2), "0.50");
});

test("set alpha", function () {
    var colour = new Colour("#ffffff").alpha(0.5);
    equals(colour.toString(), "#ffffff7f");
});

test("set alpha to null", function () {
    var colour = new Colour("#ffffff55").alpha(null);
    equals(colour.toString(), "#ffffff");
});

test("set alpha to undefined", function () {
    var colour = new Colour("#ffffff55").alpha(undefined);
    equals(colour.toString(), "#ffffff");
});

test("undefined alpha returned correctly", function () {
    equals(Colour("#ffffff").alpha(), undefined);
});




















