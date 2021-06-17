const setPoints = (e, timer, difficulty) => {
  let points = 0;
  let pointDiff = 0;
  const easy = 1;
  const medium = 2;
  const hard = 3;
  if (difficulty === 'easy') pointDiff = easy;
  if (difficulty === 'medium') pointDiff = medium;
  if (difficulty === 'hard') pointDiff = hard;
  if (e.target.getAttribute('data-testid').includes('correct')) {
    const pointDefault = 10;
    points = pointDefault + (timer * pointDiff);
    return points;
  } return points;
};

export default setPoints;
