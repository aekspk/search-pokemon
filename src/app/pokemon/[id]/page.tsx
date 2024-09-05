"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import client from "../../../../lib/apollo-client";
import { GetPokemonDetail } from "@/pokemonQueries";
import type { PokemonDetail } from "@/type";

export default function PokemonDetail() {
  const params = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const id = decodeURIComponent(params?.id ?? "");

  useEffect(() => {
    async function fetchPokemonDetail() {
      try {
        setLoading(true);
        const { data } = await client.query({
          query: GetPokemonDetail,
          variables: { id },
        });
        setPokemon(data.pokemon);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchPokemonDetail();
    } else {
      setError("Invalid Pokémon ID");
      setLoading(false);
    }
  }, [id]);

  const handleEvolutionClick = (evolutionId: string) => {
    window.location.href = `/pokemon/${encodeURIComponent(evolutionId)}`;
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

  if (loading)
    return (
      <div className="w-full flex justify-center">
        <span className="loading loading-dots loading-lg  flex justify-center"></span>
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!pokemon) return <div>No Pokémon data found.</div>;

  return (
    <div className="w-full flex justify-center text-slate-700">
      <div className="flex flex-col gap-6 items-center justify-center w-[360px] md:w-[700px]  xl:w-[1216px] 2xl:w-[1400px] ">
        <div className="text-2xl flex gap-2 text-slate-500 w-full">
          <p>#{pokemon.number}</p>
          <h1 className="font-semibold text-2xl text-slate-700">
            {pokemon.name}
          </h1>
        </div>
        <img src={pokemon.image} alt={pokemon.name} width={330} />
        {/* Pokemon Detail */}
        <div className="flex flex-col gap-4 border w-full rounded-[16px] p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-base font-semibold">Max CP</p>
              <p className="text-base font-md">{pokemon.maxCP}</p>
            </div>
            <div className="w-[160px]">
              <p className="text-base font-semibold">Max HP</p>
              <p className="text-base font-md">{pokemon.maxHP}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-base font-semibold">Category</p>
              <p className="text-base font-md">{pokemon.classification}</p>
            </div>
            <div className="w-[160px]">
              <p className="text-base font-semibold">Flee rate</p>
              <p className="text-base font-md">{pokemon.fleeRate}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-base font-semibold">Height</p>
              <p className="text-base font-regular">
                {pokemon.height.minimum} - {pokemon.height.maximum}
              </p>
            </div>
            <div className="w-[160px]">
              <p className="text-base font-semibold">Weight</p>
              <p className="text-base font-regular">
                {pokemon.weight.minimum} - {pokemon.weight.maximum}
              </p>
            </div>
          </div>
        </div>
        {/* Pokemon Type && Resistant && Weaknesse */}
        <div className="flex flex-col gap-4 border w-full rounded-[16px] p-6">
          <div className="flex flex-col gap-2">
            <p className="text-base font-semibold">Type</p>
            <div className="flex flex-wrap gap-2">
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
          </div>
          {/* Resistant */}
          <div className="flex flex-col gap-2">
            <p className="text-base font-semibold">Resistant</p>
            <div className="flex flex-wrap gap-2">
              {pokemon.resistant.map((resist) => (
                <div
                  key={resist}
                  className={`flex justify-center text-white text-base text-xs py-1 px-3 rounded-full ${getTypeColor(
                    resist
                  )}`}
                >
                  {resist}
                </div>
              ))}
            </div>
          </div>

          {/* Weaknesses */}
          <div className="flex flex-col gap-2">
            <p className="text-base font-semibold">Weaknesses</p>
            <div className="flex gap-2">
              {pokemon.weaknesses.map((weaknesses) => (
                <div
                  key={weaknesses}
                  className={`flex justify-center text-white text-base text-xs py-1 px-3 rounded-full ${getTypeColor(
                    weaknesses
                  )}`}
                >
                  {weaknesses}
                </div>
              ))}
            </div>
          </div>
        </div>

        <table className="min-w-full table-auto border-collapse border border-gray-300 ">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-base font-semibold">
                Attack Name
              </th>
              <th className="border px-4 py-2 text-base font-semibold">Type</th>
              <th className="border px-4 py-2 text-base font-semibold">
                Damage
              </th>
              <th className="border px-4 py-2 text-base font-semibold">
                Category
              </th>
            </tr>
          </thead>
          <tbody>
            {pokemon.attacks?.fast.map((attack) => (
              <tr key={attack.name}>
                <td className="border px-4 py-2">{attack.name}</td>
                <td className="border px-4 py-2">{attack.type}</td>
                <td className="border px-4 py-2">{attack.damage}</td>
                <td className="border px-4 py-2">Fast</td>
              </tr>
            ))}
            {pokemon.attacks?.special.map((attack) => (
              <tr key={attack.name}>
                <td className="border px-4 py-2">{attack.name}</td>
                <td className="border px-4 py-2">{attack.type}</td>
                <td className="border px-4 py-2">{attack.damage}</td>
                <td className="border px-4 py-2">Special</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Evolution */}
        {pokemon.evolutions && pokemon.evolutions.length > 0 && (
          <div className="border rounded-[16px] p-6 w-full flex justify-center">
            <div className="flex flex-col justify-center gap-4 w-full">
              <h2 className="w-full text-base font-semibold">Evolutions</h2>
              <div className="flex flex-col md:flex-row gap-8 justify-center w-full">
                <div className="flex flex-col items-center justify-center">
                  <div
                    className="bg-white shadow-md rounded-full p-2 flex flex-col items-center justify-center cursor-pointer w-[200px] h-[200px] overflow-hidden transform duration-500 hover:scale-105"
                    onClick={() => handleEvolutionClick(pokemon.id)}
                  >
                    <img
                      className="object-contain rounded-full"
                      src={pokemon.image}
                      alt={pokemon.name}
                    />
                  </div>
                  <h3 className="mt-2 text-base font-semibold">
                    {pokemon.name}
                  </h3>
                </div>
                {pokemon.evolutions?.map((evolution) => (
                  <div
                    className="flex flex-col items-center"
                    key={evolution.id}
                  >
                    <div
                      className="bg-white shadow-md rounded-full p-2 flex flex-col items-center justify-center cursor-pointer w-[200px] h-[200px] transform duration-500 hover:scale-105"
                      onClick={() => handleEvolutionClick(evolution.id)}
                    >
                      <img
                        src={evolution.image}
                        alt={evolution.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <h3 className="mt-2 text-base font-semibold">
                      {evolution.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
