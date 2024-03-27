import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Buenas noches!');
});

app.listen(5174);