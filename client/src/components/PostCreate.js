import React, { useState } from 'react';
import axios from 'axios';

export const PostCreate = () => {
  const [title, setTitle] = useState('');

  async function onSubmit(e) {
    e.preventDefault();

    await axios.post('http://localhost:3001/posts', {
      title,
    });

    setTitle('');
  }

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
