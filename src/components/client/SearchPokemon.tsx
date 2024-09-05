import { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { GetAllPokemon } from "@/pokemonQueries";
import { Pokemon } from "@/type";
import Link from "next/link";

export default function SearchPokemon() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [showSearchResult, setShowSearchResult] = useState(false); // เริ่มต้นเป็น false
  const inputRef = useRef<HTMLDivElement>(null);

  const { data, error } = useQuery(GetAllPokemon, {
    variables: { first: 1000 },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (searchTerm.length > 0 && showSearchResult) {
      if (data && data.pokemons) {
        const matchedPokemons = data.pokemons
          .filter((pokemon: Pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice(0, 5);
        setFilteredPokemons(matchedPokemons);
      }
    } else {
      setFilteredPokemons([]);
    }
  }, [searchTerm, data, showSearchResult]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowSearchResult(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setShowSearchResult(false);
    }
  };

  const handleInputClick = () => {
    if (searchTerm.length > 0) {
      setShowSearchResult(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectPokemon = (pokemonName: string) => {
    setSearchTerm(pokemonName);
    setShowSearchResult(false);
  };

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="" ref={inputRef}>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={handleInputChange}
        onClick={handleInputClick}
        className="border border-gray-300 p-2 px-6 rounded-full w-[360px] md:w-[400px] bg-white text-slate-700"
      />
      {showSearchResult && searchTerm.length > 0 && (
        <div className="mt-4 absolute w-full z-10 bg-white shadow-md w-fit h-fit rounded-lg">
          {filteredPokemons.length > 0 ? (
            filteredPokemons.map((pokemon) => (
              <Link
                href={`/pokemon/${pokemon.id}`}
                key={pokemon.id}
                className="text-slate-700 cursor-pointer block p-2 hover:bg-slate-50 w-[400px]"
                onClick={() => handleSelectPokemon(pokemon.name)}
              >
                <span className="font-base px-2">{pokemon.name}</span>
              </Link>
            ))
          ) : (
            <div className="block flex justify-center items-center p-3 rounded-md w-[400px] text-gray-500">
              No Pokémon found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
