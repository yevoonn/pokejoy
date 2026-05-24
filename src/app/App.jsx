import { CssVarsProvider } from "@mui/joy/styles";
import Sync from "@mui/icons-material/Sync";
import {
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  Sheet,
  Typography,
} from "@mui/joy";
import CardListComponent from "../components/card/CardListComponent";
import { usePokemonList } from "../features/pokemon/api/hooks/usePokemonList";

function App() {
  const { pokemonData, error, loadMore, isInitialLoading, isFetchingMore } =
    usePokemonList();

  if (isInitialLoading) {
    return (
      <Typography level="h1" sx={{ mb: 4, textAlign: "center" }}>
        Loading...
      </Typography>
    );
  }

  if (error) {
    return <Typography level="h1">Error loading data</Typography>;
  }

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
            onClick={loadMore}
            startDecorator={
              isFetchingMore ? <CircularProgress size="sm" /> : <Sync />
            }
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
