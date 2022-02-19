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

  const comments = commentsByPostId[postId] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[postId] = comments;

  await axios
    .post('http://localhost:3005/events', {
      type: 'CommentCreated',
      data: { id: commentId, content, postId: req.params.id },
    })
    .catch((err) => console.log(err));

  res.status(201).send(comments);
});

app.post('/events', (req, res) => {
  console.log('received event ', req.body.type);

  res.status(201).send({ status: 'OK' });
});

app.listen(3001, () => {
  console.log('Listening Comments service on 3001');
});
