import withRepoBasic from "../../component/with-repo-basic";
import api from "../../lib/api";
import dynamic from "next/dynamic";
const MarkdownRenderer = dynamic(
  () => import("../../component/MarkdownRenderer"),
  {
    loading: () => <p>loading</p>,
  }
);

function Detail({ readme }) {
  return <MarkdownRenderer content={readme.content} isBase64={true} />;
}

Detail.getInitialProps = async ({
  ctx: {
    req,
    res,
    query: { owner, name },
  },
}) => {
  const readmeRes = await api.request(
    { url: `/repos/${owner}/${name}/readme` },
    req,
    res
  );

  console.log(readmeRes);

  return {
    readme: readmeRes.data,
  };
};

export default withRepoBasic(Detail, "index");
