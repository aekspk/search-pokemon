"use client";
import Image from "next/image";
import SearchPokemon from "./SearchPokemon";
import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="bg-white w-full h-[150px] md:h-[100px] flex justify-center mb-12 border-b">
      <div className="md:flex gap-4 items-center justify-between w-[360px] md:w-[700px] lg:w-[1000] xl:w-[1216px] 2xl:w-[1400px]">
        <Image
          className="w-[150px] h-auto cursor-pointer"
          src="/logo.webp"
          alt={"logo image"}
          width={150}
          height={150}
          onClick={() => window.location.replace("/")}
        ></Image>
        <SearchPokemon />
      </div>
    </nav>
  );
}
