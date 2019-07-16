import { StyleSheet } from 'react-native';
import AppStyles from '../../../../config/styles';

const {
  fontSizes: { FONT_SIZE_TEXT },
  color: { COLOR_GRAY_BACKGROUND, COLOR_WHITE, COLOR_DARK_BLUE, COLOR_GRAY_BORDER },
} = AppStyles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_GRAY_BACKGROUND,
    justifyContent: 'space-between',
  },
  containerScroll: { paddingBottom: 70 },
  filtro: {
    backgroundColor: COLOR_GRAY_BACKGROUND,
    borderBottomWidth: 8,
    borderColor: COLOR_GRAY_BORDER,
  },
  labelFiltro: {
    paddingTop: 10,
    paddingLeft: 15,
    fontSize: FONT_SIZE_TEXT,
  },
  containerCheckbox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  area: {
    width: 15,
    height: 7,
    borderWidth: 0.3,
    borderColor: COLOR_WHITE,
  },
  btnFiltrar: { backgroundColor: COLOR_DARK_BLUE },
});

export default styles;
