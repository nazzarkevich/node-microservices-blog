import React, { useState } from 'react';
import axios from 'axios';

export const PostCreate = () => {
  const [post, setPost] = useState({ title: '', description: '' });

  async function onSubmit(e) {
    e.preventDefault();

    await axios.post('http://localhost:3001/posts', {
      title: post.title,
      description: post.description,
    });

    setPost({ title: '', description: '' });
  }

  return (
    <div className="container">
      <form onSubmit={onSubmit} style={{ maxWidth: '350px' }}>
        <div className="form-group" style={{ marginBottom: '10px' }}>
          <label>Post title</label>
          <input
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            className="form-control"
          />
          <label>Post description</label>
          <input
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
