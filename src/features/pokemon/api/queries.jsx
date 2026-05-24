import { gql } from "@apollo/client";

export const GET_POKEMON_LIST = gql`
  query pokemonListQuery($limit: Int!, $offset: Int!) {
    pokemon(limit: $limit, offset: $offset, order_by: { id: asc }) {
      id
      name

      pokemontypes {
        type {
          name
        }
      }

      pokemonsprites {
        sprites
      }
    }
  }
`;
