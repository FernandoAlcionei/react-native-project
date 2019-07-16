import { StyleSheet } from 'react-native';
import AppStyles from '../../config/styles';

const { color: { COLOR_GRAY_BACKGROUND } } = AppStyles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_GRAY_BACKGROUND,
  },
  loadingFooter: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  msgSemResultado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
