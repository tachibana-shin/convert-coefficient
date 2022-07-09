import { colors } from "../colors";

export function binToHex(bin: string) {
  const steps = [];

  const groups = [];

  const rev = bin.split("").reverse();

  for (let i = 0; i < rev.length; i += 4) {
    const group = rev
      .slice(i, i + 4)
      .reverse()
      .join("");

    groups.push(colors.magentaBright("0".repeat(4 - group.length)) + group);
  }

  let result = "";
  groups.reverse().forEach((group) => {
    const r = parseInt(group, 2).toString(16);
    result += r;
    steps.push(`${group} = ${r}`);
  });

  steps.push(colors.greenBright(`Computed, hex = ${result}`));

  return steps;
}
