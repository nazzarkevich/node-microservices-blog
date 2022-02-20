const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title, description } = data;

    posts[id] = { id, title, description, comments: [] };

    console.log('Event PostCreated received');
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });

    console.log('Event CommentCreated received');
  }

  if (type === 'CommentUpdated') {
    const { id, status, content, postId } = data;
    const post = posts[postId];

    comment = post.comments.find((comment) => comment.id === id);

    comment.status = status;
    comment.content = content;

    console.log('Event CommentUpdated received');
  }

  res.send({});
});

app.listen(3003, () => {
  console.log('Listening Query service on 3003');
});
