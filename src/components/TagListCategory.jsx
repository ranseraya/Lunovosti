'use client'
import React, { useRef } from "react";
import NewTag from "./NewTag";
import entertaiment from '@/assets/icons/entertaiment.png'
import automotive from '@/assets/icons/automotive.png'
import health from '@/assets/icons/health.png'
import politic from '@/assets/icons/politic.png'
import business from '@/assets/icons/business.png'
import sport from '@/assets/icons/sport.png'
import food from '@/assets/icons/food.png'
import Link from "next/link";
import { ChevronLeft, ChevronRight } from 'lucide-react';
// const tags = [
//   { label: "Entertainment", icon: entertaiment, url:"/Entertaiment" },
//   { label: "Automotive", icon: automotive, url:"/Automotive" },
//   { label: "Health", icon: health, url:"/Health" },
//   { label: "Politics", icon: politic, url:"/Politics" },
//   { label: "Business", icon: business, url:"/Business" },
//   { label: "Sports", icon: sport, url:"/Sports" },
//   { label: "Foods", icon: food, url:"/Foods" },
// ];
const tags = [
  { label: "General", icon: automotive, url: "/general" },
  { label: "World", icon: automotive, url: "/world" },
  { label: "Politics", icon: politic, url: "/nation" },
  { label: "Technology", icon: automotive, url: "/technology" },
  { label: "Entertainment", icon: entertaiment, url: "/entertainment" },
  { label: "Sports", icon: sport, url: "/sports" },
  { label: "Business", icon: business, url: "/business" },
  { label: "Health", icon: health, url: "/science-and-health" },
  { label: "Science", icon: health, url: "/science-and-health" },
  { label: "Automotive", icon: automotive, url: "/automotive" },
  { label: "Foods", icon: food, url: "/foods" },
];

const TagListCategory = () => {
  const scrollContainerRef = useRef(null);
  const scroll = (direction) => {
    const scrollAmount = 300;
    if (scrollContainerRef.current) {
      if (direction === 'left') {
        scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };
  return (
    <div className="relative flex items-center mt-6 px-8">
      <button
        onClick={() => scroll('left')}
        className="absolute -left-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
        aria-label="Scroll left"
      >
        <ChevronLeft size={20} />
      </button>
      <div
        ref={scrollContainerRef}
        className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {tags.map((tag, idx) => (
          <Link key={idx} href={tag.url} className="flex-shrink-0">
            <NewTag label={tag.label} icon={tag.icon} />
          </Link>
        ))}
      </div>
      <button
        onClick={() => scroll('right')}
        className="absolute -right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
        aria-label="Scroll right"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

export default TagListCategory
