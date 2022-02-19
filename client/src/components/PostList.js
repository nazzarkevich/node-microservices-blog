import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { CommentCreate } from './CommentCreate';
import { CommentList } from './CommentList';

export const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const response = await axios.get('http://localhost:3003/posts');

    setPosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container">
      <h2>Post list</h2>
      <div className="d-flex justify-content-between flex-row flex-wrap">
        {Object.values(posts).map(({ id, title, description, comments }) => (
          <div
            className="card"
            style={{
              width: '30%',
              marginBottom: '20px',
              color: 'black',
              paddingBottom: '15px',
              height: 'fit-content',
            }}
          >
            <div className="card-body" key={id}>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
            <CommentList comments={comments} />
            <CommentCreate postId={id} />
          </div>
        ))}
      </div>
    </div>
  );
};
