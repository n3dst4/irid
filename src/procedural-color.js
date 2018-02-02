import Irid from "./irid";
import hash from "./murmurhash3_gc"

export const intToColor = i =>
  `#${("00000" + Math.abs(i)
    .toString(16))
    .substr(-6)}`;

const proceduralColor = str =>
  Irid(intToColor(hash(str)))
    .lightness(0.7)
    .toHexString();

export default proceduralColor;
