import Image from "next/image";
import Link from "next/link";
import { slugify } from "@/app/utils/helper";

const CardItemSmall = ({article, tag}) => {
  const { title, date, img, url } = article;
  if (!title) return null;
  const slug = slugify(title);
  return (
    <Link
      href={{
        pathname: `/article/${slug}`,
        query: {
          title: title,
          originalUrl: url
        },
      }}
      target="_blank"
      className="flex flex-col h-full bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="flex cursor-pointer border-2 bg-white border-gray-200 w-full h-24 p-2.5 rounded-sm">
        <div className="relative w-[30%] h-20 overflow-hidden flex items-center justify-center">
          <Image
            className="text-xs"
            src={img}
            alt={title}
            height={100}
            width={200}
            priority
          />
        </div>
        <div className="px-4 flex flex-col flex-grow w-[70%]">
          <p className="text-xs font-bold mb-2 hover:text-orange-600 transition-colors text-ellipsis line-clamp-2">
            {title}
          </p>
          <div className="w-full flex justify-between">
            <p className="text-xs text-gray-500 font-medium">{date}</p>
            <p className="text-[10px] text-white bg-blue-700 flex justify-center items-center px-0.5 rounded-xs">
              {tag}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardItemSmall;
