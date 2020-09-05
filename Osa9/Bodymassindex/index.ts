/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
const app = express();
import calculateBmi = require('./bmiCalculator');
import calculateExercises = require('./exerciseCalculator');

app.use(express.json());

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

app.post('/exercises', (req, res) => {
  
  try {
  //had to move no-unsafe-member-access & no-unsafe-assignment
  //to top as it was not possible the do both per one const
  const dailyExercises: number[] = req.body.daily_exercises;
  const target: number = req.body.target;

  if (!dailyExercises || !target) {
    return res.status(400).json({ 
      error: 'parameters missing' 
    });
  }

  const calculation = calculateExercises(dailyExercises, target);

  return res.json(calculation);

  } catch (e) {
    if (e instanceof Error) {
      console.log('malformatted parameters', e.message);
      return res.status(400).json({ 
        error: 'malformatted parameters' 
      });
    } else {
      throw e.message;
    }
  }

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});