import React from "react";
import Image from "next/image";
import prisma from "../../../libs/prisma";

async function fetchArticleBySlug(slug) {
  try {
    const article = await prisma.articles.findUnique({
      where: {
        slug: slug,
      },
      include: {
        authors: true,
        categories: true,
      },
    });
    return article;
  } catch (error) {
    console.error(`Failed to fetch article with slug ${slug}:`, error);
    return null;
  }
}

export default async function ArticlePage({ params }) {
  const { slug } = params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    return <div>Article not found!</div>;
  }

  const { title, featured_image_url, published_at, content, excerpt, authors } = article;

  return (
    <div className="container mx-auto px-4 my-10 max-w-4xl">
      <h1 className="text-4xl font-extrabold mb-4">{title}</h1>
      <div className="text-gray-500 mb-6 flex items-center">
        <span>Write by: <strong>{authors.name}</strong></span>
        <span className="mx-2">|</span>
        <span>
          Published on: {new Date(published_at).toLocaleDateString('id-ID', {
            year: 'numeric', month: 'long', day: 'numeric'
          })}
        </span>
      </div>

      {featured_image_url && (
        <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={featured_image_url}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      )}

      <article className="prose lg:prose-xl max-w-none">
        <p className="lead font-semibold text-gray-600">{excerpt}</p>
        <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />
      </article>
    </div>
  );
}