import React from 'react';
import Hero from '@/components/Hero';
import LatestNews from '@/components/LatestNews';
import BestAuthor from '@/components/BestAuthor';
import Ads from '@/components/Ads';
import LatestNewsCategory from '@/components/LatestNewsCategory';
import HeadlineNews from '@/components/HeadlineNews';
import RecommendationNews from '@/components/RecommendationNews';
import TagListCategory from '@/components/TagListCategory';
import prisma from '../../libs/prisma';


// const apiKey = process.env.GNEWS_API_KEY;
// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function getHeadlineNews() {
  try {
    const categories = await prisma.categories.findMany(); 
    const headlines = await Promise.all(
      categories.map(async (category) => {
        const article = await prisma.articles.findFirst({
          where: {
            category_id: category.id,
            status: 'published',
          },
          orderBy: {
            published_at: 'desc',
          },
        });
        return article ? [category.name, article] : null;
      })
    );
    return headlines.filter(item => item !== null);
  } catch (error) {
    console.error("Failed to fetch Headline News:", error);
    return [];
  }
}

async function getLatestNews() {
  try {
    const articles = await prisma.articles.findMany({
      where: {
        status: 'published',
      },
      orderBy: {
        published_at: 'desc',
      },
      take: 12,
      include: {
        authors: true,
        categories: true,
      },
    });
    return articles;
  } catch (error) {
    console.error("Failed to fetch Latest News:", error);
    return [];
  }
}

async function getNewsPerCategory() {
  try {
    const categories = await prisma.categories.findMany();
    const newsByCategory = {};
    await Promise.all(
        categories.map(async (category) => {
            const articles = await prisma.articles.findMany({
                where: {
                    category_id: category.id,
                    status: 'published',
                },
                orderBy: {
                    published_at: 'desc',
                },
                take: 5,
            });
            newsByCategory[category.name] = articles;
        })
    );
    return newsByCategory;
  } catch (error) {
    console.error("Failed to fetch News Per Category:", error);
    return {};
  }
}

async function getRecommendationNews() {
  try {
    const articlesCount = await prisma.articles.count({ where: { status: 'published' } });
    if (articlesCount === 0) return [];

    const skip = Math.max(0, Math.floor(Math.random() * articlesCount) - 5);

    const articles = await prisma.articles.findMany({
      where: {
        status: 'published',
      },
      orderBy: {
        published_at: 'desc',
      },
      take: 5,
      skip: skip > 0 ? skip : 0,
    });
    return articles;
  } catch (error) {
    console.error("Failed to fetch Recommendation News:", error);
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

export default async function Home() {
  const headlineArticles = await getHeadlineNews();
  const latestArticles = await getLatestNews();
  const categoryArticles = await getNewsPerCategory();
  const recommendationArticles = await getRecommendationNews();

  return (
    <div className=''>
      <TagListCategory />
      <Hero />
      <Ads />
      <HeadlineNews articles={headlineArticles} />
      <LatestNews articles={latestArticles} />
      <Ads />
      <LatestNewsCategory newsData={categoryArticles} />
      <RecommendationNews articles={recommendationArticles} />
      <BestAuthor />
    </div>
  );
}