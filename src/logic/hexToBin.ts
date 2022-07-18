import { colors } from "../colors";

export function hexToBin(hex: string) {
  let bin = "";
  const steps = [];

  for (let i = 0; i < hex.length; i++) {
    const hexChar = hex[i];
    const binChar = parseInt(hexChar, 16).toString(2);
    bin += "0".repeat(4 - binChar.length) + binChar;
    steps.push(`hex[${i}]: ${hexChar} = ${binChar}`);
  }

  steps.push(colors.greenBright(`Computed, bin = ${bin}`));
  steps.push(colors.cyan(`Computed by C++: `) + colors.magentaBright(hex) + " = " + colors.magentaBright(parseInt(hex, 16).toString(2)));

  return steps;
}
