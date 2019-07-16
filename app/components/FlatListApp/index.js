import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import styles from './styles';
import AppStyles from '../../config/styles';
import TextView from '../TextView';
import Toast from '../Toast';
import Loader from '../Loader';
import FilterBar from '../FilterBar';

const { color: { COLOR_PRIMARY } } = AppStyles;

class FlatListApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onEndReached = () => {
    const { totalDePaginas, onEndReached } = this.props;
    let { paginaAtual } = this.props;

    paginaAtual += 1;

    if (paginaAtual < totalDePaginas && !this.hasLoading()) {
      onEndReached(paginaAtual);
    }
  }

  hasLoading = () => {
    const { loadingFooter, loadingOnRefresh, loadingView } = this.props;
    return loadingFooter || loadingOnRefresh || loadingView;
  }

  renderFooter = loadingFooter => loadingFooter && (
    <View id="loading-footer" style={styles.loadingFooter}>
      <ActivityIndicator color={COLOR_PRIMARY} size="large" />
    </View>
  );

  renderLista = () => {
    const { lista, loadingOnRefresh, loadingFooter, renderRow, onRefresh } = this.props;

    return (
      <FlatList
        id="lista"
        data={lista}
        renderItem={renderRow}
        keyExtractor={item => item.id}
        onEndReached={this.onEndReached}
        ListFooterComponent={() => this.renderFooter(loadingFooter)}
        renderFooter={() => this.renderFooter(loadingFooter)}
        onEndReachedThreshold={3}
        refreshControl={
          <RefreshControl colors={[COLOR_PRIMARY]} refreshing={loadingOnRefresh} onRefresh={onRefresh} />
        }
        windowSize={41}
      />
    );
  }

  renderMsgSemResultado = msg => (
    <View style={styles.msgSemResultado}>
      <TextView id="msg-sem-resultado">{msg}</TextView>
    </View>
  )

  renderToast = (msgDeErro, removerMsgDeErro) => msgDeErro && (
    <Toast fechar={removerMsgDeErro} timeout={5000} toast="erro" msg={msgDeErro} />
  );

  render() {
    const { loadingView, lista, msgDeErro, msgSemResultado, removerMsgDeErro, labelsFiltro, removerFiltro } = this.props;

    return (
      <View style={styles.container}>
        { this.renderToast(msgDeErro, removerMsgDeErro) }

        <Loader isVisible={loadingView} />

        <FilterBar filtros={labelsFiltro} remover={removerFiltro} limpar={removerFiltro} />

        {
          (lista.length) ? this.renderLista() : this.renderMsgSemResultado(msgSemResultado)
        }
      </View>
    );
  }
}

FlatListApp.propTypes = {
  lista: PropTypes.array.isRequired,
  onEndReached: PropTypes.func.isRequired,
  renderRow: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  removerMsgDeErro: PropTypes.func.isRequired,
  msgSemResultado: PropTypes.string.isRequired,
  removerFiltro: PropTypes.func.isRequired,
  labelsFiltro: PropTypes.array.isRequired,
  totalDePaginas: PropTypes.number,
  paginaAtual: PropTypes.number,
  loadingView: PropTypes.bool,
  msgDeErro: PropTypes.string,
  loadingOnRefresh: PropTypes.bool,
  loadingFooter: PropTypes.bool,
};

FlatListApp.defaultProps = {
  loadingView: false,
  msgDeErro: null,
  loadingOnRefresh: false,
  loadingFooter: false,
  paginaAtual: 0,
  totalDePaginas: 0,
};

export default FlatListApp;
