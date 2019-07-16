import { StyleSheet } from 'react-native';
import StyleApp from '../../../config/styles';
import metrics from '../../../config/metrics';

const {
  fontSizes: { FONT_SIZE_TEXT, FONT_SIZE_TEXT_MEDIUM },
  color: { COLOR_GRAY_TITLE, COLOR_GREY, COLOR_GRAY_BACKGROUND },
} = StyleApp;

const width = metrics.screenWidth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_GRAY_BACKGROUND,
  },
  mainContent: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    padding: 10,
    width,
    paddingHorizontal: 16,
  },
  title: {
    paddingBottom: 15,
    marginHorizontal: 35,
    textAlign: 'center',
    color: COLOR_GRAY_TITLE,
    fontSize: FONT_SIZE_TEXT,
  },
  containerLabels: { flex: 1 },
  text: {
    marginHorizontal: 20,
    textAlign: 'center',
    color: COLOR_GREY,
    fontSize: FONT_SIZE_TEXT_MEDIUM,
  },
  image: {
    flex: 3,
    marginVertical: 50,
    marginHorizontal: 20,
    resizeMode: 'contain',
  },
});

export default styles;
