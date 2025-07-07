import React from "react";
import Image from "next/image";

const NewTag = ({ label, icon }) => {
  return (
    <button className="flex cursor-pointer w-34 items-center justify-center gap-2 border border-black py-2.5 rounded-full hover:bg-gray-300 transition">
      {/* {Icon && <Icon size={16} />} */}
      <Image src={icon} alt={label} width={24} height={24} />
      <span className="text-xs font-bold">{label}</span>
    </button>
  );
};

export default NewTag;