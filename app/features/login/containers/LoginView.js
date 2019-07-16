import React, { Component } from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import Button from '../../../components/Button';
import TextView from '../../../components/TextView';
import Input from '../../../components/Input';
import styles from './styles';
import AppStyles from '../../../config/styles';
import images from '../../../config/images';

const { login: { logo } } = images;
const { fontSizes } = AppStyles;

class LoginView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usuario: '',
      senha: '',
    };
  }

  loginUser = () => {
    const { login } = this.props;
    const { usuario, senha } = this.state;
    login({ usuario, senha });
  };

  renderMsgDeErro = (isFormInvalid, msgDeErro) => isFormInvalid && (
    <TextView id="msg-de-erro" styleProps={styles.msgErro} size={fontSizes.FONT_SIZE_TEXT_MEDIUM}>
      {msgDeErro}
    </TextView>
  );

  render() {
    const { usuario, senha } = this.state;
    const { isFormInvalid, msgDeErro } = this.props;

    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />

        <Input
          id="usuario"
          styleProps={styles.inputUsuario}
          placeholder="Usuário"
          isInvalid={isFormInvalid}
          onChangeText={value => this.setState({ usuario: value })}
          value={usuario}
        />

        <Input
          id="senha"
          styleProps={styles.inputSenha}
          placeholder="Senha"
          isInvalid={isFormInvalid}
          secureTextEntry
          onChangeText={value => this.setState({ senha: value })}
          value={senha}
        />

        { this.renderMsgDeErro(isFormInvalid, msgDeErro) }

        <View style={styles.containerBtn}>
          <Button id="btn-entrar" width={152} height={50} title="Entrar" onPress={() => this.loginUser()} />
        </View>

        <View style={styles.footer}>
          <TextView size={fontSizes.FONT_SIZE_TEXT_SMALL}>
            React Native Project
          </TextView>
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
