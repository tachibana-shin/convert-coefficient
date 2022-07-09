import { toDecimal } from "./helpers/toDecimal";

export function hexToDec(hex: string) {
  return toDecimal(hex, {
    coefficient: 16,
  });
}
