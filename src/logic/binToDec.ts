import { toDecimal } from "./helpers/toDecimal";

export function binToDec(bin: string) {
  return toDecimal(bin, {
    coefficient: 2,
  });
}
