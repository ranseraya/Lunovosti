import prisma from '../libs/prisma';
import CardItem from './NewCardItem';

const serializeBigInts = (obj) => {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));
};

async function getRelatedArticles(categoryId, currentArticleId) {
    try {
        const articles = await prisma.articles.findMany({
            where: {
                category_id: categoryId,
                id: {
                    not: BigInt(currentArticleId),
                },
                status: 'published',
            },
            take: 3,
            orderBy: {
                published_at: 'desc',
            },
            include: {
                categories: true,
            },
        });
        return serializeBigInts(articles);
    } catch (error) {
        console.error("Failed to fetch related articles:", error);
        return [];
    }
}

export default async function RelatedArticles({ categoryId, currentArticleId }) {
    const relatedArticles = await getRelatedArticles(categoryId, currentArticleId);

    if (relatedArticles.length === 0) {
        return null;
    }

    return (
        <div className="mt-12">
            <h2 className="text-3xl font-bold border-b-4 border-orange-500 pb-2 mb-6 inline-block">
                Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedArticles.map(article => (
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
        </div>
    );
}