export default function rgbToHSL(rgb) {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const v = Math.max(r, g, b);
  const m = Math.min(r, g, b);

  let vm,
    r2,
    g2,
    b2,
    h = 0,
    s = 0,
    l = 0;
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
