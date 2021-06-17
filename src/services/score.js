export const conditionScore = (difficulty, dificuldade, props) => {
  const { secondsStore } = props;
  const { hard, medium, easy } = dificuldade;
  const number = 10;
  const time = secondsStore - 1;
  let points;

  console.log(difficulty);
  console.log(time);

  switch (difficulty) {
  case (hard.name):
    points = number + (time * hard.value);
    return points;
  case (medium.name):
    points = number + (time * medium.value);
    return points;
  case (easy.name):
    points = number + (time * easy.value);
    return points;
  default:
    return 'Deu ruim !';
  }
};

export default conditionScore;
