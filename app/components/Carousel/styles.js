import { StyleSheet } from 'react-native';
import StyleApp from '../../config/styles';

const { color: { COLOR_PRIMARY, COLOR_WHITE } } = StyleApp;

const styles = StyleSheet.create({
  container: { flex: 1 },
  wrapButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  paginationDots: {
    height: 16,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    borderWidth: 1,
    borderColor: COLOR_PRIMARY,
    backgroundColor: COLOR_WHITE,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
    padding: 3,
  },
  activeDot: { backgroundColor: COLOR_PRIMARY },
  bottomButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLOR_PRIMARY,
    backgroundColor: 'transparent',
    fontSize: 16,
    padding: 12,
  },
});

export default styles;
