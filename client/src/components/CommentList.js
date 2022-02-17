import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const CommentList = ({ postId }) => {
  const [comments, setComments] = useState({});

  const fetchComments = async () => {
    const response = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );

    setComments(response.data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  if (!Object.values(comments).length) {
    return null;
  }

  return (
    <>
      <hr />
      <div className="container">
        <h4>Comments:</h4>
        <ul>
          {Object.values(comments).map(({ id, content }) => (
            <li key={id}>{content}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
