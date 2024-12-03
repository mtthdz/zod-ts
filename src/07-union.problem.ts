// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const Form = z.object({
  repoName: z.string(),
  privacyLevel: z.union([
    z.literal('private'),
    z.literal('public')
  ])
});

// .enum(['private', 'public'])
type TForm = z.infer<typeof Form>;

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values);

  return parsedData;
};


it("Should fail if an invalid privacyLevel passed", async () => {
  expect(() =>
    validateFormInput({
      repoName: "mattpocock",
      privacyLevel: "something-not-allowed",
    }),
  ).toThrowError();
});

it("Should permit valid privacy levels", async () => {
  expect(
    validateFormInput({
      repoName: "mattpocock",
      privacyLevel: "private",
    }).privacyLevel,
  ).toEqual("private");

  expect(
    validateFormInput({
      repoName: "mattpocock",
      privacyLevel: "public",
    }).privacyLevel,
  ).toEqual("public");
});

/**
 * Notes
 * privacyLevel requires a union or enum in TS. We'll want to implement Zod for this.
 * one solution is to use `.union` with `.literal` methods nested within
 * `.enum` is a cleaner approach (line 14)
 */