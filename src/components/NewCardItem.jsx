import Image from "next/image";
import Link from "next/link";

const CardItem = ({ title, date, tag, img, url }) => {
  const imageUrl =
    typeof img === "string" ? `/api/image?url=${encodeURIComponent(img)}` : img;
  return (
    <Link
      href={url || "#"}
      target="_blank"
      className="cursor-pointer bg-white w-86 p-3 rounded-sm flex flex-col"
    >
      <div className="relative w-full h-48 overflow-hidden rounded-md">
        <Image
          src={imageUrl}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="group-hover:scale-105 transition-transform duration-300"
          priority
        />
        <div className="absolute top-2 left-2 w-auto px-2 text-center font-bold text-sm bg-gray-200 rounded-xl">
          {tag}
        </div>
      </div>

      <div className="flex flex-col flex-grow mt-3">
        <p className="font-bold text-sm flex-grow">{title}</p>
        <p className="text-xs text-gray-500 font-medium mt-2">{date}</p>
      </div>
    </Link>
  );
};

export default CardItem;
