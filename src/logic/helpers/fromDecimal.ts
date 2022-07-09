import chalk from "chalk";
import { separateInt } from "../utils/separate-int";

export function fromDecimal(
  value: string | number,
  {
    coefficient = 2,
    maxLengthFloat = 53,
  }: {
    coefficient?: number;
    maxLengthFloat?: number;
  } = {}
) {
  value = typeof value === "string" ? parseFloat(value) : value;

  let { primely, float } = separateInt(value);

  const steps = [];

  let binPrimely;
  if (float !== 0) {
    steps.push(
      chalk.bold(
        `Split ${value} into primely(${primely}) and decimal(${float})`
      )
    );

    steps.push(
      "",
      chalk.bold(`** Computing binary representation of primely(${primely})`),
      ""
    );
  }

  if (primely !== 0) {
    const bit = [];

    for (; primely > 0; ) {
      const r = primely % coefficient;
      const bkp = primely;
      primely = ~~(primely / coefficient);

      const rAliased = r.toString(coefficient).toUpperCase();
      steps.push(
        `${bkp} / ${coefficient} = ${primely} (${chalk.cyan(
          `R=${r} alias ${chalk.magentaBright(rAliased)}`
        )})`
      );
      bit.push(rAliased);
    }

    steps.push(
      chalk.greenBright(
        `Computed, reverse array bit R = ${(binPrimely = bit
          .reverse()
          .join(""))}`
      )
    );
  }

  let binFloat;
  if (float !== 0) {
    steps.push(
      "",
      chalk.bold(`** Computing binary representation of decimal(${float})`),
      ""
    );

    const bits = [];
    for (let i = 0; i < maxLengthFloat && float !== 0; i++) {
      const bkp = float;
      const result = float * coefficient;
      const tmp = separateInt(result);
      float = tmp.float;

      const pAliased = tmp.primely.toString(coefficient);
      bits.push(pAliased);
      steps.push(
        `${bkp} * ${coefficient} = ${result} (${chalk.cyan(
          `R=${tmp.primely} alias ${chalk.magentaBright(pAliased)}`
        )})`
      );
    }

    steps.push(
      chalk.greenBright(
        `Computed, R(limit=${maxLengthFloat}) = ${(binFloat = bits.join(""))}`
      )
    );
  }

  steps.push("==========================================");
  steps.push(
    chalk.cyan(
      `All done converted ${chalk.magentaBright(
        value
      )} to binary ${chalk.magentaBright(`${binPrimely}.${binFloat ?? 0}`)}`
    )
  );

  return steps;
}
