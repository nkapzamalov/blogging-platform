import Article from "../../components/Article";

export default function articlePage({ article }) {

  return (
    <Article article={article} />
  )
}

export async function getServerSideProps({ query }) {
  const { id } = query;

  if (isNaN(id)) {
    return { notFound: true };
  }

  let article = await prisma.blogPostContent.findFirst({
    where: {
      blogPostId: Number(id),
    },
    include: {
      blogPost: {
        select: {
          title: true,
          author: true,
          publishedAt: true,
          updatedAt: true,
        }
      }
    },
  });

  article = JSON.parse(JSON.stringify(article))

  console.log(article);

  if (!article) {
    return { notFound: true };
  }

  return {
    props: {
      article,
    },
  };
}