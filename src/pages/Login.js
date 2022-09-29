import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLogin } from '../redux/actions';

class Login extends React.Component {
  state = {
    emailLocal: '',
    senhaLocal: '',
  };

  handleChangeEmail = ({ target: { value } }) => {
    this.setState({ emailLocal: value });
  };

  handleChangeSenha = ({ target: { value } }) => {
    this.setState({ senhaLocal: value });
  };

  handleClick = () => {
    const { emailLocal } = this.state;
    const { dispatch, history } = this.props;

    dispatch(addLogin(emailLocal));
    history.push('/carteira');
  };

  render() {
    const { emailLocal, senhaLocal } = this.state;
    const regex = /\S+[@]\w+[.]\w+/gm;
    const minLength = 6;
    const habilitado = (regex.test(emailLocal) && senhaLocal.length >= minLength);
    return (
      <div>
        <h1>Login:</h1>
        <div>
          <label htmlFor="email">
            Email:
            <input
              type="text"
              name="email"
              id="email"
              value={ emailLocal }
              data-testid="email-input"
              onChange={ this.handleChangeEmail }
            />
          </label>
          <label htmlFor="senha">
            Senha:
            <input
              type="password"
              name="senha"
              id="senha"
              value={ senhaLocal }
              data-testid="password-input"
              onChange={ this.handleChangeSenha }
            />
          </label>
          <button
            type="button"
            disabled={ !habilitado }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default connect()(Login);
