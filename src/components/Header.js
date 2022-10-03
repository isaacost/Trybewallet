import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  somaDespesas = () => {
    const { expenses } = this.props;
    const soma = expenses.reduce((acc, cur) => {
      const moeda = cur.currency;
      const cambio = cur.exchangeRates[moeda].ask;
      const emBRL = Number(cambio) * Number(cur.value);
      return acc + Number(emBRL);
    }, 0.00);
    return Number(soma).toFixed(2);
  };

  render() {
    const { email } = this.props;
    const despTotal = this.somaDespesas();
    const cambio = 'BRL';

    return (
      <div>
        <h3 data-testid="email-field">
          {`Email: ${email}`}
        </h3>
        <h3 data-testid="total-field">
          {despTotal}
        </h3>
        <h3 data-testid="header-currency-field">
          {cambio}
        </h3>
      </div>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(Header);
