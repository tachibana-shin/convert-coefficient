const colorsMap = {
  magentaBright: "color:#F5F",
  greenBright: "color:#5F5",
  bold: "font-weight:bold;text-decoration:none;font-style:normal",
  cyan: "color:#0AA",
};

export const colors = Object.fromEntries(
  Object.entries(colorsMap).map(([name, style]) => {
    return [
      name,
      (text) => {
        return `<span style="${style}">${text}</span>`;
      },
    ];
  })
) as Record<keyof typeof colorsMap, (v: string) => string>;
