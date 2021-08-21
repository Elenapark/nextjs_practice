import HeadInfo from "../components/HeadInfo";
import photosStyle from '../styles/Photos.module.css'
// next에서 제공해주는 이미지 컴포넌트!
import Image from "next/image";
import Link from 'next/link';

const photos = ({photos}) => {

  return (
    <div>
      <HeadInfo title="My Blog Photos"/>
      <h1>my photos</h1>
      <ul className={photosStyle.photos}>
        {photos.map((photo) => (
            <li key={photo.id}>
              <Link href={`/photos/${photo.id}`}>
                <a>
                  <Image src={photo.thumbnailUrl} width={100} height={100} alt={photo.title}/>
                  <span>{photo.title}</span>
                </a>
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  )
}

export default photos;


export const getServerSideProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/photos?_start=0&_end=10')
  const photos = await res.json()
  console.log("printed");

  return {
    props: {
      photos: photos
    }
  }
}


// 만약 문서에 출력되는 내용이 항상 고정된 형식과 내용이라고 했을 때
// 요청에 따라 그때그때 html문서를 생성할 필요없이 첫 요청에 하나의 정적 html문서를 생성 후
// 그 이후의 요청엔 계속 동일한 문서를 반환

// 비동기함수 getStaticProps 함수 선언
// export const getStaticProps = async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=0&_end=10`)
//   const photos = await res.json()
//
//   return {
//     props: {
//       photos: photos
//     }
//   }
// }
