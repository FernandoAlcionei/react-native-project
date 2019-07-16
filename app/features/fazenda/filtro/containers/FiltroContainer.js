import React from 'react';
import { connect } from 'react-redux';
import FiltroView from './FiltroView';
import { filtrarFazenda, listarAreas, msgDeErro } from '../actions';

const FiltroContainer = props => <FiltroView {...props} />;

const mapStateToProps = state => ({ filtroReducer: state.filtroDeFazendaReducer });

const mapDispatchToProps = dispatch => ({
  filtrarFazenda: (filtro, labelsFiltro) => dispatch(filtrarFazenda(filtro, labelsFiltro)),
  listarAreas: () => dispatch(listarAreas()),
  msgDeErro: msg => dispatch(msgDeErro(msg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltroContainer);
