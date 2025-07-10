import React from "react";
import CardItemSmall from "./NewCardItemSmall";

const HeadlineNews = ({articles}) => {
  return (
    <div className="my-10 flex flex-col items-center">
      <div className="w-full flex justify-between">
        <h1 className="text-3xl font-bold">
            Headline
        </h1>
        {/* <button className="bg-[#f8a778] font-bold text-orange-800 text-xl h-10 w-30 rounded-full shadow-md hover:brightness-110 transition">
          Top News
        </button> */}
      </div>
      <div className="my-2 grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6">
        {articles && articles.length > 0 ? (
            articles.map(([category, item], index) => (
                <CardItemSmall
                  key={index}
                  title={item.title}
                  date={new Date(item.publishedAt).toLocaleDateString()}
                  tag={category}
                  img={item.urlToImage}
                  url={item.url}
                />
            ))
        ) : (
          <p>Berita tidak tersedia saat ini.</p>
        )}
      </div>
    </div>
  );
};

export default HeadlineNews;
