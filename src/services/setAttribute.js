const setAttribute = (array) => array.map((answer, index) => ({
  answer,
  attribute: `wrong-answer-${index}`,
}));

export default setAttribute;
