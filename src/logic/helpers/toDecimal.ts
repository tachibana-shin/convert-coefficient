import chalk from "chalk";

export function toDecimal(
  bin: string,
  {
    coefficient = 2,
  }: {
    coefficient?: number;
  } = {}
) {
  bin = bin.toUpperCase();
  const steps = [];
  const length = bin.split(".")[0].length;

  let decimal = 0;
  for (let i = 0; i < bin.length; i++) {
    if (bin[i] === ".") steps.push("", chalk.bold("** Computing float"), "");

    const m = length - i - (i >= length ? 0 : 1);
    const bit = Number(parseInt(bin[i] as string, coefficient));
    const result = bit * coefficient ** m;

    steps.push(
      `bit[${i}]: ${chalk.magentaBright(
        bin[i]
      )} * ${coefficient}^${m} = ${result}`
    );
    decimal += result;
  }

  steps.push(chalk.greenBright(`Computed, decimal sum = ${decimal}`));

  steps.push("==========================================");
  steps.push(
    chalk.cyan(
      `All done converted ${chalk.magentaBright(
        bin
      )} to decimal ${chalk.magentaBright(decimal)}`
    )
  );
  return steps;
}
