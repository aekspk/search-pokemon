import { gql, ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { NextApiRequest, NextApiResponse } from "next";

const typeDefs = gql`
  type Pokemon {
    id: String
    number: String
    name: String!
    weight: Weight!
    height: Height!
    classification: String!
    types: [String!]!
    resistant: [String!]!
    weaknesses: [String!]!
    fleeRate: Float!
    maxCP: Int!
    maxHP: Int!
    image: String!
    attacks: Attacks
    evolutions: [Pokemon]
  }

  type Weight {
    minimum: String!
    maximum: String!
  }

  type Height {
    minimum: String!
    maximum: String!
  }

  type Attacks {
    fast: [Attack!]!
    special: [Attack!]!
  }

  type Attack {
    name: String!
    type: String!
    damage: Int!
  }

  type Query {
    pokemons(first: Int!): [Pokemon!]!
    pokemon(id: String): Pokemon
  }
`;

const resolvers = {
  Query: {
    pokemons: async (parent: any, args: { first: number }) => {
      const response = await fetch(`https://graphql-pokemon2.vercel.app`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query {
              pokemons(first: ${args.first}) {
                id
                name
                types
                image
              }
            }
          `,
        }),
      });
      const data = await response.json();
      return data.data.pokemons;
    },

    pokemon: async (parent: any, args: { id: string }) => {
      const response = await fetch(`https://graphql-pokemon2.vercel.app`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query {
              pokemon(id: "${args.id}") {
                id
                name
                number
                types
                image
                weight {
                  minimum
                  maximum
                }
                height {
                  minimum
                  maximum
                }
                classification
                resistant
                weaknesses
                fleeRate
                maxCP
                maxHP
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
          `,
        }),
      });
      const data = await response.json();
      return data.data.pokemon;
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  introspection: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = apolloServer.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startServer;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
}
