import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    const despTotal = 0;
    const cambio = 'BRL';

    return (
      <div>
        <h3 data-testid="email-field">
          {email}
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

const mapStateToProps = ({ user }) => ({
  email: user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
