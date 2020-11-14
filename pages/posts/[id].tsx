import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Layout from '../../components/Layout';
import Date from '../../components/Date';
import utilStyles from '../../styles/utils.module.css';
import { getAllPostIds, getPostData, TPostData } from '../../lib/posts';

type PropTypes = {
  postData: TPostData;
};

export default function Post({ postData }: PropTypes) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
};

type TContext = {
  params: { id: string };
};

export const getStaticProps: GetStaticProps = async ({ params }: TContext) => {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
};
