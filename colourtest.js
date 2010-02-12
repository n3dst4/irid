test("6 hex chars with hash", function() {
    var rgb = Colour.hexToRGB("#0088ff");
    equals( rgb.r, 0 );
    equals( rgb.g, 136 );
    equals( rgb.b, 255 );
    equals( rgb.a, undefined );
});

test("3 hex chars with hash", function() {
    var rgb = Colour.hexToRGB("#08f");
    equals( rgb.r, 0 );
    equals( rgb.g, 136 );
    equals( rgb.b, 255 );
    equals( rgb.a, undefined );
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

test("hslToCSSHSL", function() {
    equals( Colour.hslToCSSHSL({h: 0.5, s: 0.6, l: 0.7}), "hsl(180, 60%, 70%)" );
});

test("rgbToHex", function() {
    equals( Colour.rgbToHex({r: 0, g: 136, b: 255 }), "#0088ff" );
});

test("hslToRGB", function() {
    var rgb = Colour.hslToRGB({ h: 147/255, s: 1, l: 128/255 })
    equals( rgb.r , 0 );
    equals( rgb.g , 138 );
    equals( rgb.b , 255 );
    equals( rgb.a , undefined );
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

test("rgbToHSL (white)", function() {
    var hsl = Colour.rgbToHSL({ r: 255, g: 255, b: 255 })
    equals( hsl.h.toFixed(2) , 0 );
    equals( hsl.s.toFixed(2) , 0 );
    equals( hsl.l.toFixed(2) , 1 );
    equals( hsl.a , undefined );
});


test("colour from string (#fff)", function() {
    var colour = new Colour("#fff");
    equals( colour.h.toFixed(2) , 0 );
    equals( colour.s.toFixed(2) , 0 );
    equals( colour.l.toFixed(2) , 1 );
    equals( colour.a , undefined );
});

test("colour from string (#000)", function() {
    var colour = new Colour("#000");
    equals( colour.h.toFixed(2) , 0 );
    equals( colour.s.toFixed(2) , 0 );
    equals( colour.l.toFixed(2) , 0 );
    equals( colour.a , undefined );
});

test("colour from colour", function() {
    var colour = new Colour("#000");
    colour = new Colour(colour);
    equals( colour.h.toFixed(2) , 0 );
    equals( colour.s.toFixed(2) , 0 );
    equals( colour.l.toFixed(2) , 0 );
    equals( colour.a , undefined );
});



































