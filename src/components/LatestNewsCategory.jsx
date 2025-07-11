import React from "react";
import ContainerCategory from "./NewContainerCategory";
import Ads from "./Ads";

const categoryColors = {
  technology: "blue",
  entertainment: "orange",
  sports: "red",
  business: "yellow",
  general: "purple",
  world: "blue",
  'science and health': "green",
  default: "gray",
};

const LatestNewsCategory = ({ newsData }) => {
  return (
    <div className="flex flex-col gap-1">
      {Object.entries(newsData).map(([category, articles], index) => {
        const firstArticle = articles[0];
        if (!firstArticle) {
          return null;
        }
        return (
           <React.Fragment key={category}>
            <ContainerCategory
              title1={category}
              title2={firstArticle.title}
              date={new Date(firstArticle.publishedAt).toLocaleDateString(
                "id-ID"
              )}
              img={firstArticle.urlToImage}
              color={categoryColors[category] || categoryColors.default}
              articles={articles}
            />
            {(index + 1) % 3 === 0 && <Ads />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default LatestNewsCategory;
