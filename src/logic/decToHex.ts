import { fromDecimal } from "./helpers/fromDecimal";

export function decToHex(dec: string) {
  return fromDecimal(dec, {
    coefficient: 16,
    maxLengthFloat: 12
  });
}
