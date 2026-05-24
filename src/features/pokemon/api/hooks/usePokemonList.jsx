import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_POKEMON_LIST } from "../queries";
import { mapPokemonList } from "../mappers";

export const usePokemonList = () => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    GET_POKEMON_LIST,
    {
      variables: {
        limit,
        offset: 0,
      },

      notifyOnNetworkStatusChange: true,
    },
  );

  const loadMore = async () => {
    const newOffset = offset + limit;

    await fetchMore({
      variables: {
        offset: newOffset,
        limit,
      },

      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }

        return {
          pokemon: [...previousResult.pokemon, ...fetchMoreResult.pokemon],
        };
      },
    });

    setOffset(newOffset);
  };

  return {
    pokemonData: data?.pokemon?.map(mapPokemonList) ?? [],
    loading,
    error,
    loadMore,
    isInitialLoading: networkStatus === 1,
    isFetchingMore: networkStatus === 3,
  };
};
