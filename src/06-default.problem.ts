// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const Form = z.object({
  repoName: z.string(),
  keywords: z
    .array(z.string())
    .optional()
    .default(['hello']),
});

type FormInput = z.input<typeof Form>;
type FormOutput = z.infer<typeof Form>;

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values);

  return parsedData;
};

// TESTS

it("Should include keywords if passed", async () => {
  const result = validateFormInput({
    repoName: "mattpocock",
    keywords: ["123"],
  });

  expect(result.keywords).toEqual(["123"]);
});

it("Should automatically add keywords if none are passed", async () => {
  const result = validateFormInput({
    repoName: "mattpocock",
  });

  expect(result.keywords).toEqual([]);
});

/**
 * Notes
 * We don't necessarily want null/undefined values in a form, so we'll want to set a 
 * default if the value is optional.
 * Again, Zod provides a `.default` method that must match its type.
 * Now that we have differences between input and output. We can infer types to handle this
 */