import { StyleSheet } from 'react-native';
import StyleApp from '../../config/styles';

const { color: { COLOR_WHITE, COLOR_RED, COLOR_GREEN } } = StyleApp;

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingLeft: 15,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerMsg: { flex: 1 },
  msg: { color: COLOR_WHITE },
  btnFechar: {
    minWidth: 48,
    minHeight: 48,
    paddingRight: 15,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  sucesso: { backgroundColor: COLOR_GREEN },
  erro: { backgroundColor: COLOR_RED },
});

export default styles;
