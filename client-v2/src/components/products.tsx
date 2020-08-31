import React, { useCallback } from "react";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import { ProductsQuery, ProductsQueryVariables } from "./__generated__/products-query";
import { ProductsQueryForVariables } from "./__generated__/products-query-for-variables";
import gql from "graphql-tag";

export default () => {
  const client = useApolloClient();
  const { data: variableData } = useQuery<ProductsQueryForVariables>(gql`
    query ProductsQueryForVariables {
      includeDescription @client
    }
  `);

  const { data, loading } = useQuery<ProductsQuery, ProductsQueryVariables>(gql`
    query ProductsQuery($includeDescription: Boolean!) {
      products (first: 10) {
        id
        name
        description @include(if: $includeDescription)
      }
    }
  `, {
    variables: {
      includeDescription: variableData?.includeDescription ?? false,
    },
  });

  const handleChangeCheckbox = useCallback(() => {
    const current = variableData?.includeDescription ?? false;
    client.writeData({
      data: {
        includeDescription: !current,
      },
    });
  }, [client, variableData]);

  if (loading || !data) {
    return (
      <div>loading...</div>
    );
  }

  return (
    <div>
      <div>
        <label>
          <input type="checkbox" checked={variableData?.includeDescription ?? false} onChange={handleChangeCheckbox} />
          Include description
        </label>
      </div>
      <ul>
        {data.products.map(({ id, name, description }) => (
          <li key={id}>
            <div>{name}</div>
            {description ?? (
              <p>{description}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
