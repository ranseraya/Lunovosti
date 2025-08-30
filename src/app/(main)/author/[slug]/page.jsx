import prisma from "../../../../libs/prisma";
import AuthorProfile from "./AuthorProfile";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

const serializeBigInts = (obj) => {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
};

async function getAuthorData(slug) {
  try {
    const author = await prisma.authors.findUnique({
      where: { slug },
      include: {
        articles: {
          where: { status: "published" },
          orderBy: { published_at: "desc" },
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
  const { slug } = params;
  const author = await getAuthorData(slug);

  if (!author) {
    return (
      <div className="container mx-auto px-4 my-8">
        <p>Author not found.</p>
      </div>
    );
  }

  return <AuthorProfile author={author} />;
}
