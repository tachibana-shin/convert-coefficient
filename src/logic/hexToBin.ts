import chalk from "chalk";

export function hexToBin(hex: string) {
  let bin = "";
  const steps = [];

  for (let i = 0; i < hex.length; i++) {
    const hexChar = hex[i];
    const binChar = parseInt(hexChar, 16).toString(2);
    bin += binChar;
    steps.push(`hex[${i}]: ${hexChar} = ${binChar}`);
  }

  steps.push(chalk.greenBright(`Computed, bin = ${bin}`));

  return steps;
}
