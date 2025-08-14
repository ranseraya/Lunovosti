import React from "react";
import CardItemSmall from "./NewCardItemSmall";

const HeadlineNews = ({articles}) => {
  console.log(articles[0]);
  return (
    <div className="my-10 flex flex-col items-center">
      <div className="w-full flex justify-between">
        <h1 className="text-3xl font-bold">
            Headline
        </h1>
      </div>
      <div className="my-2 grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6">
        {articles && articles.length > 0 ? (
            articles.map(([category, article], index) => (
                <CardItemSmall key={index} article={article} tag={category}/>
            ))
        ) : (
          <p>News is not available at this time.</p>
        )}
      </div>
    </div>
  );
};

export default HeadlineNews;
