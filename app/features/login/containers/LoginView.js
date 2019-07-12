import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import styles from './styles';

class LoginView extends Component {
  constructor(props) {
    super(props);

    this.state = { username: '', password: '' };
  }

  loginUser = () => {
    const { login } = this.props;
    const { username, password } = this.state;

    login({ username, password });
  };

  renderMsgLoginInvalido = (isFormInvalid, msg) => {
    if (isFormInvalid) {
      return (
        <Text id="msg-de-erro" style={styles.msgErro}>
          { msg }
        </Text>
      );
    }
    return null;
  }

  render() {
    const { username, password } = this.state;
    const { isFormInvalid, msgDeErro } = this.props;

    return (
      <View style={styles.container}>
        <Input
          styleProps={styles.inputUsuario}
          placeholder="Usuário"
          isInvalid={isFormInvalid}
          onChangeText={value => this.setState({ username: value })}
          value={username}
        />

        <Input
          styleProps={styles.inputSenha}
          placeholder="Senha"
          isInvalid={isFormInvalid}
          secureTextEntry
          onChangeText={value => this.setState({ password: value })}
          value={password}
        />

        { this.renderMsgLoginInvalido(isFormInvalid, msgDeErro) }

        <View style={styles.containerBtn}>
          <Button widthStyle={152} heightStyle={50} title="Entrar" onPress={() => this.loginUser()} />
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
