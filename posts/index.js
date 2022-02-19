const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

const posts = {};

app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title, description } = req.body;

  posts[id] = {
    id,
    title,
    description,
  };

  await axios
    .post('http://localhost:3005/events', {
      type: 'PostCreated',
      data: {
        id,
        title,
        description,
      },
    })
    .catch((err) => console.log(err));

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('received event ', req.body.type);

  res.status(201).send({ status: 'OK' });
});

app.listen(3000, () => {
  console.log('Listening Posts service on 3000');
});
