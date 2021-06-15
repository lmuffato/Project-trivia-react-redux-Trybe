// Lógica de RAFAEL MEDEIROS Turma 10A
const permutate = (...answers) => {
  const items = [...answers];
  const permutation = [];
  while (items.length > 0) {
    const randomNumber = Math.floor(Math.random() * items.length);
    permutation.push(items[randomNumber]);
    items.splice(randomNumber, 1);
  }
  return permutation;
};

export default permutate;
