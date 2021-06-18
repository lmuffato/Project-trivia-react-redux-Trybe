export default async function fetchCategories() {
  const endPoint = 'https://opentdb.com/api_category.php';
  const { trivia_categories: triviaCategories } = await (await fetch(endPoint)).json();
  return triviaCategories;
}
