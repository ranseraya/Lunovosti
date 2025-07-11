import CardItem from '@/components/NewCardItem';
import React from 'react'
import Ads from '@/components/Ads';

const apiKey = process.env.GNEWS_API_KEY;
function mapUrlToApiCategory(param) {
  if (!param) return "general";

  const lowercasedParam = param.toLowerCase();

  switch (lowercasedParam) {
    case 'general':
    case 'world':
    case 'nation':
    case 'business':
    case 'technology':
    case 'entertainment':
    case 'sports':
    case 'science':
    case 'health':
      return lowercasedParam;
    case 'science-and-health':
      return 'science and health';
    default:
      return 'general';
  }
}

async function getNewsForCategory(category){
  const encodedCategory = encodeURIComponent(category);
  const url = `https://gnews.io/api/v4/top-headlines?category=${encodedCategory}&lang=en&max=10&token=${apiKey}`;
  console.log(url);
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      console.error(`Gagal mengambil data untuk kategori: ${category}`);
      return [];
    }

    const data = await res.json();
    return (data.articles || []).map(item => ({
      title: item.title,
      description: item.description,
      url: item.url,
      urlToImage: item.image,
      publishedAt: item.publishedAt,
    }));
  } catch (error) {
    console.error(`Error fetching kategori ${category}:`, error);
    return [];
  }
}

export default async function CategoryPage({params}){
    const { category } = await params;
    const apiCategory = mapUrlToApiCategory(category);
    const articles = await getNewsForCategory(apiCategory);
  return (
    <div className="container mx-auto px-4 my-8">
      <h1 className="text-4xl font-bold border-b-4 border-orange-500 pb-2 mb-6 inline-block capitalize">
         {category.replace('-', ' & ')}
      </h1>
      {articles.length === 0 ? (
        <p>There is no news on this category!.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <CardItem key={article.url} title={article.title} date={article.publishedAt} tag={category.replace('-', ' & ')} img={article.urlToImage} url={article.url} />
          ))}
        </div>
      )}
        <Ads />
    </div>
  )
}