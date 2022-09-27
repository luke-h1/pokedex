import { ALL_POKEMON_SPECIES } from './pokemonSpecies';

const searchPokemons = (query: string): Promise<string[]> => {
  return new Promise(res => {
    const matchingPokemons = ALL_POKEMON_SPECIES.filter(({ name }) =>
      name.includes(query.toLowerCase()),
    ).map(({ name }) => name);

    setTimeout(() => {
      res(matchingPokemons);
    }, 500);
  });
};
export default searchPokemons;
