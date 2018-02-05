Irid
======

![travis build status](https://travis-ci.org/n3dst4/irid.svg)

Parse, convert and manipulate colors.

For a page which makes extensive use of irid.js, see http://colortoy.lumphammer.com/


Usage
===============
Install:
```sh
npm install irid
```

Then:

```js
import Irid from "irid";
// or var Irid = require("irid") if you're using CommonJS
Irid( string );
Irid( rgbObject );
Irid( hslObject );
```



API - Constructors
==================

For convenience, `Irid()`` is an alias for `new Irid()`.

`Irid( string )`
----------------

Returns a new Irid object based on a css-style color value string.
The recognised formats are:

     #xxx          Hex chars for red, greed, and blue
     #xxxxxx       Classic HTML color values
     #xxxx         Hex chars for red, greed, blue, and alpha
     #xxxxxxxx     Hex chars for red, greed, blue, and alpha
     rgb(int, int, int)
     rgb(int%, int%, int%)
     rgba(int, int, int, float)
     rgba(int%, int%, int%, float)
     hsl(int, int%, int%)
     hsla(int, int%, int%, float)
     colorname

More detail about these formats can be found at
http://www.w3.org/TR/css3-color/

`colorname` can be any any named color defined in CSS3. This is not
browser-dependent: they're built in to the library.

In `rgb()` and `rgba()` formats, the `int` values are either integers between
0 and 255 inclusive, or percentage values (indicated by a `%`-sign.) The
CSS3 spec stipulates that the three values should all be plain integers
or all percentages, but this is not enforced in color.js.

In `hsl()` and `hsla()` formats, the first `int` value is the hue in degrees,
where 0 = 360 = red. The second and third values are percentages for the
saturation and luminance, and must be followed by a `%`-sign.

In `rgba()` and `hsla()` formats, the float value is the alpha value, and
should be between 0.0 and 1.0 inclusive. Irid will actually
understand if you supply an alpha float to `rgb()` or `hsl()`, or leave it
out of `rgba()` or `hsla()` (in other words, the "a" is completely
optional.)

The `#xxxx` and `#xxxxxxxx` formats are not part of CSS3. They are like `#xxx`
and `#xxxxxx` respectively, but with an alpha value given as the last
one or two hex digits.

`Irid( rgbobject )`
----------------

Returns a new Irid object based on the `r`, `g`, and `b` members of the
argument, which should be integers between 0 and 255 inclusive. Example:

    Irid({r: 255, g: 0, b: 0}) // red color

Irid( hslobject )
----------------

Returns a new Irid object based on the `h`, `s`, and `l` members of the
argument, which should be numbers between 0 and 1 inclusive. Example:

    Irid({h: 0.33, s: 0.5, b: 0.4}) // olive color


API - Methods of Irid objects
=============================

All destructive operations (setters) return new Irid objects, leaving the
original intact. This means you can do this:

     myIrid = Irid("#BEDEAD");
     myShade = myIrid.darken(0.5);
     myDiv.css({
         "background-color": myIrid.toString()
         "color": myShade.toString()
     });

In other words, **you can always treat Irid objects as immutable**.

`.red()`
----------------

Returns the red component of the color as an integer from 0 to 255.

`.red(r)`
----------------

Returns a new color based the current color but with the red component
set to `r`, which should be an integer from 0 to 255.

`.green()`
----------------

Returns the green component of the color as an integer from 0 to 255.

`.green(g)`
----------------

Returns a new color based the current color but with the green
component set to `g`, which should be an integer from 0 to 255.

`.blue()`
----------------

Returns the blue component of the color as an integer from 0 to 255.

`.blue(b)`
----------------

Returns a new color based the current color but with the blue
component set to `b`, which should be an integer from 0 to 255.

`.hue()`
----------------

Returns the hue value of the color as an value from 0 to 1.

`.hue(h)`
----------------

Returns a new color based the current color but with the hue
value set to `h`, which should be an number from 0 to 1.

`.saturation()`
----------------

Returns the saturation value of the color as an value from 0 to 1.

`.saturation(s)`
----------------

Returns a new color based the current color but with the saturation
value set to `s`, which should be an number from 0 to 1.

`.lightness()`
----------------

Returns the lightness value of the color as an value from 0 to 1.

`.lightness(l)`
----------------

Returns a new color based the current color but with the lightness
value set to `l`, which should be an number from 0 to 1.

`.alpha()`
----------------

Returns alpha value of color as a value from 0 to 1.

`.alpha(a)`
----------------

Returns a new color based the current color but with the alpha
value set to `a`, which should be a number from 0 to 1. Setting a to `null`
or `undefined` will effectively "unset" the alpha.

`.luma()`
----------------

Returns the calculated [luma](http://en.wikipedia.org/wiki/HSL_and_HSV#Lightness) of the color as a number from 0 to 1. It is not currently possible to set the luma directly.

`.relativeLuminance()`
----------------

Returns the calculated [relative luminance](http://www.w3.org/TR/WCAG/#relativeluminancedef) of the color as a number from 0 to 1. It is not currently possible to set the relative luminance directly.

`.contrastRatio(other)`
----------------

Returns the contrast ratio [relative luminance](http://www.w3.org/TR/WCAG/#contrast-ratiodef) of the color against a given second color.

`.lighten(amount)`
----------------

Where amount is a number between 0 and 1. Lightens the color towards
white by the proportion given. `Irid("black").lighten(0.5)` is medium
grey. `Irid("black").lighten(0.5).lighten(0.5)` is 75% light grey.
`.lighten(0)` is a no-op, `.lighten(1)` turns any color into white.

`.darken(amount)`
----------------

Where amount is a number between 0 and 1. Darkens the color towards
black by the proportion given. `Irid("white").darken(0.5)` is medium
grey. `Irid("white").darken(0.5).darken(0.5)` is 75% dark grey.
`.darken(0)` is a no-op, `.darken(1)` turns any color into black.

`.invert()`
----------------

Turns the color into the RGB opposite of itself. White becomes black,
black becomes white, and medium grey remains medium grey. If you are
building a color scheme, you probably want `.complement()` instead.

`.complement()`
----------------

Turns the color into its color-wheel complement - that is, it keeps
the same lightness and saturation but moves to the opposite hue. This
will generally produce a pleasingly contrasting color.

`.desaturate()`
----------------

Turns the color into a grey shade with the same lightness.

`.contrast( [a, b] )`
----------------

Returns a new Irid object representing a tone which will be as legible
as possible as a text/foreground color when the original color is
used as a background. If no arguments are given, the returned color will be
`#00000` (black) or `#ffffff` (white). If color arguments are given, then the
return value will be the one that given the strongest contrast with the
starting color.

`.analagous()`
----------------

Returns an array of colors based on the original:
[original, left, right]
Where original is the original color, and left and right are slight
variants based on moving slighty left and right round the HSL color
wheel (30° each way.)

`.tetrad()`
----------------

Returns an array of colors based on the original:
[original, right, complement, left]
Where original is the original color, and right, complement, and left
are produced by rotating in 90° increments round the HSL color wheel
(complement is the same as the color returned by the complement()
method.)

`.rectTetrad()`
----------------

Returns an array of colors based on the original:
[original, right, complement, left]
Where original is the original color, and right, complement, and left
are produced by rotating in alternating 60 and 120° incremenets round
the HSL color wheel (complement is the same as the color returned by
the complement() method.)

`.triad()`
----------------

Returns an array of colors based on the original:
[original, left, right]
Where original is the original color, and left and right are spaced
evenly round the HSL color wheel, producing a group of three colors
120° apart.

`.splitComplementary()`
----------------

Returns an array of colors based on the original:
[original, left, right]
Where original is the original color, and left and right are 150°
round the color HSL color wheel on each side. (The left and right
colors returned from this method are the same as the left and right
returned from doing .complement().analagous().)

`.blend(other [, opacity])`
----------------

Returns a new color consisting of the original color blended with a given
other color. The optional `opacity` argument is a number between 0 and 1
specifying a weighting for the blended color in the mix. A low value, e.g. 0.1,
will yield a result very close to the original, while a high value, e.g. 0.9,
will yield a result very close to the "other" color. The default opacity is
0.5, yielding an even mix of the two colors.

`.toString()`
----------------

Alias for `.toHexString()`

`.toHexString()`
----------------

Returns a six or eight character hex color code with leading #.

`.toRGBString()`
----------------

Returns a CSS color code in the `rgb()` or `rgba()` format.

`.toHSLString()`
----------------

Returns a CSS color code in the `hsl()` or `hsla()` format.


API - Utility functions
=======================

`Irid.canInterpret(candidate)`
----------------------------

Returns `true` is Irid will be able to use the given candidate object or string (as per any of the listed constructors).


Example
=======

> Please excuse the jQuery - this example is super old!

Making the background of a "dt" element proportionally darker than the parent dl:

     var myDl = $("my-dl");
     myDl.find("dt").css("background-color",
         Irid(myDl.css("background-color")).darken(0.3).toString()
     );

Setting the text color in the dl automatically:

     myDl.css("color",
         Irid(myDl.css("background-color")).getContrast().toString()
     );


Example: Generating a color from a number
=========================================

Irid nearly grew a function that would accept any string, and return a color generated programmatically from it. This would be cool for e.g. generated avatars, or data visualization. But I figured this was feature-creep, and you can do it yourself pretty easily. First, this is how you turn a number into a color:

```js
const myNumber = 123456789;
const myColor = Irid("#" + ("00000" + (myNumber).toString(16)).substr(-6));
```

So now all you need is a way to turn a string into a number, which is generically known as hashing. I recommend [Murmurhash](https://github.com/garycourt/murmurhash-js), which isn't on npm at the time of writing but is MIT licensed so you can borrow it. It's good because:

* it's not a cryptographic algorithm, so it only generates a 32-bit integer, not a massive cryptographically-secure signature.
* it's fast
* it perturbs (scatters) well even for similar inputs. Other hashing algorithms tend to produce almost-identical results for almost-identical inputs. But imagine we're creating colored avatars for two forum users called "jim" and "kim". They're only only ascii digit apart but we'd want their colors to be nice and distinct.



Notes
=====
Irids are stored internally in HSL format, but attempt to preserve the RGB
values they were created with. See
http://en.wikipedia.org/wiki/HSL_and_HSV
for details. This means that sometimes, due to gamut changes and rounding
errors, a color subjected to a series of transformations which should cancel
each other out will actually end up very slightly different to how it
started.


Demo
===============
See http://colortoy.lumphammer.com/ for a color picker app which uses
irid.js.


Copyright and license
===============
Original:
Copyright (c) 2009, Neil de Carteret

Now:
Copyright (c) 2018, Neil de Carteret

All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

*   Redistributions of source code must retain the above copyright
    notice, this list of conditions and the following disclaimer.
*   Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the
    documentation and/or other materials provided with the distribution.
*   Neither the name of the <organization> nor the
    names of its contributors may be used to endorse or promote products
    derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY NEIL DE CARTERET ''AS IS'' AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL <copyright holder> BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
