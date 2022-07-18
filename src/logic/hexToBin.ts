import { colors } from "../colors";

export function hexToBin(hex: string) {
  let bin = "";
  const steps = [];

  for (let i = 0; i < hex.length; i++) {
    const hexChar = hex[i];
    const binChar = parseInt(hexChar, 16).toString(2);
    const offset = "0".repeat(4 - binChar.length)
    bin += offset + binChar;
    steps.push(`hex[${i}]: ${hexChar} = ${colors.magentaBright(offset) + binChar}`);
  }

  steps.push(colors.greenBright(`Computed, bin = ${bin}`));
  steps.push(colors.cyan(`Computed by parseInt `) + colors.magentaBright(hex) + " = " + colors.magentaBright(parseInt(hex, 16).toString(2)));

  return steps;
}
