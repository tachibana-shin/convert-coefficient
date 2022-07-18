import { colors } from "../colors";

function parseToHex(bin: string, steps: string[]) {
  const rev = bin.split("").reverse();
  const groups = [];

  for (let i = 0; i < rev.length; i += 4) {
    const group = rev
      .slice(i, i + 4)
      .reverse()
      .join("");

    groups.push(group);
  }

  let result = "";
  groups.reverse().forEach((group) => {
    console.log(group);
    const r = parseInt(group, 2).toString(16);
    result += r;
    steps.push(
      `${colors.magentaBright("0".repeat(4 - group.length)) + group} = ${r}`
    );
  });

  return result;
}

export function binToHex(bin: string) {
  const steps: string[] = [];

  const groups = [];

  const [int, decimal] = bin.split(".");

  let rInt, rDec;
  steps.push("", colors.bold(`** Computing int ${int}`), "");
  steps.push(
    colors.greenBright(`Computed, hex = ${(rInt = parseToHex(int, steps))}`)
  );

  if (decimal) {
    steps.push("", colors.bold(`** Computing float ${decimal}`), "");
    steps.push(
      colors.greenBright(
        `Computed, hex = ${(rDec = parseToHex(decimal, steps))}`
      )
    );
  }

  steps.push("==========================================");
  steps.push(
    colors.cyan(
      `All done converted ${colors.magentaBright(
        bin + ""
      )} to hex ${colors.magentaBright(`${rInt}.${rDec ?? 0}`)}`
    )
  );
  steps.push(colors.cyan(`Computed by parseInt `) + colors.magentaBright(bin) + " = " + colors.magentaBright(parseInt(bin, 2).toString(16)));

  return steps;
}
