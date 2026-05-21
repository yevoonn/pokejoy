import { useState, useEffect } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import { CssBaseline, Typography } from '@mui/joy';
import Sheet from '@mui/joy/Sheet';
import CardListComponent from './components/card/CardListComponent';
import Button from '@mui/joy/Button';
import CircularProgress from '@mui/joy/CircularProgress';
import Sync from '@mui/icons-material/Sync';
import Box from '@mui/joy/Box';

function App() {
	const [isLoading, setIsLoading] = useState(false);
	const [pokemonData, setPokemonData] = useState({});
	const [offset, setOffset] = useState(0);
	const limit = 10;

	const fetchPokemonData = (currentOffset) => {
		return fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${currentOffset}`)
			.then(response => response.json())
			.then(async data => {
				const pokemonList = await Promise.all(
					data.results.map(async (pokemon) => {
						const response = await fetch(pokemon.url);
						const pokemonDetails = await response.json();

						return {
							id: pokemonDetails?.id,
							name: pokemonDetails?.name,
							types: pokemonDetails?.types.map(
								typeInfo => typeInfo.type.name
							),
							image: pokemonDetails?.sprites?.other?.['official-artwork']
								.front_default,
						};
					})
				);

				const newData = pokemonList.reduce((acc, p) => ({ ...acc, [p.id]: p }), {});
				setPokemonData(prev => ({ ...prev, ...newData }));
			})
			.catch(error => {
				console.error('Error fetching Pokémon data:', error);
			});
	};

	useEffect(() => {
		fetchPokemonData(0);
	}, []);

	const handleLoadMore = () => {
		setIsLoading(true);
		const newOffset = offset + limit;
		setOffset(newOffset);
		fetchPokemonData(newOffset).finally(() => setIsLoading(false));
	};

	return !Object.keys(pokemonData).length ?
		<Typography level="h1" sx={{ mb: 4, textAlign: "center" }}>
			Loading...
		</Typography>
		:
		(
			<CssVarsProvider>
				<CssBaseline />
				<Sheet sx={{ minHeight: "100vh", p: 4, bgcolor: 'background.level1' }}>
					<Typography level="h1" sx={{ mb: 4, textAlign: "center" }}>
						PokeJoy
					</Typography>
					<CardListComponent cards={Object.values(pokemonData)} />
					<Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
						<Button 
							onClick={handleLoadMore}
							startDecorator={isLoading ? <CircularProgress size="sm" /> : <Sync />}
							sx={{
								"--Button-gap": "8px"
							}}
						>
							{isLoading ? 'Loading...' : 'Load more'}
						</Button>
					</Box>
				</Sheet>
			</CssVarsProvider>
		)
}

export default App
