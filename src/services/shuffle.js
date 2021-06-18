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

export const shuffleArray = (answersArray) => {
  const answersArr = answersArray;
  const randomizedArray = [];
  for (let index = 0; index < answersArr.length; index += 1) {
    const randomIndex = Math.floor(Math.random() * answersArray.length);
    randomizedArray.push(answersArr[randomIndex]);
    answersArr.splice(answersArr[index], 1);
  }
  console.log(randomizedArray);
  return randomizedArray;
};
