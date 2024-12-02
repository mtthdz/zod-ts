// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const numberParser = z.number();

export const toString = (num: unknown) => {
  const parsed = numberParser.parse(num);
  return String(parsed);
};

// TESTS

it("Should throw a runtime error when called with not a number", () => {
  expect(() => toString("123")).toThrowError(
    "Expected number, received string",
  );
});

it("Should return a string when called with a number", () => {
  expect(toString(1)).toBeTypeOf("string");
});

/**
 * Notes
 * Zod is really useful at type checking at both runtime and type level
 * z methods such as `.number` as well as `.parse` are building block methods
 */