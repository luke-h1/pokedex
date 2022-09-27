import Image from 'next/image';

interface Props {
  name: string;
  image: string;
  weight: number;
  xp: number;
  abilities: string[];
}

const PokemonCard = ({ name, image, weight, abilities, xp }: Props) => {
  return (
    <div className="pokemon-card-large">
      <h2>{name}</h2>
      <Image
        src={image}
        blurDataURL={image}
        placeholder="blur"
        alt={name}
        width="100px"
        height="100px"
      />
      <div className="card-section">
        <p className="card-section-title">XP</p>
        <div className="card-section-content">{xp}</div>
      </div>
      <div className="card-section">
        <p className="card-section-title">Weight</p>
        <div className="card-section-content">{weight / 10} KG</div>
      </div>
      <div className="card-section">
        <p className="card-section-title">Abilities</p>
        <ul>
          {abilities &&
            abilities.map(ability => <li key={ability}>{ability}</li>)}
        </ul>
      </div>
    </div>
  );
};
export default PokemonCard;
