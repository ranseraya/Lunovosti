"use client";
import CardItem from "./NewCardItem";
import { useState } from "react";
import { usePagination, DOTS } from "@/hooks/usePagination";

const LatestNews = ({ articles }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;

  const paginationRange = usePagination({
    currentPage,
    totalCount: articles.length,
    siblingCount: 1,
    pageSize: articlesPerPage,
  });
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const totalArticles = articles.length;
  const totalPages = Math.ceil(totalArticles / articlesPerPage);
  const indexOfLastArticles = currentPage * articlesPerPage;
  const indexOfFirstArticles = indexOfLastArticles - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticles,
    indexOfLastArticles
  );

  const onNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const onPrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="my-10 flex flex-col items-center">
      <div className="w-full flex justify-between">
        <div className="text-3xl font-bold">
          Latest Trend News
          <br />
          Good for Curiousiry
        </div>
        <button className="bg-[#f8a778] font-bold text-orange-800 text-xl h-10 w-30 rounded-full shadow-md hover:brightness-110 transition">
          Up To Date
        </button>
      </div>
      <div className="my-10 grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6">
        {articles && articles.length > 0 ? (
          currentArticles.map((item, index) => (
            <CardItem
              key={index}
              title={item.title}
              date={new Date(item.publishedAt).toLocaleDateString()}
              tag="Latest"
              img={item.image}
              url={item.url}
            />
          ))
        ) : (
          <p>Berita tidak tersedia saat ini.</p>
        )}
      </div>
      <ul className="flex list-none items-center gap-2">
        <li
          className={`px-3 py-1 rounded-md text-center ${
            currentPage === 1
              ? "pointer-events-none text-gray-400"
              : "cursor-pointer"
          }`}
          onClick={onPrevious}
        >
          Prev
        </li>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li key={DOTS + index} className="px-3 py-1">
                &#8230;
              </li>
            );
          }

          return (
            <li
              key={pageNumber}
              className={`px-3 py-1 rounded-md text-center cursor-pointer ${
                currentPage === pageNumber
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => goToPage(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
        <li
          className={`px-3 py-1 rounded-md text-center ${
            currentPage === lastPage
              ? "pointer-events-none text-gray-400"
              : "cursor-pointer"
          }`}
          onClick={onNext}
        >
          Next
        </li>
      </ul>
    </div>
  );
};

export default LatestNews;
