export default function parseAlphaValue(str) {
  return str ? Math.max(0, Math.min(1, parseFloat(str))) : undefined;
}
