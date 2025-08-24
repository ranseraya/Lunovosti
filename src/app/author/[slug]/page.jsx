import Image from 'next/image';
import CardItem from '@/components/NewCardItem';
import prisma from '../../../libs/prisma';
import fotoProfile from '@/assets/profile.jpg';

const serializeBigInts = (obj) => {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));
};

async function getAuthorData(slug) {
    try {
        const author = await prisma.authors.findUnique({
            where: { slug },
            include: {
                articles: {
                    where: { status: 'published' },
                    orderBy: { published_at: 'desc' },
                    include: { categories: true },
                },
            },
        });

        if (!author) return null;
        return serializeBigInts(author);
    } catch (error) {
        console.error("Failed to fetch author data:", error);
        return null;
    }
}
export default async function AuthorPage({ params }) {
    const author = await getAuthorData(params.slug);

  if (!author) {
    return <div className="container mx-auto px-4 my-8"><p>Author not found.</p></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="relative h-32 w-32 rounded-full overflow-hidden mb-4 border-4 border-orange-500">
          <Image
            src={author.profile_picture_url || fotoProfile}
            alt={author.name}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <h1 className="text-4xl font-bold">{author.name}</h1>
        <p className="text-lg text-gray-600 mt-2 max-w-2xl">{author.bio || 'No bio available.'}</p>
      </div>

      <h2 className="text-3xl font-bold border-b-4 border-orange-500 pb-2 mb-6 inline-block">
        Articles by {author.name}
      </h2>

      {author.articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {author.articles.map(article => (
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
        <p>This author has not published any articles yet.</p>
      )}
    </div>
  );
}