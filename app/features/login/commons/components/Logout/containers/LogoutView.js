import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';
import styles from './styles';
import TextView from '../../../../../../components/TextView';

class LogoutView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { logout } = this.props;

    return (
      <TouchableOpacity style={styles.btn} onPress={logout}>
        <TextView styleProps={styles.labelSair}>
          Sair da conta
        </TextView>
      </TouchableOpacity>
    );
  }
}

LogoutView.propTypes = { logout: PropTypes.func.isRequired };

export default LogoutView;
