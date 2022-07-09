import { fromDecimal } from "./helpers/fromDecimal";

export function decToBin(dec: string) {
  return fromDecimal(dec, {
    coefficient: 2,
  });
}
