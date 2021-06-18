import React from 'react';

class Setting extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="settings-title">Tela de configuração</h1>
      </div>
    );
  }
}

export default Setting;

// Tive que alterar aqui, pois estava mudando a cor da borda do botão de próxima pergunta,
// toda vez que mudava a pergunta do array
// handleStyle() {
//   const btnAnswers = document.getElementsByTagName('button');
//   this.setState({ isButtonDisabled: true, resetTimer: true });
//   [...btnAnswers].map((btn) => {
//     if (btn.getAttribute('data-testid') === 'correct-answer') {
//       btn.classList.add('green');
//     }
//     if (btn.getAttribute('data-testid').includes('wrong-answer')) {
//       btn.classList.add('red');
//     }
//     const element = document.querySelector('.hide-button');
//     if (element) {
//       return element.setAttribute('class', 'flex');
//     }
//     return '';
//   });
// }
