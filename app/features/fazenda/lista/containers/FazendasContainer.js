import React from 'react';
import { connect } from 'react-redux';
import FazendasView from './FazendasView';
import { listarFazendas, removerMsgDeErro } from '../actions';
import { reiniciarFiltro, removerFiltro } from '../../filtro/actions';

const FazendasContainer = props => <FazendasView {...props} />;

const mapStateToProps = state => ({
  fazendasReducer: state.fazendasReducer,
  filtroReducer: state.filtroDeFazendaReducer,
});

const mapDispatchToProps = dispatch => ({
  listarFazendas: (filtro, loadingFooter, loadingOnRefresh) => dispatch(listarFazendas(filtro, loadingFooter, loadingOnRefresh)),
  removerMsgDeErro: () => dispatch(removerMsgDeErro()),
  reiniciarFiltro: () => dispatch(reiniciarFiltro()),
  removerFiltro: filtroDeBusca => dispatch(removerFiltro(filtroDeBusca)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FazendasContainer);
