import CardItem from "@/components/NewCardItem";
import React from "react";
import Ads from "@/components/Ads";
import TagListCategory from "@/components/TagListCategory";
import prisma from "../../libs/prisma";


async function getNewsForCategory(categorySlug) {
  try {
    const articles = await prisma.articles.findMany({
      where: {
        status: 'published',
        categories: {
          slug: categorySlug,
        },
      },
      orderBy: {
        published_at: 'desc',
      },
      include: {
        authors: true,
        categories: true,
      },
    });
    return articles;
  } catch (error) {
    console.error(`Failed to fetch news for category ${categorySlug}:`, error);
    return [];
  }
}

export default async function CategoryPage({ params }) {
  const { category: categorySlug } = params;
  const articles = await getNewsForCategory(categorySlug);
  const categoryTitle = categorySlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' & ');

  return (
    <>
      <TagListCategory />
      <section className="container mx-auto px-4 my-8">
        <h1 className="text-4xl font-bold border-b-4 border-orange-500 pb-2 mb-6 inline-block capitalize">
          {categoryTitle}
        </h1>
        {articles.length === 0 ? (
          <p>News for this category is not available at this time.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
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
        )}
        <Ads />
      </section>
    </>
  );
}