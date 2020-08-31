import React, { useCallback } from "react";
import { makeVar, gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react/hooks";
import { ProductsQuery, ProductsQueryVariables } from "./__generated__/products-query";
import { ProductsVariablesQuery } from "./__generated__/products-variables-query";
import { includeDescriptionVar } from "../cache";

export default () => {
  const { data: varData } = useQuery<ProductsVariablesQuery>(gql`
    query ProductsVariablesQuery {
      includeDescription @client
    }
  `);

  const { data, loading } = useQuery<ProductsQuery, ProductsQueryVariables>(gql`
    query ProductsQuery($includeDescription: Boolean!) {
      products(first: 10) {
        id
        name
        description @include(if: $includeDescription)
      }
    }
  `, {
    variables: {
      includeDescription: varData?.includeDescription ?? false,
    },
  });

  const handleChange = useCallback(() => {
    const current = varData?.includeDescription ?? false;
    includeDescriptionVar(!current);
  }, [varData])

  if (loading || !data) {
    return (
      <div>loading...</div>
    );
  }

  return (
    <div>
      <div>
        <label>
          <input type="checkbox" checked={varData?.includeDescription ?? false} onChange={handleChange} />
          Include description
        </label>
      </div>
      <ul>
        {data.products.map(({ id, name, description }) => (
          <li key={id}>
            <div>{name}</div>
            <p>{description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
