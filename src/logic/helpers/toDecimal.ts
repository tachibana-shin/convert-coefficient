export function toDecimal(
  bin: string,
  {
    coefficient = 2,
  }: {
    coefficient?: number;
  } = {}
) {
  const steps = [];
  const length = bin.split(".")[0].length;

  let decimal = 0;
  for (let i = 0; i < bin.length; i++) {
    if (bin[i] === ".") continue;

    const m = length - i - (i >= length ? 0 : 1);
    const bit = Number(parseInt(bin[i] as string, coefficient));
    const result = bit * coefficient ** m;

    steps.push(`bit[${i}]: ${bit} * ${coefficient}^${m} = ${result}`);
    decimal += result;
  }

  steps.push({
    message: `Computed, decimal sum = ${decimal}`,
    color: "green",
  });

  return steps;
}

console.log(
  toDecimal("ff", {
    coefficient: 16
  })
);
