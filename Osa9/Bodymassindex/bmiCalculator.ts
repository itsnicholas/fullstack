interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments2 = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (a: number, b: number): string => {
  if (b / Math.pow(a/100, 2)  <= 15) {
    console.log('Very severely underweight');
    return 'Very severely underweight';
  } else if (b / Math.pow(a/100, 2) <= 16) {
    console.log('Severely underweight');
    return 'Severely underweight';
  } else if (b / Math.pow(a/100, 2) <= 18.5) {
    console.log('Underweight');
    return 'Underweight';
  } else if (b / Math.pow(a/100, 2) <= 25) {
    console.log('Normal (healthy weight)');
    return 'Normal (healthy weight)';
  } else if (b / Math.pow(a/100, 2) <= 30) {
    console.log('Overweight');
    return 'Overweight';
  } else if (b / Math.pow(a/100, 2) <= 35) {
    console.log('Obese Class I (Moderately obese)');
    return 'Obese Class I (Moderately obese)';
  } else if (b / Math.pow(a/100, 2) <= 40) {
    console.log('Obese Class II (Severely obese)');
    return 'Obese Class II (Severely obese)';
  } else if (b / Math.pow(a/100, 2) > 40) {
    console.log('Obese Class III (Very severely obese)');
    return 'Obese Class III (Very severely obese)';
  } else if (a <= 0 || b <= 0) {
    console.log('Can\'t calculate with 0 or less!');
    return 'Can\'t calculate with 0 or less!';
  }
  console.log('undefined');
  return 'undefined';
};

try {
  const { 
    value1, 
    value2
} = parseArguments2(process.argv);
  calculateBmi(
    value1, 
    value2
  );
} catch (e) {
  if (e instanceof Error) {
    console.log('Something went wrong, error message: ', e.message);
  } else {
    throw e;
  }
}

export = calculateBmi;