import Head from "next/head";

// index.js, photos.js파일 내 head tag에 metadata로 들어가는 정보

const HeadInfo = ({title, keyword, contents}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta keyword={keyword}/>
      <meta contents={contents}/>
    </Head>
  );
};

HeadInfo.defaultProps = {
  title   : 'My Blog',
  keyword : 'Blog powered by Next js',
  contents: 'Practice next js'
}
export default HeadInfo;
