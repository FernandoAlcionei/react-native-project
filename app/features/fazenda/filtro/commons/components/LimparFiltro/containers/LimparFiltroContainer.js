import React from 'react';
import { connect } from 'react-redux';
import ButtonNavBar from '../../../../../../../components/ButtonNavBar/index';
import { limparFiltro } from '../../../../actions';

const LimparFiltroContainer = props => <ButtonNavBar {...props} label="Limpar" />;

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({ onPress: () => dispatch(limparFiltro()) });

export default connect(mapStateToProps, mapDispatchToProps)(LimparFiltroContainer);
