colour.js
=========

Parse, convert and manipulate colours (also known as colors) in JavaScript.

For a page which makes extensive use of colour.js, see http://colourtoy.lumphammer.com/


Usage
===============
Download colour.min.js and link to it in in your HTML:

     <head>
          ...
          <script type="text/javascript" src="path/to/colour.js"></script>
          ...
     </head>
     
You knew that already, right?

To create Colour objects:

     Colour( string );
     Colour( rgbObject );
     Colour( hslObject );
     



API - Constructors
===============

For convenience, Colour() is an alias for new Colour().

Colour( string )
----------------

Returns a new Colour object based on a css-style colour value string.
The recognised formats are:

     #xxx          Hex chars for red, greed, and blue
     #xxxxxx       Classic HTML colour values
     #xxxx         Hex chars for red, greed, blue, and alpha
     #xxxxxxxx     Hex chars for red, greed, blue, and alpha
     rgb(int, int, int)
     rgb(int%, int%, int%)
     rgba(int, int, int, float)
     rgba(int%, int%, int%, float)
     hsl(int, int%, int%)
     hsla(int, int%, int%, float)
     colourname

More detail about these formats can be found at 
http://www.w3.org/TR/css3-color/

colourname can be any any named colour defined in CSS3. This is not
browser-dependent: they're built in to the library.

In rgb() and rgba() formats, the int values are either integers between
0 and 255 inclusive, or percentage values (indicated by a %-sign.) The
CSS3 spec stipulates that the three values should all be plain integers
or all percentages, but this is not enforced in colour.js.

In hsl() and hsla() formats, the first int value is the hue in degrees, 
where 0 = 360 = red. The second and third values are percentages for the
saturation and luminance, and must be followed by a %-sign.

In rgba() and hsla() formats, the float value is the alpha value, and
should be between 0.0 and 1.0 inclusive. colour.js will actually
understand if you supply an alpha float to rgb() or hsl(), or leave it
out of rgba() or hsla() (in other words, the "a" is completely 
optional.)

The #xxxx and #xxxxxxxx formats are not part of CSS3. They are like #xxx
and #xxxxxx respectively, but with an alpha value given as the last
one or two hex digits.

Colour( rgbobject )
----------------

Returns a new Colour object based on the r, g, and b members of the 
argument, which should be integers between 0 and 255 inclusive. Example:
Colour({r: 255, g: 0, b: 0}) // red colour

Colour( hslobject )
----------------

Returns a new Colour object based on the h, s, and l members of the 
argument, which should be numbers between 0 and 1 inclusive. Example:
Colour({h: 0.33, s: 0.5, b: 0.4}) // olive colour


API - Methods of colour objects
===============

All destructive operations (setters) return new Colour objects, leaving the
original intact. This means you can do this:

     myColour = Colour("#BEDEAD");
     myShade = myColour.darken(0.5);
     myDiv.css({
         "background-color": myColour.toString()
         "color": myShade.toString()
     });

In other words, **you can always treat Colour objects as immutable**.

.red()
----------------

Returns the red component of the colour as an integer from 0 to 255.

.red(r)
----------------

Returns a new colour based the current colour but with the red component
set to r, which should be an integer from 0 to 255.

.green()
----------------

Returns the green component of the colour as an integer from 0 to 255.

.green(g)
----------------

Returns a new colour based the current colour but with the green
component set to g, which should be an integer from 0 to 255.

.blue()
----------------

Returns the blue component of the colour as an integer from 0 to 255.

.blue(b)
----------------

Returns a new colour based the current colour but with the blue
component set to b, which should be an integer from 0 to 255.

.hue()
----------------

Returns the hue value of the colour as an value from 0 to 1.

.hue(h)
----------------

Returns a new colour based the current colour but with the hue
value set to h, which should be an number from 0 to 1.

.saturation()
----------------

Returns the saturation value of the colour as an value from 0 to 1.

.saturation(s)
----------------

Returns a new colour based the current colour but with the saturation
value set to s, which should be an number from 0 to 1.

.lightness()
----------------

Returns the lightness value of the colour as an value from 0 to 1.

.lightness(l)
----------------

Returns a new colour based the current colour but with the lightness
value set to l, which should be an number from 0 to 1.

.alpha()
----------------

Returns alpha value of colour as a value from 0 to 1.

