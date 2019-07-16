import React, { Component } from 'react';
import { SafeAreaView, View, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import NavBar from '../../../components/NavBar';
import AppStyles from '../../../config/styles';
import BuscaView from './BuscaView';
import styles from './styles';

const { headers: { HEADER_WHITE } } = AppStyles;

class BuscaContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      busca: '',
      serached: false,
    };

    this.buscar = this.buscar.bind(this);

    this.leftButtonIcon = {
      icon: 'ios-search',
      sizeIcon: 21,
      onPress: this.buscar,
    };

    this.rightButtonText = {
      title: 'Cancelar',
      onPress: Actions.pop,
    };
  }

  buscar() {
    const { busca } = this.state;
    this.setState({ busca, serached: true });
  }

  render() {
    const { id, placeholder } = this.props;
    const { busca, serached } = this.state;

    return (
      <SafeAreaView id={id} style={styles.container}>
        <NavBar leftButtonIcon={this.leftButtonIcon} headerStyle={HEADER_WHITE} right rightButtonText={this.rightButtonText}>
          <View style={styles.busca}>
            <TextInput
              autoFocus
              placeholder={placeholder}
              placeholderTextColor="#bdbdbd"
              style={styles.campoDeBusca}
              value={busca}
              onSubmitEditing={() => this.buscar()}
              onChangeText={value => this.setState({ busca: value })}
            />
          </View>
        </NavBar>
        <BuscaView {...this.props} busca={busca} serached={serached} />
      </SafeAreaView>
    );
  }
}

BuscaContainer.propTypes = {
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string,
};

BuscaContainer.defaultProps = { id: '' };

export default BuscaContainer;
