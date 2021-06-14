import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);

        this.handleValidation = this.handleValidation.bind(this);

        this.state = {
            usuario: '',
            email: '',
            disabled: true,
        }
    };

    handleValidation({ target }) {
        const { name, value } = target;
        const { usuario, email } = this.state;
        this.setState({ [name]: value })
        if (usuario !== '' && email !== '') {
            this.setState({ disabled: false })
        }
    };

    render() {
        const { disabled } = this.state;
        return (
            <form>
                <label htmlFor="name">
                    <input
                        type="text"
                        data-testid="input-player-name"
                        name="usuario"
                        id="name"
                        onChange={this.handleValidation}
                    />
                </label>
                <label htmlFor="email">
                    <input
                        type="text"
                        data-testid="input-gravatar-email"
                        name="email"
                        id="email"
                        onChange={this.handleValidation}
                    />


                </label>
                <button type="button" data-testid="btn-play" disabled={disabled}>Jogar</button>
            </form>
        )
    }

};

export default Login;
