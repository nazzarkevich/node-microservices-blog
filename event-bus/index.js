const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/events', async (req, res) => {
  const event = req.body;

  await axios
    .post('http://localhost:3000/events', event)
    .catch((err) => console.log(err));

  await axios
    .post('http://localhost:3001/events', event)
    .catch((err) => console.log(err));

  await axios
    .post('http://localhost:3003/events', event)
    .catch((err) => console.log(err));

  await axios
    .post('http://localhost:3004/events', event)
    .catch((err) => console.log(err));

  res.send({ status: 'OK' });
});

app.listen(3005, () => {
  console.log('Listening Event-bus on 3005');
});
