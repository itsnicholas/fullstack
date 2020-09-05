interface Values {
  value1: number[];
  value2: number;
}

interface MultipleValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: Array<string>): Values => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (isNaN(Number(args[2]))) throw new Error('Arguments contain non numeric value(s)');

  const array: number[] = [];
  const target = args[2];
  
  let i;
  
  for (i = 3; i < args.length; i++) {
    if (isNaN(Number(args[i]))) throw new Error('Arguments contain non numeric value(s)');
    array.push(Number(args[i]));
  }

  console.log(array);

  return {
    value1: array,
    value2: Number(target),
  };
};

const calculateExercises = (a: number[], target: number): MultipleValues => {
  if (a.length < 1) throw new Error('parameters missing');
  if (isNaN(Number(target))) throw new Error('malformatted parameters');

  target = Number(target);
  
  let success = Boolean(false);
  let rating = Number(0);
  let ratingDescription = String('');
  let sum = Number(0);
  let trainingDays = Number(0);

  let i;
  for (i = 0; i < a.length; i++) {
    if (isNaN(Number(a[i]))) throw new Error('malformatted parameters');
      sum = sum + Number(a[i]);
      if (Number(a[i]) > 0){
        trainingDays = trainingDays + 1;
      }
    }
  const periodLength = Number(a.length);
  const average = Number(sum / periodLength);

  if (average <= target - 1) {
    ratingDescription = 'bad';
    rating = 1;
    console.log({ periodLength, trainingDays, success, rating, ratingDescription, target, average });
    return { periodLength, trainingDays, success, rating, ratingDescription, target, average };
  } else if (average <= target) {
    ratingDescription = 'not too bad but could be better';
    rating = 2;
    console.log({ periodLength, trainingDays, success, rating, ratingDescription, target, average });
    return { periodLength, trainingDays, success, rating, ratingDescription, target, average };
  } else {
    ratingDescription = 'great job!';
    rating = 3;
    success = true;
    console.log({ periodLength, trainingDays, success, rating, ratingDescription, target, average });
    return { periodLength, trainingDays, success, rating, ratingDescription, target, average };
  }
};

try {
  const { 
    value1, 
    value2
} = parseArguments(process.argv);
  calculateExercises(
    value1, 
    value2
  );
} catch (e) {
  if (e instanceof Error) {
    console.log('Error, something bad happened, message: ', e);
  } else {
    throw e;
  }
}

export = calculateExercises;