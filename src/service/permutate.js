// Lógica de RAFAEL MEDEIROS Turma 10A
const permutate = (answers) => {
  const array = [];
  answers.forEach((answer) => {
    const items = answer;
    const permutation = [];
    while (items.length > 0) {
      const randomNumber = Math.floor(Math.random() * items.length);
      permutation.push(items[randomNumber]);
      items.splice(randomNumber, 1);
    }
    array.push(permutation);
  });
  return array;
};

export default permutate;
