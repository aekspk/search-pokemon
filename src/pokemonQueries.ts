import { gql } from "apollo-server-core";

export const GetAllPokemon = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      types
      image
    }
  }
`;

export const GetPokemonDetail = gql`
  query pokemon($id: String) {
    pokemon(id: $id) {
      id
      name
      number
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      evolutions {
        id
        name
        types
        image
      }
    }
  }
`;
