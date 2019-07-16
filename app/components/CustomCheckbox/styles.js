import { StyleSheet } from 'react-native';
import AppStyles from '../../config/styles';

const { fontSizes: { FONT_SIZE_TEXT_MEDIUM } } = AppStyles;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    marginLeft: 0,
    padding: 4,
    paddingHorizontal: 8,
  },
  containerIcon: { paddingRight: 5 },
  label: { fontSize: FONT_SIZE_TEXT_MEDIUM },
});

export default styles;
