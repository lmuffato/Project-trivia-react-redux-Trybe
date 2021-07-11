import React from 'react';
import '../style/Login/login.css'

class Login extends React.Component {
  render() {
    return(
      <div className="loginFix">
      <div className="loginFather">
     <form>
       <label htmlFor="nome">
         <input 
         className="input"
         type="text" 
         id="nome"
         data-testid="input-player-name"
         placeholder="Nome"
         />
       </label>
       <label htmlFor="email">
         <input 
         className="input"
         type="email" 
         id="email"
         data-testid="input-gravatar-email"
         placeholder="Email"
         />
       </label>
       <button type="button" className="btn btn-primary" data-testid="btn-play">
         Jogar
       </button>
     </form>
     </div>
       </div>
    )
  }
}

export default Login;