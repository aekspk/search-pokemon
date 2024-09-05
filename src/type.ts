// types.ts
export interface Pokemon {
  id: string;
  number: string;
  name: string;
  types: string[];
  image: string;
}

export interface PokemonDetail extends Pokemon {
  number: string;
  weight: {
    minimum: string;
    maximum: string;
  };
  height: {
    minimum: string;
    maximum: string;
  };
  classification: string;
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  attacks: {
    fast: {
      name: string;
      type: string;
      damage: number;
    }[];
    special: {
      name: string;
      type: string;
      damage: number;
    }[];
  };
  evolutions: Pokemon[];
}
