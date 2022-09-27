import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import PokemonsSearchResult from '../components/PokemonSearchResult';
import useDebounce from '../hooks/useDebounce';
import searchPokemons from '../utils/searchPokemons';

const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 300);

  const {  isError, isSuccess, data } = useQuery(
    ['searchPokemons', debouncedSearchValue],
    () => searchPokemons(debouncedSearchValue),
    {
      enabled: debouncedSearchValue.length > 0,
    },
  );

  const renderResult = () => {

    if (isError) {
      return <div className="search-message"> Something went wrong </div>;
    }

    if (isSuccess) {
      return <PokemonsSearchResult pokemons={data} />;
    }

    return null;
  };
  return (
    <div className="home">
      <h1>Search pokemons</h1>
      <input
        type="text"
        onChange={e => setSearchValue(e.target.value)}
        value={searchValue}
      />
      {renderResult()}
    </div>
  );
};

export default Home;
