import React, { useState } from 'react';
import axios from 'axios';

export const CommentCreate = ({ postId }) => {
  const [comment, setComment] = useState('');

  async function onSubmit(e) {
    e.preventDefault();

    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content: comment,
    });

    setComment('');
  }

  return (
    <div className="container">
      <form onSubmit={onSubmit} style={{ maxWidth: '350px' }}>
        <div className="form-group" style={{ marginBottom: '10px' }}>
          <label>Add comment</label>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
