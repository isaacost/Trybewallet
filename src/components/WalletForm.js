import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI } from '../redux/actions';

class WalletForm extends React.Component {
  state = {
    despesa: '',
    descricao: '',
    moeda: 'USD',
    pagamento: 'Dinheiro',
    categoria: 'Alimentação',
  };

  componentDidMount() {
    const { fetchCoins } = this.props;
    fetchCoins();
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { despesa, descricao, moeda, pagamento, categoria } = this.state;
    const { currencies } = this.props;

    return (
      <div>
        <label htmlFor="despesa">
          Valor:
          <input
            type="text"
            value={ despesa }
            name="despesa"
            data-testid="value-input"
            onChange={ (event) => {
              this.handleChange(event);
            } }
          />
        </label>
        <label htmlFor="descricao">
          Descrição:
          <input
            type="text"
            value={ descricao }
            name="descricao"
            data-testid="description-input"
            onChange={ (event) => { this.handleChange(event); } }
          />
        </label>
        <label htmlFor="moeda">
          Moeda:
          <select
            name="moeda"
            value={ moeda }
            data-testid="currency-input"
            onChange={ (event) => { this.handleChange(event); } }
          >
            {
              currencies.map((element, index) => (
                <option key={ index }>
                  {element}
                </option>))
            }
          </select>
        </label>
        <label htmlFor="pagamento">
          Pagamento:
          <select
            name="pagamento"
            value={ pagamento }
            data-testid="method-input"
            onChange={ (event) => { this.handleChange(event); } }
          >
            <option> Dinheiro </option>
            <option> Cartão de crédito </option>
            <option> Cartão de débito </option>
          </select>
        </label>
        <label htmlFor="categoria">
          Categoria:
          <select
            name="categoria"
            value={ categoria }
            data-testid="tag-input"
            onChange={ (event) => { this.handleChange(event); } }
          >
            <option> Alimentação </option>
            <option> Lazer </option>
            <option> Trabalho </option>
            <option> Transporte </option>
            <option> Saúde </option>
          </select>
        </label>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCoins: () => dispatch(fetchAPI()),
});

WalletForm.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
  fetchCoins: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
