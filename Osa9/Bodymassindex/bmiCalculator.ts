type Result = string;

const calculateBmi = (a: number, b: number) : Result => {
  console.log(Math.pow(a, 2), 'Math.pow(a, 2)')
    if (b / Math.pow(a/100, 2)  <= 15) {
    return 'Very severely underweight';
  } else if (b / Math.pow(a/100, 2) <= 16) {
    return 'Severely underweight';
  } else if (b / Math.pow(a/100, 2) <= 18.5) {
    return 'Underweight';
  } else if (b / Math.pow(a/100, 2) <= 25) {
    return 'Normal (healthy weight)';
  } else if (b / Math.pow(a/100, 2) <= 30) {
    return 'Overweight';
  } else if (b / Math.pow(a/100, 2) <= 35) {
    return 'Obese Class I (Moderately obese)';
  } else if (b / Math.pow(a/100, 2) <= 40) {
    return 'Obese Class II (Severely obese)';
  } else if (b / Math.pow(a/100, 2) > 40) {
    return 'Obese Class III (Very severely obese)';
  } else if (a <= 0 || b <= 0) {
    return 'Can\'t calculate with 0 or less!';
  }
}

try {
  console.log(calculateBmi(180, 74))
} catch (e) {
  console.log('Something went wrong, error message: ', e.message);
}