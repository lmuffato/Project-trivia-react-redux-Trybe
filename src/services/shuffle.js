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

export const shuffleList = (list) => {
  let index = list.length;
  while (index) {
    const randomIndex = Math.floor(Math.random() * (index -= 1));
    [list[index], list[randomIndex]] = [list[randomIndex], list[index]];
  }
  return list;
};

export const shuffleListOfAnswers = (list) => {
  for (let indice = list.length; indice; indice -= 1) {
    const indiceAleatorio = Math.floor(Math.random() * indice);
    [list[indice - 1], list[indiceAleatorio]] = [list[indiceAleatorio], list[indice - 1]];
  }
  return list;
};
