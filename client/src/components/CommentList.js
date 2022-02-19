import React from 'react';

export const CommentList = ({ comments }) => {
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
