import { StyleSheet } from 'react-native';
import AppStyles from '../../config/styles';

const {
  color: { COLOR_PRIMARY, COLOR_WHITE },
  fontSizes: { FONT_SIZE_BUTTON },
} = AppStyles;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLOR_PRIMARY,
    alignItems: 'center',
    padding: 12,
  },
  positionBottom: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    margin: 10,
  },
  title: {
    fontSize: FONT_SIZE_BUTTON,
    color: COLOR_WHITE,
  },
});

export default styles;
