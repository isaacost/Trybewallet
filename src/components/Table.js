import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense } from '../redux/actions';

class Table extends React.Component {
  cambio = (ask) => {
    const cambio = Number(ask);
    return Number(cambio).toFixed(2);
  };

  valor = (value, ask) => {
    const emReal = Number(value) * Number(ask);
    return Number(emReal).toFixed(2);
  };

  render() {
    const { expenses, remove } = this.props;
    return (
      <table border="1px">

        <thead>
          <tr>
            <th> Descrição </th>
            <th> Tag </th>
            <th> Método de pagamento </th>
            <th> Valor </th>
            <th> Moeda </th>
            <th> Câmbio utilizado </th>
            <th> Valor convertido </th>
            <th> Moeda de conversão </th>
            <th> Editar/Excluir </th>
          </tr>
        </thead>

        <tbody>
          {
            expenses.map((element) => (
              <tr key={ element.id }>
                <td>{element.description}</td>
                <td>{element.tag}</td>
                <td>{element.method}</td>
                <td>{Number(element.value).toFixed(2)}</td>
                <td>{element.exchangeRates[element.currency].name}</td>
                <td>{this.cambio(element.exchangeRates[element.currency].ask)}</td>
                <td>
                  {this.valor(element.value, element.exchangeRates[element.currency].ask)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => remove(element) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  remove: (expense) => dispatch(removeExpense(expense)),
});

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.instanceOf(Array).isRequired,
  remove: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
