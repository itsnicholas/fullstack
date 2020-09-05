import express from 'express';
const app = express();
import calculateBmi = require('./bmiCalculator');

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = req.query.weight;
  const height = req.query.height;

  if (!weight || !height) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  if (isNaN(Number(weight)) || isNaN(Number(height))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const numberHeight = Number(height);
  const numberWeight = Number(weight);

  const bmi = calculateBmi(numberHeight, numberWeight);

  return res.json({ weight, height, bmi });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});