import { colors } from "../../colors";

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
    if (bin[i] === ".") steps.push("", colors.bold("** Computing float"), "");

    const m = length - i - (i >= length ? 0 : 1);
    const bit = Number(parseInt(bin[i] as string, coefficient));
    const result = bit * coefficient ** m;

    steps.push(
      `bit[${i}]: ${colors.magentaBright(
        bin[i]
      )} * ${coefficient}^${m} = ${result}`
    );
    decimal += result;
  }

  steps.push(colors.greenBright(`Computed, decimal sum = ${decimal}`));

  steps.push("==========================================");
  steps.push(
    colors.cyan(
      `All done converted ${colors.magentaBright(
        bin
      )} to decimal ${colors.magentaBright(decimal + "")}`
    )
  );
  return steps;
}
