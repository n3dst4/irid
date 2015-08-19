#!/usr/bin/env python

import urllib.request
import urllib.parse

with open("irid.js") as input:
    code = input.read()

minified = urllib.request.urlopen("http://closure-compiler.appspot.com/compile",
    urllib.parse.urlencode({
        "js_code": code,
        "compilation_level": "SIMPLE_OPTIMIZATIONS",
        "output_format": "text",
        "output_info": "compiled_code"
    }).encode("utf8")).read()

with open("irid.min.js", "w") as output:
    output.write(minified.decode("utf8"))

print("Original:" + str(len(code)) +
      "\nMinified (SIMPLE_OPTIMIZATIONS):" + str(len(minified)))
