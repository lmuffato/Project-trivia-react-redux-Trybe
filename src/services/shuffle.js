/* Código retirado de https://qastack.com.br/programming/2450954/how-to-randomize-shuffle-a-javascript-array#:~:text=info%2Ftask%2Fshuffle-,Math.,classifica%C3%A7%C3%A3o%20reordena%20os%20elementos%20aleatoriamente.&text=Para%20truncar%2C%20voc%C3%AA%20deve%20usar,ser%20maiores%20que%202%C2%B3%C2%B9%2D1. */

function shuffle(array) {
  let currentIndex = array.length; let temporaryValue; let
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default shuffle;
