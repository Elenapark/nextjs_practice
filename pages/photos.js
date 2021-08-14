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

  return {
    props: {
      photos: photos
    }
  }
}

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
