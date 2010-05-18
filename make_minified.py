#!/usr/bin/env python

import urllib2
import urllib

with open("colour.js") as input:
    code = input.read()
    
minified = urllib2.urlopen("http://closure-compiler.appspot.com/compile",
    urllib.urlencode({
        "js_code": code,
        "compilation_level": "SIMPLE_OPTIMIZATIONS",
        "output_format": "text",
        "output_info": "compiled_code"
    })).read()

with open("colour.min.js", "w") as output:
    output.write(minified)

print("Original:" + str(len(code)) +
      "\nMinified (SIMPLE_OPTIMIZATIONS):" + str(len(minified)))
