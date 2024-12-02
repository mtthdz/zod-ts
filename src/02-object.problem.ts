// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const PersonResult = z.object({
  name: z.string(),
  eye_color: z.string()
});

export const fetchStarWarsPersonName = async (id: string) => {
  const data = await fetch(
    "https://www.totaltypescript.com/swapi/people/" + id + ".json",
  ).then((res) => res.json());

  const parsedData = PersonResult.parse(data);
  // console.log(parsedData);
  return parsedData.name;
};

// TESTS

it("Should return the name", async () => {
  expect(await fetchStarWarsPersonName("1")).toEqual("Luke Skywalker");
  expect(await fetchStarWarsPersonName("2")).toEqual("C-3PO");
});

/**
 * Notes
 * Another very frequent problem, not knowing API payloads
 * We can setup Zod's version of an interface that we can use to parse the API payload
 * The powerful thing is that the parsedData returns the API data stripped of any keys
 * that were not defined in `PersonResult` (line 17)
 */