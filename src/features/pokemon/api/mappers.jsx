export const mapPokemonList = (pokemon) => ({
  id: pokemon.id,
  name: pokemon.name,
  types: pokemon.pokemontypes.map((typeInfo) => typeInfo.type.name),
  image:
    pokemon.pokemonsprites?.[0]?.sprites?.other?.["official-artwork"]
      ?.front_default,
});
