import { connect } from 'react-redux';
import * as filtroActions from '../../filtro/actions';
import * as fazendasActions from '../../lista/actions';
import BuscaContainer from '../../../../templates/busca/containers/BuscaContainer';

const mapStateToProps = state => ({
  filtro: state.filtroDeFazendaReducer.filtro,
  labelsFiltro: state.filtroDeFazendaReducer.labelsFiltro,
  historicoDeBuscas: state.fazendasReducer.historicoDeBuscas,
  filtroDeBusca: state.fazendasReducer.filtroDeFazendas,
  listaDeResultados: state.fazendasReducer.fazendas,
  id: 'buscar-fazendas',
  placeholder: 'Buscar fazendas',
});

const mapDispatchToProps = dispatch => ({
  filtrarBusca: (filtro, labelsFiltro) => dispatch(filtroActions.filtrarFazenda(filtro, labelsFiltro)),
  adicionarFiltroDeBusca: filtro => dispatch(fazendasActions.adicionarFiltroDeFazendas(filtro)),
  limparHistoricoDeBuscas: () => dispatch(fazendasActions.limparHistoricoDeBuscas()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuscaContainer);
