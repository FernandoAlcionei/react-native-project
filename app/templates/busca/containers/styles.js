import { StyleSheet } from 'react-native';
import StyleApp from '../../../config/styles';

const { headers: { HEADER_WHITE }, color: { COLOR_PRIMARY } } = StyleApp;

const styles = StyleSheet.create({
  campoDeBusca: {
    color: HEADER_WHITE.COLOR,
    flexGrow: 1,
  },
  container: { flex: 1 },
  busca: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  containerBusca: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  infoBuscaRecente: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 15,
    paddingRight: 15,
    paddingLeft: 37.5,
  },
  labelLimpar: { color: COLOR_PRIMARY },
  btnBuscaRecente: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 10,
    paddingTop: 8,
  },
  labelRecente: { paddingLeft: 5 },
});

export default styles;
