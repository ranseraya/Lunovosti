import React from "react";
import Image from "next/image";
import Link from 'next/link';
import prisma from "../../../libs/prisma";
import CommentSection from "@/components/CommentSection";
import RelatedArticles from "@/components/RelatedArticles";
import { serializeBigInts } from "@/app/utils/serialize";

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

    if (!article) return null;

    return serializeBigInts(article);
  } catch (error) {
    console.error(`Failed to fetch article with slug ${slug}:`, error);
    return null;
  }
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    return <div>Article not found!</div>;
  }

  const { id, title, featured_image_url, published_at, content, excerpt, authors, category_id } = article;

  return (
    <div className="container mx-auto px-4 my-10 max-w-5xl">
      <h1 className="text-4xl font-extrabold mb-4">{title}</h1>
      <div className="text-gray-500 mb-6 flex items-center">
        <span>
          Write by:
          <Link href={`/author/${authors.slug}`} className="hover:text-orange-500 transition">
             <strong>{authors.name}</strong>
          </Link>
        </span>
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

      <CommentSection articleId={id} />

      <RelatedArticles categoryId={category_id} currentArticleId={id} />
    </div>
  );
}