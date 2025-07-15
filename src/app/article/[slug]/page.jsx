import React from "react";
import Image from "next/image";

async function fetchArticleByTitle(title) {
  const apiKey = process.env.GNEWS_API_KEY;
  const encodedTitle = encodeURIComponent(`"${title}"`);
  const url = `https://gnews.io/api/v4/search?q=${encodedTitle}&lang=en&token=${apiKey}`;

  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.articles ? data.articles[0] : null;
  } catch (error) {
    console.error("Fetch article by title failed:", error);
    return null;
  }
}


export default async function ArticlePage ({params, searchParams}){
  const queryTitle = searchParams.title;
  const article = await fetchArticleByTitle(queryTitle);

  if (!article) {
    return <div>Article not found!/</div>;
  }

  const { title, image, publishedAt, content, description } = article;
  const proxyImageUrl = image ? `/api/image?url=${encodeURIComponent(image)}` : null;

  return (
    <div className="container mx-auto px-4 my-10 max-w-4xl">
      <h1 className="text-4xl font-extrabold mb-4">{title}</h1>
      <p className="text-gray-500 mb-6">
        Published on {new Date(publishedAt).toLocaleDateString()}
      </p>
      {proxyImageUrl && (
        <div className="relative w-full h-96 mb-8">
          <Image src={proxyImageUrl} alt={title} fill style={{ objectFit: 'cover' }} />
        </div>
      )}
      <article className="prose lg:prose-xl max-w-none">
        <p className="lead">{description}</p>
        <p>{content}</p>
      </article>
    </div>
  );
};
