import Image from "next/image";
import axios from "axios";

const index = ({post}) => {

  return (
    <>
      <h1>{post.title}</h1>
    </>
  );
};

export default index;

// 매번 클릭된 아이템마다 각기 다른 내용이 출력되므로 getStatic보다는 getServerSide로 매 요청 시 새로운 페이지를 주는 것이 적합함
// ctx를 통해 url에 노출된 id값을 가져올 수 있다
// getstaticprops에서도 context 인자를 받을 수 있지만 사용할 수 있는 속성이 다르다!

export const getServerSideProps = async (ctx) => {
  const id = ctx.params.id;
  const res = await axios(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const data = await res.data;
  console.log(ctx);

  return {
    props: {
      post: data,
    }
  }
}

// 하지만 다이나믹 라우트의 경우에도 항상 ssr이 아닌 ssg를 적용하여 각 제품군의 상세페이지를 미리 정적 생성하고 싶을 수 있다
// 그럴때 사용하는 비동기 함수가 getstaticpaths이다


