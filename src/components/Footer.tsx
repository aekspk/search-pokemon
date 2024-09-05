import Link from "next/link";

export default function Footer() {
  return (
    <nav className="bg-white w-full h-[100px] flex justify-center ">
      <div className="flex text-slate-500 gap-4 items-center justify-center w-[1216px] 2xl:w-[1400px] text-sm ">
        <Link href="">Aekachai Sangpak | © 2024 Pokémon Search </Link>
      </div>
    </nav>
  );
}
