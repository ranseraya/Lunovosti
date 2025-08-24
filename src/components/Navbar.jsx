import React from "react";
import Image from "next/image";
import news from "@/assets/icons/news.png";
import logo from "@/assets/LuminaraLogo.png";
import fotoProfile from "@/assets/profile.jpg";
import { Search, BellIcon } from "lucide-react";
import Link from "next/link";
import AuthButton from "./AuthButton";

const Navbar = () => {
  return (
    <nav className="relative w-full bg-white shadow-sm py-3 px-4 md:px-8 flex justify-between items-center h-[70px]">
      <Link href="/Home" aria-label="Luminara Home">
        <div className="flex items-center gap-2">
          <div className="relative h-10 w-10">
            <Image
              src={logo}
              alt="Luminara Logo"
              priority
            />
          </div>
          <h1 className="jacques text-[32px] text-gray-900">LUNOVOSTI</h1>
        </div>
      </Link>

      <div className="flex h-10 items-center gap-2 bg-gray-100 px-4 rounded-full shadow-inner md:w-[350px] border border-gray-300">
        <Search size={20} className="text-gray-500" aria-label="Search icon" />
        <input
          type="text"
          placeholder="Cari berita terkini..."
          className="w-full bg-transparent outline-none text-base text-gray-700 placeholder-gray-500"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          className="border border-gray-400 font-semibold text-sm px-5 h-10 rounded-full hover:bg-gray-100 transition"
          aria-label="Upgrade to Pro version"
        >
          Upgrade Pro
        </button>

        <button
          className="bg-[#ff8800] font-bold text-base px-5 h-10 rounded-full shadow-md hover:brightness-110 transition flex items-center gap-2"
          aria-label="Post an advertisement"
        >
          <Image src={news} alt="News icon" className="w-6" />
          Post Ads
        </button>

        <div
          className="h-10 w-10 border border-gray-400 flex justify-center items-center rounded-full overflow-hidden cursor-pointer hover:bg-gray-100 transition"
          aria-label="Notifications"
        >
          <BellIcon size={20} className="text-gray-600" />
        </div>
        <AuthButton />
      </div>
    </nav>
  );
};

export default Navbar;