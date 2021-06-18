import React from 'react';

class Ranking extends React.Component {
  componentDidMount() {
    this.players();
  }

  // convertEmailForImg(email) {
  //   const emailConvert = md5(email).toString();
  //   return `https://www.gravatar.com/avatar/${emailConvert}`;
  // }

  players() {
    const player = JSON.parse(localStorage.getItem('state'));
    // const img = this.convertEmailForImg(player.email);
    // const playerWithImg = { player: { ...player.player, img } };

    if (localStorage.players) {
      const players = JSON.parse(localStorage.getItem('players'));
      localStorage.setItem('players', JSON.stringify([...players, player]
        .sort((a, b) => b.player.score - a.player.score)));
    } else localStorage.setItem('players', JSON.stringify([player]));
  }

  render() {
    const players = JSON.parse(localStorage.getItem('players'));
    console.log(players);
    return (
      <div>
        <h1
          data-testid="ranking-title"
        >
          Título provisório
        </h1>
        {/* {players.map(({ player }, index) => (
          <ul key={ index }>
            <li>{player.name}</li>
          </ul>
        ))} */}
      </div>
    );
  }
}

export default Ranking;
