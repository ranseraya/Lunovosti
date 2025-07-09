// /src/app/Home/page.js

import React from 'react';
import Hero from '@/components/Hero';
import LatestNews from '@/components/LatestNews';
import BestAuthor from '@/components/BestAuthor';
import Ads from '@/components/Ads';
import LatestNewsCategory from '@/components/LatestNewsCategory';
import TrendingNews from '@/components/TrendingNews';

async function getLatestNews() {
  try {
    const res = await fetch(`https://gnews.io/api/v4/top-headlines?lang=us&country=us&token=${process.env.GNEWS_API_KEY}`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) {
      console.error("Failed to fetch news:", res.status);
      return [];
    }

    const data = await res.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching news from API:", error);
    return [];
  }
}

async function getTrendingNews(){
  try{
    const res = await fetch(`https://gnews.io/api/v4/top-headlines?sortby=relevance&lang=us&country=us&token=${process.env.GNEWS_API_KEY}`, {
      next: { revalidate: 3600 }
    });
    if(!res.ok){
      console.error("Failed to fetch news:", res.status);
      return [];
    }
    const data = await res.json();
    return data.articles;
  }catch(error){
    console.error("Error fetching news from API:", error);
    return [];
  }
}

export default async function Home() {
  const latestArticles = await getLatestNews();
  const trendingArticles = await getTrendingNews();

  return (
    <div className=''>
      <Hero />
      <LatestNews articles={latestArticles} />
      <Ads />
      <TrendingNews articles={trendingArticles} />
      <LatestNewsCategory />
      <BestAuthor />
    </div>
  );
}