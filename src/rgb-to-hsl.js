export default function rgbToHSL (rgb) {
  var v,
    m,
    vm,
    r2,
    g2,
    b2,
    r = rgb.r / 255,
    g = rgb.g / 255,
    b = rgb.b / 255,
    h = 0,
    s = 0,
    l = 0;
  v = Math.max(r, g, b);
  m = Math.min(r, g, b);
  l = (m + v) / 2;
  if (l > 0) {
    vm = v - m;
    s = vm;
    if (s > 0) {
      s = s / (l <= 0.5 ? v + m : 2 - v - m);
      r2 = (v - r) / vm;
      g2 = (v - g) / vm;
      b2 = (v - b) / vm;
      if (r == v) {
        h = g == m ? 5.0 + b2 : 1.0 - g2;
      } else if (g == v) {
        h = b == m ? 1.0 + r2 : 3.0 - b2;
      } else {
        h = r == m ? 3.0 + g2 : 5.0 - r2;
      }
      h = h / 6;
    }
  }
  return { h: h % 1, s: s, l: l, a: rgb.a };
}
