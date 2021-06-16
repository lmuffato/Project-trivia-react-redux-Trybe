const dataTestid = (array) => array
  .map((elemento, index) => ({ [elemento]: `wrong-answer-${index}` }));

export default dataTestid;
