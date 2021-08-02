import React from 'react';
import Post from './Post/Post';

export default function Posts(props) {
  const { posts, onPostClickHandler } = props;
  return (
    <ul className=''>
      {posts.map((item) => (
        <Post
          key={item.id}
          item={item}
          onPostClickHandler={onPostClickHandler}
        />
      ))}
    </ul>
  );
}
