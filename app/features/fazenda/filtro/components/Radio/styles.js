import { StyleSheet } from 'react-native';
import AppStyles from '../../../../../config/styles';

const { fontSizes: { FONT_SIZE_TEXT_MEDIUM }, color: { COLOR_LIGHT_GRAY } } = AppStyles;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: COLOR_LIGHT_GRAY,
    paddingVertical: 15,
  },
  label: {
    paddingLeft: 5,
    fontSize: FONT_SIZE_TEXT_MEDIUM,
  },
  containerLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapRadio: {
    height: 16,
    width: 16,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio: {
    height: 10,
    width: 10,
    borderRadius: 6,
  },
});

export default styles;
