import Image from "next/image";
import Link from 'next/link';
// url의 클릭된 이미지의 아이디를 받아오기 위해 아래 훅 사용 (여기서는 useRouter대신 getStaticPaths 활용)
import {useRouter} from "next/router";


const index = ({photo}) => {
  // const router = useRouter();
  // console.log(router.query.id)
  return (
    <div>
      <h2>{photo.title}</h2>
      <Image src={photo.url} width={500} height={500}/>
      <Link href="/photos">
        <a>go back to the list</a>
      </Link>
    </div>
  );
};

export default index;


export const getStaticProps = async (context) => {
  // getStaticPaths의 params를 사용하기 위해 함수에 인자로 context(static path가 static props로 context를 넘겨줌)
  // 그 context의 id를 동적할당해준다 (context.params.id)

  const {id} = context.params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
  const photo = await res.json()

  return {
    props: {
      photo
    }
  }
}

export const getStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/photos?_start=0&_end=10')
  const photos = await res.json();
  // photo의 id만 포함된 배열을 새로 반환
  const ids = photos.map(photo => photo.id);
  // 해당 ids를 다시 맵을 돌려 [{params : {id : '1'},{params : {id : '2'}, ... }의 형태로 리턴
  const paths = ids.map(id => {
    return {
      params: {id: id.toString()}
    }
  })

  return {
    paths: paths,
    //   [
    //   {
    //     params: {id: '1'}
    //   },
    //   {
    //     params: {id: '2'}
    //   },
    //   {
    //     params: {id: '3'}
    //   }
    // ],
    fallback: false,
  }
}
