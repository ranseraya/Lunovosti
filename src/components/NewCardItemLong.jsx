import Image from "next/image";
import Link from "next/link";

const CardItemLong = ({ title, url }) => {
  return (
    <Link href={url || "#"} target="_blank" className=" cursor-pointer group">
      <div className="flex cursor-pointer border-2 bg-white border-gray-200 w-full h-10 px-2.5 rounded-sm">
        <div className="flex flex-col items-start justify-center pr-10">
          <p className="font-bold text-lg text-ellipsis line-clamp-1 group-hover:text-orange-500 transition-colors duration-300">
            {title}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CardItemLong;
