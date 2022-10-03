import { Post } from '@prisma/client';
import axios from 'axios';
import { GetServerSideProps } from 'next';

const Home = ({
  posts = [
    {
      id: 0,
      title: '',
      url: '',
      body: '',
      published: false,
      authorId: 0,
      createdAt: new Date(),
    },
  ],
}: {
  posts: Post[];
}) => {
  return (
    <div>
      <ul>
        {posts !== undefined &&
          posts?.map((post, idx) => {
            return (
              <li key={idx}>
                <p>{`${post.title}`}</p>
                <p>{`${post.body}`}</p>
                <p>{`${post.url}`}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getServerSideProps: GetServerSideProps = async () => {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  const posts = await axios
    .get(`${process.env.HOSTNAME}/api/archive/category/page/`)
    .then(async ({ data }) => {
      return data;
    });

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  };
};
// staticsideprops 사용시 주의점 https://stackoverflow.com/questions/67003980/getstaticpaths-and-getstaticprops-are-failing-during-next-build

export default Home;