.alpha(a)
----------------

Returns a new colour based the current colour but with the alpha
value set to a, which should be a number from 0 to 1. Setting a to null
or undefined will effectively "unset" the alpha.

.luma()
----------------

Returns the calculated luma of the colour as a number from 0 to 1. It is
not currently possible to set the luma directly.

.lighten (amount)
----------------

Where amount is a number between 0 and 1. Lightens the colour towards 
white by the proportion given. Colour("black").lighten(0.5) is medium 
grey. Colour("black").lighten(0.5).lighten(0.5) is 75% light grey. 
.lighten(0) is a no-op, .lighten(1) turns any colour into white.

.darken (amount)
----------------

Where amount is a number between 0 and 1. Darkens the colour towards 
black by the proportion given. Colour("white").darken(0.5) is medium 
grey. Colour("white").darken(0.5).darken(0.5) is 75% dark grey. 
.darken(0) is a no-op, .darken(1) turns any colour into black.

.invert ()
----------------

Turns the colour into the RGB opposite of itself. White becomes black,
black becomes white, and medium grey remains medium grey. If you are 
building a colour scheme, you probably want .complement() instead.

.complement ()
----------------

Turns the colour into its colour-wheel complement - that is, it keeps 
the same lightness and saturation but moves to the opposite hue. This
will generally produce a pleasingly contrasting colour.

.desaturate ()
----------------

Turns the colour into a grey shade with the same lightness.

.contrast ( [light, dark] )
----------------

Returns a new Colour object representing a tone which will be as legible
as possible as a text/foreground colour when the original colour is
used as a background. The defaults are #111 (on light backgrounds) and #eee
(on dark backgrounds.) If supplied, light and dark are strings or
Colour objects which will be used instead (light should be a light 
colour for use on dark backgrounds, dark should be a dark colour for use
on light backgrounds.)

.analagous()
----------------

Returns an array of colours based on the original:
[original, left, right]
Where original is the original colour, and left and right are slight
variants based on moving slighty left and right round the HSL colour
wheel (30° each way.)

.tetrad()
----------------

Returns an array of colours based on the original:
[original, right, complement, left]
Where original is the original colour, and right, complement, and left
are produced by rotating in 90° incremenets round the HSL colour wheel 
(complement is the same as the colour returned by the complement() 
method.)

.rectTetrad()
----------------

Returns an array of colours based on the original:
[original, right, complement, left]
Where original is the original colour, and right, complement, and left
are produced by rotating in alternating 60 and 120° incremenets round
the HSL colour wheel (complement is the same as the colour returned by
the complement() method.) 

.triad()
----------------

Returns an array of colours based on the original:
[original, left, right]
Where original is the original colour, and left and right are spaced 
evenly round the HSL colour wheel, producing a group of three colours
120° apart.

.splitComplementary()
----------------

Returns an array of colours based on the original:
[original, left, right]
Where original is the original colour, and left and right are 150°
round the colour HSL colour wheel on each side. (The left and right
colours returned from this method are the same as the left and right
returned from doing .complement().analagous().)

.toString ()
----------------

Alias for .toHexString()

.toHexString()
----------------

Returns a six or eight character hex colour code with leading #.

.toRGBString()
----------------

Returns a CSS colour code in the rgb() or rgba() format.

.toHSLString()
----------------

Returns a CSS colour code in the hsl() or hsla() format.
  

Example
===============

Making the background of a "dt" element proportionally darker than the parent dl:

     var myDl = $("my-dl");
     myDl.find("dt").css("background-colour", 
         Colour(myDl.css("background-colour")).darken(0.3).toString()
     );

Setting the text colour in the dl automatically:

     myDl.css("color", 
         Colour(myDl.css("background-color")).getContrast().toString()
     );


Notes
===============
Colours are stored internally in HSL format, but attempt to preserve the RGB
values they were created with. See
http://en.wikipedia.org/wiki/HSL_and_HSV
for details. This means that sometimes, due to gamut changes and rounding
errors, a colour subjected to a series of transformations which should cancel
each other out will actually end up very slightly different to how it 
started.


Test coverage
===============
100% coverage - see colourtest.html.


Demo
===============
See http://colourtoy.lumphammer.com/ for a colour picker app which uses
colour.js.


Copyright and licence
===============
Copyright (c) 2009, Neil de Carteret
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