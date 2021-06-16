// https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/
export default function shuffleArray(arr) {
  for (let index = arr.length - 1; index >= 0; index -= 1) {
    const randomNumber = Math.floor(Math.random() * (index + 1));
    [arr[index], arr[randomNumber]] = [arr[randomNumber], arr[index]];
  }
  return arr;
}
