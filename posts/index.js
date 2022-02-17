const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();

const posts = {};

app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title, description } = req.body;

  posts[id] = {
    id,
    title,
    description,
  };

  res.status(201).send(posts[id]);
});

app.listen(3001, () => {
  console.log('Listening on 3001');
});
