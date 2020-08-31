import { makeVar, InMemoryCache } from "@apollo/client";

export const includeDescriptionVar = makeVar(false);

export function createCache() {
  return new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          includeDescription() {
            return includeDescriptionVar();
          }
        },
      },
    },
  });
}
