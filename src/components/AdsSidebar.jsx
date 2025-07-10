import React from "react";
import adsFamily from "@/assets/family.jpg";
import Image from "next/image";
import Link from "next/link";

const AdsList = [
  {
    title: "Pilihan Asuransi Terbaik",
    titleLast: "Untuk Pekerja Tetap",
    titleButton: "Get Started",
    image: adsFamily,
  },
];
const AdsSidebar = () => {
  return (
    <Link
      href={"#"}
      target="_blank"
      className="w-full h-full block relative text-white rounded-lg group"
    >
      <Image
        src={AdsList[0].image.src}
        alt={AdsList[0].title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      <div className="relative h-full flex flex-col justify-end p-4">
        <h3 className="text-xl font-bold leading-tight">{AdsList[0].title}</h3>
        <p className="mt-2 bg-orange-600 text-white font-semibold py-2 px-4 rounded-full text-center text-sm w-fit group-hover:bg-orange-700 transition-colors">
          {AdsList[0].titleButton}
        </p>
      </div>
    </Link>
  );
};

export default AdsSidebar;
