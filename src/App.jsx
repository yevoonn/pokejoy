import { useState, useEffect } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import { CssBaseline, Typography } from '@mui/joy';
import Sheet from '@mui/joy/Sheet';
import CardListComponent from './components/card/CardListComponent';

function App() {
	const [pokemonData, setPokemonData] = useState([]);

	useEffect(() => {
		fetch('https://pokeapi.co/api/v2/pokemon?limit=12')
			.then(response => response.json())
			.then(async data => {
				const pokemonList = await Promise.all(
					data.results.map(async (pokemon) => {
						const response = await fetch(pokemon.url);
						const pokemonDetails = await response.json();

						return {
							name: pokemonDetails?.name,
							types: pokemonDetails?.types.map(
								typeInfo => typeInfo.type.name
							),
							image: pokemonDetails?.sprites?.other?.['official-artwork']
								.front_default,
						};
					})
				);

				setPokemonData(pokemonList);
			})
			.catch(error => {
				console.error('Error fetching Pokémon data:', error);
			});
	}, []);

	return !pokemonData.length ?
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
					<CardListComponent cards={pokemonData} />
				</Sheet>
			</CssVarsProvider>
		)
}

export default App
