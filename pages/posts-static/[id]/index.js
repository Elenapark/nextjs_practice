import React from 'react';
import axios from "axios";

const index = ({post}) => {
  return (
    <>
      <h1>{post.title}</h1>
    </>
  );
};

export default index;


export const getStaticProps = async (ctx) => {
  const id = ctx.params.id;

  console.log(id);
  // const res = await axios()
  return {
    post: data,
  }
}

export const getStaticPaths = async () => {
  return {
    paths   : [
      {
        params: {id: "1"}
      },
      {
        params: {id: "2"}
      },
      {
        params: {id: "3"}
      }
    ],
    fallback: false,
  };
};
