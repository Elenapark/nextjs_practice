import HeadInfo from "../components/HeadInfo";
import Link from "next/link";

export default function Home({posts}) {
  return (
    <div>
      <HeadInfo/>
      <h1>welcome to my home!</h1>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.id}>{post.title}</li>
          )
        })}
      </ul>
    </div>
  )
}

// 요청을 할때마다 새롭게 서버에 요청하므로 업데이트된 정보가 있다면 바로바로 데이터가 바뀌어서 화면에 반영됨
// 위와같은 작업을 할때는 아래의 처리가 적합함
// export const getServerSideProps = async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=0&_end=10`);
//   const posts = await res.json();
//
//   return {
//     props: {
//       posts: posts
//     }
//   }
// }

// 넥스트에서 추천하는 것은 아래 방법
// 미리 파일을 생성해서 접근을 바로 할 수 있다 -> 이미 조회해서 데이터가 들어가있는 html을 보여줌
// 데이터가 바뀌었을 때는 어떻게? -> revalidate : 20 -> 처음 접속 후 20초 뒤에는 새롭게 파일을 업데이트하도록하는 코드를 추가
// 즉 데이터가 아주 즉각적으로 변화하지 않아도 되는 경우 이 스태틱사이드를 통해 ㄱㄱ
export const getStaticProps = async () => {
  const res = await fetch(`http://localhost:8080/api/posts`)
  const posts = await res.json();

  return {
    props     : {
      posts: posts
    },
    revalidate: 20
  }
}
