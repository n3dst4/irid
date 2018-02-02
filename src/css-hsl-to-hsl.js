import parseHueValue from "./parse-hue-value";
import parseSLValue from "./parse-sl-value";
import parseAlphaValue from "./parse-alpha-value";

export default function cssHSLToHSL(css) {
  const parts = /^hsla?\(\s*(-?\d+)\s*,\s*(-?\d+%)\s*,\s*(-?\d+%)\s*(?:,\s*(-?\d*(?:\.\d+)?)?)?\s*\)$/.exec(
    css
  );
  return parts
    ? {
        h: parseHueValue(parts[1]),
        s: parseSLValue(parts[2]),
        l: parseSLValue(parts[3]),
        a: parseAlphaValue(parts[4])
      }
    : undefined;
}
