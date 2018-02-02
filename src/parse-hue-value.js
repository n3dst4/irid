export default function parseHueValue (str) {
  var val = parseInt(str, 10) % 360;
  if (val < 0) {
    val += 360;
  }
  return val / 360;
}
