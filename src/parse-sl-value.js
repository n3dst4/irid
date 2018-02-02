export default function parseSLValue(str) {
  return Math.max(0, Math.min(100, parseInt(str, 10))) / 100;
}
