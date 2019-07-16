import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import TextView from '../../../components/TextView';
import styles from './styles';
import AppStyles from '../../../config/styles';

const {
  color: { COLOR_GREY },
  fontSizes: { FONT_SIZE_TEXT_MEDIUM, FONT_SIZE_TEXT },
} = AppStyles;

export class BuscaView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filtered: false,
      filtro: {
        busca: '',
        pagina: 0,
      },
    };
  }

  componentWillReceiveProps(props) {
    const { busca, searched } = props;
    const { filtro, filtered } = this.state;

    if (filtered) {
      return;
    }

    this.setState(
      { filtro: { ...filtro, busca }, filtered: searched },
      () => {
        if (!searched) {
          return;
        }

        this.adicionarFiltro(busca);
      },
    );
  }

  adicionarFiltro = (busca) => {
    const {
      filtrarBusca,
      adicionarFiltroDeBusca,
      filtro,
      labelsFiltro = [],
      filtroDeBusca,
    } = this.props;

    const { filtro: filtroBusca } = this.state;

    if (this.buscaValida(busca)) {
      const labels = labelsFiltro.filter(label => label.tipo !== 'busca');

      labels.push({
        tipoDeFiltro: 'busca',
        tipo: 'busca',
        id: labels.length + 1,
        nome: busca,
      });

      filtrarBusca(Object.assign(filtro, { ...filtroBusca, busca }), labels);

      filtroDeBusca.busca = Object.assign({ isSelecionado: true }, { texto: busca });

      adicionarFiltroDeBusca(filtroDeBusca);
      this.voltar();
    }
  }

  buscaValida = (valor) => {
    const texto = String(valor || '').trim();
    return texto.length >= 2;
  }

  filtrar(listaDeResultados) {
    const { filtro } = this.state;

    let atributo;
    const resultadosFiltrados = [...new Set(
      listaDeResultados.filter(resultado => (
        Object.keys(resultado)
          .some((key) => {
            const result = resultado[key] && String(resultado[key]).toLocaleLowerCase()
              .includes(filtro.busca.toLocaleLowerCase());

            if (result) {
              atributo = key;
            }
            return result;
          })
      ))
        .map(resultado => resultado[atributo]),
    )];

    return resultadosFiltrados;
  }

  voltar = () => {
    Actions.pop();
  }

  renderAutoComplete() {
    const { listaDeResultados } = this.props;

    return (
      <ScrollView id="lista-de-busca">
        { this.filtrar(listaDeResultados).map(this.renderResultadoFiltro) }
      </ScrollView>
    );
  }

  renderBuscasRecentes(historicoDeBuscas) {
    const { limparHistoricoDeBuscas } = this.props;

    return historicoDeBuscas && historicoDeBuscas.length > 0 && (
      <ScrollView>
        <View style={styles.infoBuscaRecente}>
          <TextView size={FONT_SIZE_TEXT}>
            Buscas recentes
          </TextView>

          <TouchableOpacity id="btn-limpar-historico" onPress={() => limparHistoricoDeBuscas()}>
            <TextView size={FONT_SIZE_TEXT_MEDIUM} styleProps={styles.labelLimpar}>
              Limpar histórico
            </TextView>
          </TouchableOpacity>
        </View>

        <View id="historico">
          { historicoDeBuscas.map(this.renderBuscaRecente) }
        </View>
      </ScrollView>
    );
  }

  renderBuscaRecente = (filtro, indice) => this.renderItemFiltros(
    filtro.texto,
    indice,
    'ios-timer',
    () => this.adicionarFiltro(filtro.texto),
  );

  renderResultadoFiltro = (texto, indice) => this.renderItemFiltros(
    texto,
    indice,
    'ios-search',
    () => this.adicionarFiltro(texto),
  );

  renderItemFiltros = (texto, indice, icone, onPress) => (
    <TouchableOpacity id={`item-${indice}`} key={`item-${indice}`} style={styles.btnBuscaRecente} onPress={onPress}>
      <Ionicons name={icone} size={18} color={COLOR_GREY} />

      <TextView key={`text-item-${indice}`} styleProps={styles.labelRecente} size={FONT_SIZE_TEXT}>
        {texto.toString()}
      </TextView>
    </TouchableOpacity>
  );

  render() {
    const { historicoDeBuscas } = this.props;
    const { filtro } = this.state;

    return (
      <View style={styles.containerBusca}>
        {
          filtro && this.buscaValida(filtro.busca)
            ? this.renderAutoComplete()
            : this.renderBuscasRecentes(historicoDeBuscas)
        }
      </View>
    );
  }
}

BuscaView.propTypes = {
  historicoDeBuscas: PropTypes.array.isRequired,
  filtroDeBusca: PropTypes.object.isRequired,
  listaDeResultados: PropTypes.array.isRequired,
  filtro: PropTypes.object.isRequired,
  labelsFiltro: PropTypes.array.isRequired,
  filtrarBusca: PropTypes.func.isRequired,
  adicionarFiltroDeBusca: PropTypes.func.isRequired,
  limparHistoricoDeBuscas: PropTypes.func.isRequired,
  busca: PropTypes.string,
  searched: PropTypes.bool,
};

BuscaView.defaultProps = { busca: '', searched: false };

export default BuscaView;
