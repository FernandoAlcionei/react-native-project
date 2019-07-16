import { StyleSheet } from 'react-native';
import StyleApp from '../../../../config/styles';
import metrics from '../../../../config/metrics';

const { screenWidth } = metrics;

const {
  color: { COLOR_PRIMARY, COLOR_DARK_GRAY, COLOR_LIGHT_GRAY, COLOR_WHITE },
  fontSizes: { FONT_SIZE_TEXT_MEDIUM },
} = StyleApp;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLOR_WHITE },
  vistorias: {
    flex: 1,
    height: 130,
  },
  cardVistoria: {
    height: 130,
    width: screenWidth,
    backgroundColor: COLOR_LIGHT_GRAY,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  bulletsCarousel: { paddingBottom: 0 },
  dataVistoria: {
    color: COLOR_DARK_GRAY,
    marginBottom: 10,
  },
  infoFazenda: { marginHorizontal: 15 },
  containerBtnPecuaria: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPecuaria: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderColor: COLOR_PRIMARY,
    borderWidth: 1,
    marginVertical: 15,
  },
  labelBtnPecuaria: {
    color: COLOR_PRIMARY,
    marginVertical: 8,
    marginHorizontal: 25,
    fontSize: FONT_SIZE_TEXT_MEDIUM,
  },
  divider: {
    backgroundColor: COLOR_LIGHT_GRAY,
    marginTop: 10,
    marginBottom: 15,
  },
  descricao: { textAlign: 'justify' },
});

export default styles;
