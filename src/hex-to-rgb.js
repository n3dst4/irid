import parseHexValue from "./parse-hex-value";

export default function hexToRGB (hex) {
  var parts =
    /^#([\da-f])([\da-f])([\da-f])([\da-f])?$/i.exec(hex) ||
    /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})([\da-f]{2})?$/i.exec(hex);
  return parts
    ? {
        r: parseHexValue(parts[1]),
        g: parseHexValue(parts[2]),
        b: parseHexValue(parts[3]),
        a:
          typeof parts[4] == undefined || parts[4] == ""
            ? undefined
            : parseHexValue(parts[4]) / 255
      }
    : undefined;
}
