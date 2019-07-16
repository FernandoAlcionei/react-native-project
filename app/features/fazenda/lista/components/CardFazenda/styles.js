import { StyleSheet } from 'react-native';
import AppStyles from '../../../../../config/styles';

const { color: { COLOR_BLACK, COLOR_PRIMARY, COLOR_WHITE } } = AppStyles;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: COLOR_WHITE,
    paddingVertical: 15,
    paddingLeft: 20,
    paddingRight: 10,
    borderRadius: 1,
    shadowColor: COLOR_BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  primeiroCard: { marginTop: 10 },
  area: {
    marginBottom: 9,
    width: 35,
    height: 7,
  },
  cnpj: { color: COLOR_PRIMARY },
  infoFazenda: {
    paddingTop: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
