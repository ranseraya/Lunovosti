import React from 'react';
import Hero from '@/components/Hero';
import LatestNews from '@/components/LatestNews';
import BestAuthor from '@/components/BestAuthor';
import Ads from '@/components/Ads';
import LatestNewsCategory from '@/components/LatestNewsCategory';
import HeadlineNews from '@/components/HeadlineNews';
import RecommendationNews from '@/components/RecommendationNews';

const apiKey = process.env.GNEWS_API_KEY;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function getHeadlineNews() {
  const categories = ["general", "world", "nation", "business", "technology", "entertainment", "sports", "science and health"];
  try {
    await delay(1000);
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
    await delay(1000);
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
    await delay(1000);
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

async function getNewsPerCategory(){
  const categories = ["technology", "entertainment", "sports", "general", "world", "business", "science and health"];

  try{
    await delay(1000);
    const fetchPromises = categories.map(category => {
      const url = `https://gnews.io/api/v4/search?q=${category}&lang=id&sortby=relevance&max=5&token=${apiKey}`;
      return fetch(url).then(res => res.json());
    });
    const results = await Promise.all(fetchPromises);
    const newsByCategory = {};
    results.forEach((result, index) => {
      const category = categories[index];
      const articlesData = result.articles || [];
      newsByCategory[category] = articlesData.map(item => ({
        title: item.title,
        urlToImage: item.image,
        publishedAt: item.publishedAt,
        url: item.url,
      }));
    });
    return newsByCategory;
  } catch (error){
    console.error("Error fetching news from API:", error);
    return [];
  }
}

async function getRecommendationNews() {
  const creativeQueries = [
  'AI AND (creative OR art)',
  'startup AND funding AND Asia',
  '"electric vehicle" OR "smart city"',
  'cybersecurity AND tips',
  'biotech AND (health OR farm)',
  '"mental health" OR "work-life"',
  'investing OR "financial literacy"',
  '"sustainable travel" OR ecotourism',
  'productivity OR "time management"',
  'nutrition OR "healthy food"',
  'community OR "social impact"',
  '"art exhibition" OR "contemporary art"',
  'SME AND success',
  '"alternative education" OR "learning methods"',
  '"climate change" AND adaptation',
  'science AND discovery',
  'history AND "origin story"',
  'hobbies OR "new skill"',
  'myth OR debunked',
  'architecture AND unique'
  ];

  try {
    const shuffledQueries = creativeQueries.sort(() => 0.5 - Math.random());
    const selectedQueries = shuffledQueries.slice(0, 5);
    const finalQuery = selectedQueries.map(q => `(${q})`).join(' OR ');

    const encodedQuery = encodeURIComponent(finalQuery);
    const url = `https://gnews.io/api/v4/search?q=${encodedQuery}&lang=id&sortby=relevance&token=${apiKey}`;

    const res = await fetch(url);

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Gagal mengambil berita rekomendasi:", errorData.errors);
      return [];
    }

    const data = await res.json();

    const articles = (data.articles || [])
    const filteredArticles = articles
      .filter(article => article.url && article.url.startsWith('https://'));

    return filteredArticles.map(item => ({
      title: item.title,
      // description: item.description,
      url: item.url,
      urlToImage: item.image,
      publishedAt: item.publishedAt,
    }));
  } catch (error) {
    console.error("Error fetching recommendation news:", error);
    return [];
  }
}

export default async function Home() {
  const headlineArticles = await getHeadlineNews();
  const latestArticles = await getLatestNews();
  const categoryArticles = await getNewsPerCategory();
  const recommendationArticles = await getRecommendationNews();

  return (
    <div className=''>
      <Hero />
      <Ads />
      <HeadlineNews articles={headlineArticles} />
      <LatestNews articles={latestArticles} />
      <Ads />
      <LatestNewsCategory newsData={categoryArticles}/>
      <RecommendationNews articles={recommendationArticles}/>
      <BestAuthor />
    </div>
  );
}