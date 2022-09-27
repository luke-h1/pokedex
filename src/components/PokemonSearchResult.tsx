import Link from 'next/link';

interface Props {
  pokemons: string[];
}

const PokemonsSearchResult = ({ pokemons }: Props) => {
  return pokemons.length > 0 ? (
    <div className="search-grid">
      {pokemons &&
        pokemons.map(poke => (
          <Link href={`/pokemon/${poke}`} key={poke}>
            <a className="pokemon-card">{poke}</a>
          </Link>
        ))}
    </div>
  ) : (
    <div className="search-message">No pokemons found</div>
  );
};
export default PokemonsSearchResult;
