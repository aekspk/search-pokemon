"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Pokemon } from "@/type";
import { GetAllPokemon } from "@/pokemonQueries";
import Link from "next/link";

export default function LoadMorePokemons() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [count, setCount] = useState(12);
  const totalCount = 151;

  const { data, loading, error, fetchMore } = useQuery(GetAllPokemon, {
    variables: { first: count },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data) {
      setPokemons((prevPokemons) => [
        ...prevPokemons,
        ...data.pokemons.filter(
          (pokemon: Pokemon) => !prevPokemons.some((p) => p.id === pokemon.id)
        ),
      ]);
    }
  }, [data]);

  const loadMore = async () => {
    const newCount = count + 12;
    setCount(newCount);

    await fetchMore({
      variables: { first: newCount },
    });
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "fire":
        return "bg-red-500";
      case "water":
        return "bg-blue-500";
      case "grass":
        return "bg-green-500";
      case "electric":
        return "bg-yellow-500";
      case "psychic":
        return "bg-pink-500";
      case "ice":
        return "bg-cyan-500";
      case "dragon":
        return "bg-purple-500";
      case "dark":
        return "bg-gray-800";
      case "fairy":
        return "bg-pink-300";
      case "poison":
        return "bg-purple-500";
      case "bug":
        return "bg-green-800";
      case "normal":
        return "bg-gray-400";
      case "fighting":
        return "bg-red-800";
      case "flying":
        return "bg-blue-300";
      case "ground":
        return "bg-yellow-800";
      case "rock":
        return "bg-yellow-400";
      case "ghost":
        return "bg-indigo-800";
      case "steel":
        return "bg-gray-600";
      default:
        return "bg-gray-500";
    }
  };

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <div className="w-[360px] md:w-[700px] xl:w-[1216px] 2xl:w-[1400px]  grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 flex gap-4">
        {pokemons.map((pokemon) => (
          <Link
            href={`/pokemon/${pokemon.id}`}
            key={pokemon.id}
            className="bg-white relative flex flex-auto flex-col overflow-hidden rounded-2xl p-6 border transform duration-500 hover:scale-105 hover:cursor-pointer hover:shadow-lg"
          >
            <div className="flex gap-1">
              <p className="text-slate-500">#{pokemon.number}</p>
              <h2 className="text-slate-700 font-semibold">{pokemon.name}</h2>
            </div>
            <img
              className="h-[360px] w-[330px] p-4 object-contain"
              src={pokemon.image}
              alt={pokemon.name}
            />
            <div className="flex justify-center gap-2 ">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className={`flex justify-center text-white text-base text-xs py-1 px-3 rounded-full ${getTypeColor(
                    type
                  )}`}
                >
                  {type}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
      {pokemons.length !== totalCount && (
        <button
          onClick={loadMore}
          disabled={loading}
          className="bg-[#3A3333] font-bold py-2 px-4 rounded-full text-white hover:bg-red-500"
        >
          {loading ? (
            <span className="loading loading-dots loading-md text-white"></span>
          ) : (
            "Load more"
          )}
        </button>
      )}
    </div>
  );
}
