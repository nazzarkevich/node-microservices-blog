const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const { default: axios } = require('axios');

const app = express();

const commentsByPostId = {};

app.use(bodyParser.json());
app.use(cors());

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const postId = req.params.id;
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  async function postComment(comment) {
    await axios
      .post('http://localhost:3005/events', {
        ...comment,
      })
      .catch((err) => console.log(err));
  }

  const comments = commentsByPostId[postId] || [];

  const newComment = {
    id: commentId,
    content,
    postId: req.params.id,
    status: 'pending',
  };

  comments.push({ ...newComment });

  commentsByPostId[postId] = comments;

  postComment({
    type: 'CommentCreated',
    data: { ...newComment },
  });

  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  async function postComment(comment) {
    await axios
      .post('http://localhost:3005/events', {
        ...comment,
      })
      .catch((err) => console.log(err));
  }

  if (type === 'CommentModerated') {
    const { id, postId, status, content } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;

    postComment({
      type: 'CommentUpdated',
      data: {
        id,
        postId,
        status,
        content,
      },
    });
  }

  res.status(201).send({ status: 'OK' });
});

app.listen(3001, () => {
  console.log('Listening Comments service on 3001');
});
