import React from "react";
import NewTag from "./NewTag";
import entertaiment from '@/assets/icons/entertaiment.png'
import automotive from '@/assets/icons/automotive.png'
import health from '@/assets/icons/health.png'
import politic from '@/assets/icons/politic.png'
import business from '@/assets/icons/business.png'
import sport from '@/assets/icons/sport.png'
import food from '@/assets/icons/food.png'
import Link from "next/link";

const tags = [
  { label: "Entertainment", icon: entertaiment, url:"/Entertaiment" },
  { label: "Automotive", icon: automotive, url:"/Automotive" },
  { label: "Health", icon: health, url:"/Health" },
  { label: "Politics", icon: politic, url:"/Politics" },
  { label: "Business", icon: business, url:"/Business" },
  { label: "Sports", icon: sport, url:"/Sports" },
  { label: "Foods", icon: food, url:"/Foods" },
];

const TagListCategory = () => {
  return (
    <div className="flex flex-wrap justify-between gap-3 mt-6">
      {tags.map((tag, idx) => (
        <Link key={idx}href={tag.url}>
          <NewTag label={tag.label} icon={tag.icon}/>
        </Link>
      ))}
    </div>
  );
}

export default TagListCategory
