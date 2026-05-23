import { useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { CssBaseline, Typography } from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import CardListComponent from "./components/card/CardListComponent";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import Sync from "@mui/icons-material/Sync";
import Box from "@mui/joy/Box";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_POKEMON_DATA = gql`
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

function App() {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    GET_POKEMON_DATA,
    {
      variables: {
        limit,
        offset: 0,
      },
      notifyOnNetworkStatusChange: true,
    },
  );

  const handleLoadMore = async () => {
    const newOffset = offset + limit;

    await fetchMore({
      variables: {
        offset: newOffset,
        limit,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prevResult;
        }

        return {
          pokemon: [...prevResult.pokemon, ...fetchMoreResult.pokemon],
        };
      },
    });

    setOffset(newOffset);
  };

  if (networkStatus === 1) {
    return (
      <Typography level="h1" sx={{ mb: 4, textAlign: "center" }}>
        Loading...
      </Typography>
    );
  }

  if (error) {
    return <Typography level="h1">Error loading data</Typography>;
  }

  const pokemonData = data.pokemon.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.pokemontypes.map((typeInfo) => typeInfo.type.name),
    image:
      pokemon.pokemonsprites?.[0]?.sprites?.other?.["official-artwork"]
        ?.front_default,
  }));

  return (
    <CssVarsProvider>
      <CssBaseline />

      <Sheet
        sx={{
          minHeight: "100vh",
          p: 4,
          bgcolor: "background.level1",
        }}
      >
        <Typography
          level="h1"
          sx={{
            mb: 4,
            textAlign: "center",
          }}
        >
          PokeJoy
        </Typography>

        <CardListComponent cards={pokemonData} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
          }}
        >
          <Button
            onClick={handleLoadMore}
            startDecorator={loading ? <CircularProgress size="sm" /> : <Sync />}
            sx={{
              "--Button-gap": "8px",
            }}
          >
            Load more
          </Button>
        </Box>
      </Sheet>
    </CssVarsProvider>
  );
}

export default App;
