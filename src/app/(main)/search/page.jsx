'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import CardItem from '@/components/NewCardItem';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      const fetchArticles = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/search?q=${query}`);
          if (response.ok) {
            const data = await response.json();
            setArticles(data);
          }
        } catch (error) {
          console.error('Error fetching search results:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchArticles();
    } else {
        setLoading(false)
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 my-8">
      <h1 className="text-3xl font-bold mb-6">
        Search Results for: <span className="text-orange-500">{query}</span>
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map(article => (
            <CardItem
              key={article.id}
              title={article.title}
              date={new Date(article.published_at).toLocaleDateString('id-ID')}
              tag={article.categories.name}
              img={article.featured_image_url}
              url={`/article/${article.slug}`}
            />
          ))}
        </div>
      ) : (
        <p>No articles found for your search query.</p>
      )}
    </div>
  );
}