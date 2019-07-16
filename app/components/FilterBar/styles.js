import { StyleSheet } from 'react-native';
import AppStyles from '../../config/styles';

const { color: { COLOR_PRIMARY, COLOR_WHITE } } = AppStyles;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  containerFiltro: {
    marginRight: 7,
    paddingLeft: 7,
    marginBottom: 5,
    borderRadius: 3,
    flexDirection: 'row',
    backgroundColor: COLOR_WHITE,
    alignItems: 'center',
  },
  btnRemoverFiltro: { paddingHorizontal: 7 },
  limpar: {
    color: COLOR_PRIMARY,
    paddingVertical: 2,
    paddingRight: 7,
  },
});

export default styles;
