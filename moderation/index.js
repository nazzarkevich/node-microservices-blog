const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  async function postComment(comment) {
    await axios
      .post('http://localhost:3005/events', {
        ...comment,
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  if (type === 'CommentCreated') {
    const isApproved = !data.content.includes('orange');
    const status = isApproved ? 'approved' : 'rejected';

    postComment({
      type: 'CommentModerated',
      data: { id: data.id, postId: data.postId, status, content: data.content },
    });
  }

  res.send({});
});

app.listen(3004, () => {
  console.log('Listening Moderation service on 3004');
});
