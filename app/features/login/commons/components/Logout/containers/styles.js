import { StyleSheet } from 'react-native';
import AppStyles from '../../../../../../config/styles';

const { color: { COLOR_PRIMARY, COLOR_LIGHT_GRAY }, fontSizes: { FONT_SIZE_TEXT_MEDIUM } } = AppStyles;

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1,
    borderColor: COLOR_LIGHT_GRAY,
    paddingVertical: 15,
  },
  labelSair: {
    marginLeft: 15,
    color: COLOR_PRIMARY,
    fontSize: FONT_SIZE_TEXT_MEDIUM,
  },
});

export default styles;
