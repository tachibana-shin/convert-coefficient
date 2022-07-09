import { colors } from "../../colors";
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
      colors.bold(
        `Split ${value} into primely(${primely}) and decimal(${float})`
      )
    );

    steps.push(
      "",
      colors.bold(`** Computing binary representation of primely(${primely})`),
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
        `${bkp} / ${coefficient} = ${primely} (${colors.cyan(
          `R=${r} alias ${colors.magentaBright(rAliased)}`
        )})`
      );
      bit.push(rAliased);
    }

    steps.push(
      colors.greenBright(
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
      colors.bold(`** Computing binary representation of decimal(${float})`),
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
        `${bkp} * ${coefficient} = ${result} (${colors.cyan(
          `R=${tmp.primely} alias ${colors.magentaBright(pAliased)}`
        )})`
      );
    }

    steps.push(
      colors.greenBright(
        `Computed, R(limit=${maxLengthFloat}) = ${(binFloat = bits.join(""))}`
      )
    );
  }

  steps.push("==========================================");
  steps.push(
    colors.cyan(
      `All done converted ${colors.magentaBright(
        value + ""
      )} to binary ${colors.magentaBright(`${binPrimely}.${binFloat ?? 0}`)}`
    )
  );

  return steps;
}
