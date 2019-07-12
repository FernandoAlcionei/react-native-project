import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import styles from './styles';
import AppStyles from '../../../config/styles';

class LoginView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  loginUser = () => {
    const { login } = this.props;
    const { username, password } = this.state;

    login({ username, password });
  };

  render() {
    const { username, password } = this.state;
    const { isFormInvalid, msgDeErro } = this.props;
    const { fontSizes } = AppStyles;

    return (
      <View style={styles.container}>
        <Input
          id="usuario"
          styleProps={styles.inputUsuario}
          placeholder="Usuário"
          isInvalid={isFormInvalid}
          onChangeText={value => this.setState({ username: value })}
          value={username}
        />

        <Input
          id="senha"
          styleProps={styles.inputSenha}
          placeholder="Senha"
          isInvalid={isFormInvalid}
          secureTextEntry
          onChangeText={value => this.setState({ password: value })}
          value={password}
        />

        { isFormInvalid ? (
          <Text
            id="msg-de-erro"
            style={styles.msgErro}
            size={fontSizes.FONT_SIZE_MEDIUM}
          >
            {msgDeErro}
          </Text>
        ) : null }

        <View style={styles.containerBtn}>
          <Button id="btn-entrar" widthStyle={152} heightStyle={50} title="Entrar" onPress={() => this.loginUser()} />
        </View>

        <View style={styles.footer}>
          <Text>
            React Native Project
          </Text>
        </View>
      </View>
    );
  }
}

LoginView.propTypes = {
  login: PropTypes.func.isRequired,
  isFormInvalid: PropTypes.bool.isRequired,
  msgDeErro: PropTypes.string.isRequired,
};

export default LoginView;
