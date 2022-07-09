import { describe, test, expect } from "vitest";
import { separateInt } from "./separate-int";

describe("separate int", () => {
  test("has decimal 0.???", () => {
    expect(separateInt(100.123)).toEqual({
      primely: 100,
      float: 0.123,
    });
  });
  test("int", () => {
    expect(separateInt(100)).toEqual({
      primely: 100,
      float: 0,
    });
  });
});
