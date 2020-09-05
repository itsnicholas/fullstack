interface Values {
  value1: number;
  value2: number;
  value3: boolean;
  value4: number;
  value5: string;
  value6: number;
  value7: number;
}

const parseArguments = (args: Array<string>): Values => {
  if (args.length < 4) throw new Error('Not enough arguments');
  let sum = 0;
  let days = 0;
  let i;
  for (i = 3; i < args.length; i++) {
    if (isNaN(Number(args[i]))) throw new Error('Arguments contain non numeric value(s)');
    sum = sum + Number(args[i]);
    if (Number(args[i]) > 0){
      days = days + 1;
    }
  }
  const lenght = args.length - 3;
  const average = sum / lenght;

  
  if (average <= Number(args[2]) - 1) {
    return {
      value1: lenght,
      value2: Number(days),
      value3: false,
      value4: 1,
      value5: 'not good',
      value6: Number(args[2]),
      value7: average
    };
  } else if (average <= Number(args[2])) {
    return {
      value1: lenght,
      value2: Number(days),
      value3: false,
      value4: 2,
      value5: 'not too bad but could be better',
      value6: Number(args[2]),
      value7: average
    };
  } else {
    return {
      value1: lenght,
      value2: Number(days),
      value3: true,
      value4: 3,
      value5: 'great!',
      value6: Number(args[2]),
      value7: average
    };
  }
};

const calculateExercises = (
  a: number, 
  b: number, 
  c: boolean, 
  d: number, 
  e: string, 
  f: number, 
  g: number 
  ): string => {
  console.log('{ periodLength:', a),
  console.log('trainingDays:', b),
  console.log('success:', c),
  console.log('rating:', d),
  console.log('ratingDescription:', e),
  console.log('target:', f),
  console.log('average:', g, '}');
  return '{ periodLength: ' + a.toString() + ' trainingDays: ' + b.toString() +
  ' success: ' + c.toString() + ' rating: ' + d.toString() +
  ' ratingDescription: ' + e.toString() + ' target: ' + f.toString() +
  ' average: ' + g.toString() + ' }';
};

try {
  const { 
    value1, 
    value2, 
    value3, 
    value4, 
    value5, 
    value6, 
    value7 
} = parseArguments(process.argv);
  calculateExercises(
    value1, 
    value2, 
    value3, 
    value4, 
    value5, 
    value6, 
    value7
  );
} catch (e) {
  if (e instanceof Error) {
    console.log('Error, something bad happened, message: ', e);
  } else {
    throw e;
  }
}