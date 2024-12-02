// CODE

import { z } from "zod";

const StarWarsPerson = z.object({
  name: z.string(),
});

const StarWarsPeopleResults = z.object({
  results: z.array(StarWarsPerson),
});

// export type TStarWarsPeopleResults = z.infer<typeof StarWarsPeopleResults>

const logStarWarsPeopleResults = (
  data: z.infer<typeof StarWarsPeopleResults>
) => {
  data.results.map((person) => {
    console.log(person.name);
  });
};

/**
 * Notes
 * How do we infer StarWarsPeopleResults within the data arg in the log function?
 * We use the method `.infer`
 * ontop of this, we can save the infer into an exported type (line 13)
 */