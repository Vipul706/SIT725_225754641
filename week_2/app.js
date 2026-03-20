const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
  const num1 = 20;
  const num2 = 30;
  res.status(200).send(num1 + num2);
});

app.listen(port, () => {
  console.log(`server running on Port ${port}`);
});
