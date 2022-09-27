import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import PokemonCard from '../../components/PokemonCard';

const fetchPokemon = (id: string) =>
  axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(({ data }) => data);

const PokemonPage = () => {
  const router = useRouter();
  const pokemonId = typeof router.query.id === 'string' ? router.query.id : '';

  const {
    isSuccess,
    data: pokemon,
    isLoading,
    isError,
  } = useQuery(['getPokemon', pokemonId], () => fetchPokemon(pokemonId), {
    enabled: pokemonId.length > 0,
    staleTime: Infinity,
  });

  if (isSuccess) {
    return (
      <div className="container">
        <PokemonCard
          name={pokemon.name}
          image={pokemon.sprites?.other?.['official-artwork']?.front_default}
          weight={pokemon.weight}
          xp={pokemon.base_experience}
          abilities={pokemon.abilities?.map(
            (item: { ability: { name: string } }) => item.ability.name,
          )}
        />
      </div>
    );
  }
  if (isLoading) {
    return <div className="center">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="center">
        We couldn't find your pokemon{' '}
        <span role="img" aria-label="sad">
          😢
        </span>
      </div>
    );
  }
  return null;
};
export default PokemonPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ctx => {
  const id = ctx.params?.id as string;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['getPokemon', id], () => fetchPokemon(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
 