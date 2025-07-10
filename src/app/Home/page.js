import React from 'react';
import Hero from '@/components/Hero';
import LatestNews from '@/components/LatestNews';
import BestAuthor from '@/components/BestAuthor';
import Ads from '@/components/Ads';
import LatestNewsCategory from '@/components/LatestNewsCategory';
import TrendingNews from '@/components/TrendingNews';
import HeadlineNews from '@/components/HeadlineNews';

async function getHeadlineNews() {
  const apiKey = process.env.GNEWS_API_KEY;
  const categories = ["general", "world", "nation", "business", "technology", "entertainment", "sports", "science and health"];
  try {
    const fetchPromises = categories.map(category => {
      const url = `https://gnews.io/api/v4/search?q=${category}&lang=id&sortby=relevance&max=1&token=${apiKey}`;
      return fetch(url).then(res => res.json());
    });
    const results = await Promise.all(fetchPromises);
     const headlines = results.map((result, index) => {
        const category = categories[index];
        const articleData = result.articles && result.articles[0] ? result.articles[0] : null;

        if (!articleData) {
          return null;
        }

        const adaptedArticle = {
          title: articleData.title,
          description: articleData.description,
          url: articleData.url,
          urlToImage: articleData.image,
          publishedAt: articleData.publishedAt,
        };

        return [category, adaptedArticle];
      })
      .filter(item => item !== null);
    return headlines;
}catch (error) {
  console.error("Error fetching news from API:", error);
  return [];
}
}

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

async function getTrendingNews() {
  try {
    const res = await fetch(`https://gnews.io/api/v4/top-headlines?sortby=relevance&lang=us&country=us&token=${process.env.GNEWS_API_KEY}`, {
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

export default async function Home() {
  const headlineArticles = await getHeadlineNews();
  const latestArticles = await getLatestNews();
  const trendingArticles = await getTrendingNews();

  return (
    <div className=''>
      <Hero />
      <Ads />
      <HeadlineNews articles={headlineArticles} />
      <LatestNews articles={latestArticles} />
      <Ads />
      {/* <TrendingNews articles={trendingArticles} /> */}
      <LatestNewsCategory />
      <BestAuthor />
    </div>
  );
}