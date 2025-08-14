import React from "react";
import CardItemMedium from "./NewCardItemMedium";
import AdsSidebar from "./AdsSidebar";
import adsIcon from "@/assets/icons/ads.png";
import Image from "next/image";

const RecommendationNews = ({ articles }) => {
  return (
    <div className="flex flex-col md:flex-row gap-8 mt-10">
      <main className="w-full md:w-2/3">
        <div className="w-full flex justify-between">
          <h1 className="text-3xl font-bold">Topic might interest you</h1>
        </div>
          {articles.map((article, index) => (
            <CardItemMedium
              key={index}
              title={article.title}
              date={new Date(article.updated_at).toLocaleDateString()}
              img={article.featured_image_url}
              url={article.url}
            />
          ))}
      </main>
      <aside className="w-full md:w-1/3">
        <div className="sticky top-5">
          <div className="p-4 rounded-lg">
            <p className="text-sm text-gray-400 text-right">Advertisement</p>
            <div className="w-full h-64 flex items-center justify-center">
              <AdsSidebar />
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-gray-500 font-bold text-xs">
                Our Advertisement
              </p>
              <Image src={adsIcon} alt="adsIcon" className="w-8" />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default RecommendationNews;
