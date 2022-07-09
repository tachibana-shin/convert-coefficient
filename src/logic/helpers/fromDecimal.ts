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
    steps.push(`Split ${value} into primely(${primely}) and decimal(${float})`);
    steps.push({
      message: `Computing binary representation of primely(${primely})`,
      color: "grey",
    });
  }

  if (primely !== 0) {
    const bit = [];

    for (; primely > 0; ) {
      const r = primely % coefficient;
      const bkp = primely;
      primely = ~~(primely / coefficient);

      const rAliased = r.toString(coefficient);
      steps.push(
        `${bkp} / ${coefficient} = ${primely} (R=${r} alias ${rAliased})`
      );
      bit.push(rAliased);
    }

    steps.push({
      message: `Computed, reverse array bit R = ${(binPrimely = bit
        .reverse()
        .join(""))}`,
      color: "green",
    });
  }

  let binFloat;
  if (float !== 0) {
    steps.push({
      message: `Computing binary representation of decimal(${float})`,
      color: "grey",
    });

    const bits = [];
    for (let i = 0; i < maxLengthFloat && float !== 0; i++) {
      const bkp = float;
      const result = float * coefficient;
      const tmp = separateInt(result);
      float = tmp.float;

      const pAliased = tmp.primely.toString(coefficient);
      bits.push(pAliased);
      steps.push(
        `${bkp} * ${coefficient} = ${result} (R=${tmp.primely} alias ${pAliased})`
      );
    }

    steps.push({
      message: `Computed, R(limit=${maxLengthFloat}) = ${(binFloat =
        bits.join(""))}`,
      color: "green",
    });
  }

  steps.push("==========================================");
  steps.push(
    `All done converted ${value} to binary ${binPrimely}.${binFloat ?? 0}`
  );

  return steps;
}

console.log(
  fromDecimal(255.00123, {
    coefficient: 16,
  })
);
