// Requisito 9 - Faz a pontuação dinâmica por dificuldade e salva no localStorage
export const calcScore = (questions, index, timeGotten) => {
  const hard = 3;
  const basePoint = 10;
  const localRanking = JSON.parse(localStorage.getItem('state'));
  const { player: { score } } = localRanking;
  if (questions[index].difficulty === 'hard') {
    localRanking.player.score = score + basePoint + (timeGotten * hard);
    localStorage.setItem('state', JSON.stringify(localRanking));
  }
  if (questions[index].difficulty === 'medium') {
    localRanking.player.score = score + basePoint + (timeGotten * 2);
    localStorage.setItem('state', JSON.stringify(localRanking));
  }
  if (questions[index].difficulty === 'easy') {
    localRanking.player.score = score + basePoint + (timeGotten * 1);
    localStorage.setItem('state', JSON.stringify(localRanking));
  }
};

// Requisito 13 e 14 - passando a soma dos acertions para o local storage
export const getCorrectAnswerStore = () => {
  const localRanking = JSON.parse(localStorage.getItem('state'));
  const { player: { assertions } } = localRanking;
  const assertion = 0;
  const sumAcertions = assertion + 1;
  localRanking.player.assertions = assertions + sumAcertions;
  localStorage.setItem('state', JSON.stringify(localRanking));
};
