#!/usr/bin/env python
from __future__ import with_statement
import urllib2
import urllib

with open("colour.js") as input, open("colour.min.js", "w") as output:
    code = input.read()
    
    minified = urllib2.urlopen("http://closure-compiler.appspot.com/compile",
        urllib.urlencode({
            "js_code": code,
            "compilation_level": "SIMPLE_OPTIMIZATIONS",
            "output_format": "text",
            "output_info": "compiled_code"
        })).read()


    output.write(minified)

print("Original:" + str(len(code)) +
      "\nMinified (SIMPLE_OPTIMIZATIONS):" + str(len(minified)))
