import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import FlatListApp from '../../../../components/FlatListApp';
import CardFazenda from '../components/CardFazenda/index';

class FazendasView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentWillMount() {
    await this.reiniciarFiltro();
  }

  reiniciarFiltro = async () => {
    const { reiniciarFiltro } = this.props;
    await reiniciarFiltro();
    this.carregarFazendas();
  }

  carregarFazendas = (filtroDeFazenda, loadingFooter = false, loadingOnRefresh = false) => {
    const { listarFazendas, filtroReducer: { filtro } } = this.props;
    let filtroDeBusca = filtroDeFazenda;

    if (!filtroDeBusca) {
      filtroDeBusca = { ...filtro, pagina: 0 };
    }

    listarFazendas(filtroDeBusca, loadingFooter, loadingOnRefresh);
  }

  onCardClick = fazenda => Actions.push('fazenda', { fazenda, title: fazenda.nome });

  renderRow = ({ item, index }) => <CardFazenda key={`fazenda-${item.id}`} index={Number(index)} fazenda={item} onCardClick={this.onCardClick} />;

  onRefresh = () => this.carregarFazendas(null, null, true);

  onEndReached = () => {
    const { filtroReducer: { filtro } } = this.props;
    filtro.pagina += 1;
    this.carregarFazendas(filtro, true);
  }

  removerFiltroDeFazenda = async (filtroDeBusca) => {
    const { removerFiltro } = this.props;

    if (!filtroDeBusca) {
      this.reiniciarFiltro();
    } else {
      await removerFiltro(filtroDeBusca);
      this.carregarFazendas();
    }
  };

  render() {
    const {
      removerMsgDeErro,
      fazendasReducer: { loadingFazendas, fazendas, msgDeErro, loadingOnRefresh, loadingFooter, totalDePaginas },
      filtroReducer: { labelsFiltro, filtro }
    } = this.props;

    return (
      <FlatListApp
        lista={fazendas}
        onEndReached={this.onEndReached}
        renderRow={this.renderRow}
        onRefresh={this.onRefresh}
        removerMsgDeErro={removerMsgDeErro}
        loadingView={loadingFazendas}
        msgDeErro={msgDeErro}
        loadingOnRefresh={loadingOnRefresh}
        loadingFooter={loadingFooter}
        msgSemResultado="Nenhuma fazenda encontrada"
        labelsFiltro={labelsFiltro}
        removerFiltro={this.removerFiltroDeFazenda}
        paginaAtual={filtro.pagina}
        totalDePaginas={totalDePaginas}
      />
    );
  }
}

FazendasView.propTypes = {
  filtroReducer: PropTypes.object.isRequired,
  fazendasReducer: PropTypes.object.isRequired,
  listarFazendas: PropTypes.func.isRequired,
  removerMsgDeErro: PropTypes.func.isRequired,
  reiniciarFiltro: PropTypes.func.isRequired,
  removerFiltro: PropTypes.func.isRequired,
};

FazendasView.defaultProps = {};

export default FazendasView;
