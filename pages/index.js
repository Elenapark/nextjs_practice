import HeadInfo from "../components/HeadInfo";
import Link from "next/link";
import axios from 'axios';

export default function Home({posts}) {
  return (
    <div>
      <HeadInfo/>
      <h1>welcome to my home!</h1>
      <ul>
        {posts.map((post) => {
          return (
            <Link href={`/posts-static/${post.id}`} key={post.id}>
              <a>
                <li>{post.title}</li>
              </a>
            </Link>)
        })}
      </ul>
    </div>
  )
}


// ServerSide Rendering with rest api (not graphql)
// 요청을 할때마다 새롭게 서버에 요청하므로 업데이트된 정보가 있다면 바로바로 데이터가 바뀌어서 화면에 반영됨
// 위와같은 작업을 할때는 아래의 처리가 적합함

export const getServerSideProps = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=0&_end=10`);
  const posts = await res.json();

  return {
    props: {
      posts: posts
    }
  }
}


// StaticSide Generation with rest api (not graphql)

// 넥스트에서 추천하는 것은 아래 방법
// 아래와 같이 async를 사용하여 export하게 되면 Next.js에서는 빌드할 때 해당 페이지를 Pre-render한다.
// 미리 파일을 생성해서 접근을 바로 할 수 있다 -> 이미 조회해서 데이터가 들어가있는 html을 보여줌
// 데이터가 바뀌었을 때는 어떻게? -> revalidate : 20 -> 처음 접속 후 20초 뒤에는 새롭게 파일을 업데이트하도록하는 코드를 추가
// 즉 데이터가 아주 즉각적으로 변화하지 않아도 되는 경우 이 method를 통해 ㄱㄱ

// export const getStaticProps = async () => {
//   // const res = await fetch(`http://localhost:8080/api/posts`)
//   const res = await axios(`https://jsonplaceholder.typicode.com/posts?_start=0&_end=10`)
//   const posts = await res.data;
//
//   // 아래와 같이 리턴하면 home 페이지는 빌드타임 시에 posts를 가져옴
//   return {
//     props     : {
//       posts: posts
//     },
//     revalidate: 20
//   }
// }
