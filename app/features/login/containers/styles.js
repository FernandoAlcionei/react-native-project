import { StyleSheet } from 'react-native';
import AppStyles from '../../../config/styles';

const { color: { COLOR_RED } } = AppStyles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: { marginTop: 165, width: 80, height: 80 },
  inputUsuario: {
    marginTop: 40,
    paddingLeft: 17,
    paddingRight: 17,
    width: 320,
  },
  inputSenha: {
    marginTop: 20,
    paddingLeft: 17,
    paddingRight: 17,
    width: 320,
  },
  msgErro: {
    width: 320,
    marginTop: 7,
    color: COLOR_RED,
  },
  containerBtn: { marginTop: 30 },
  footer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 32,
  },
});

export default styles;
