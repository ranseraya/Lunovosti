import React from "react";
import CardItemLong from "./NewCardItemLong";
import Image from "next/image";
const ContainerCategory = ({ title1, title2, date, img, color, articles}) => {
  return (
    <div className="my-5 flex flex-col px-8 relative">
      <div className="w-full flex justify-between items-center mb-5 relative">
        <div className="text-3xl font-bold w-[25%]">{title1}</div>
        <div className={`w-[50%] h-1 bg-${color}-500`}></div>
        <div className="w-[25%] text-end font-bold text-xl cursor-pointer">
          Explore All {title1}
        </div>
      </div>
      <div className="flex justify-between">
        <div
          className="relative w-[400px] h-[220px] bg-cover bg-center flex flex-col justify-center items-end p-6 text-white overflow-hidden"
        >
          {img && (
            <Image src={img} alt={title2} fill className="object-cover" />
          )}
          <div className="font-bold text-lg text-white absolute text-ellipsis line-clamp-2 ml-2 mr-10 p-1 px-2 bottom-4 bg-black">{title2}</div>
          <p className="text-white font-normal text-sm absolute top-2 right-6 px-1 bg-amber-600">{date}</p>
        </div>
        <div className="flex flex-col overflow-auto no-scrollbar scroll-smooth w-[600px] h-[220px] gap-1">
          {articles.map((article, index) => {
            return (
              <CardItemLong key={index} title={article.title} url={article.url}/>
            )
          })}
        </div>
      </div>
      <div className={`w-full mt-2 h-1 bg-${color}-500`}></div>
    </div>
  );
};

export default ContainerCategory;
