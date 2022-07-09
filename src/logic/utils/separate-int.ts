export function separateInt(value: number) {
  //
  const [primely, decimal = 0] = value.toString().split(".");

  return {
    primely: parseInt(primely, 10),
    float: parseFloat(`0.${decimal}`),
  };
}
