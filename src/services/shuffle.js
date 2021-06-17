const shuffleArr = (answersArray) => {
  const answers = answersArray;
  const randomizedArray = [];
  while (answers.length > 0) {
    const randomIndex = Math.floor(Math.random() * answers.length);
    randomizedArray.push(answers[randomIndex]);
    answers.splice(randomIndex, 1);
  }
  return randomizedArray;
};

export default shuffleArr;
