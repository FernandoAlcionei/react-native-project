import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { View, ScrollView } from 'react-native';
import TextView from '../../../../components/TextView';
import styles from './styles';
import Button from '../../../../components/Button';
import Radio from '../components/Radio';
import Toast from '../../../../components/Toast';
import CustomCheckbox from '../../../../components/CustomCheckbox';

const camposDeOrdenacao = [{
  nome: 'Vistoria',
  icone: 'ios-calendar',
  id: 'vistoria',
  value: 'vistoria',
  iconSize: 20,
}];

const tiposDeOrdenacao = [{
  nome: 'Ordem crescente',
  icone: 'ios-arrow-round-up',
  id: 'crescente',
  value: 1,
}, {
  nome: 'Ordem decrescente',
  icone: 'ios-arrow-round-down',
  id: 'decrescente',
  value: -1,
}];

class FiltroView extends Component {
  constructor(props) {
    super(props);

    const { filtroReducer: { filtro } } = props;

    this.state = {
      filtro: {
        ...filtro,
        pagina: 0,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    const { filtroReducer: { filtro } } = nextProps;
    this.setState({ filtro: { ...filtro, pagina: 0 } });
  }

  componentWillMount() {
    const { listarAreas } = this.props;
    listarAreas();
  }

  filtrar = () => {
    const { filtro } = this.state;
    const { filtrarFazenda, filtroReducer: { filtro: filtroAtual, areas, labelsFiltro = [] } } = this.props;

    const labels = labelsFiltro.filter(label => label.tipoDeFiltro !== 'area');

    if (filtro.area) {
      let area = areas.find(areaFazenda => areaFazenda.id === filtro.area);
      area = { ...area, nome: area.rotulo };

      labels.push({
        tipoDeFiltro: 'area',
        ...area,
      });
    }

    const addLabels = Object.assign(filtroAtual, filtro);
    filtrarFazenda(addLabels, labels);
  }

  selecionarArea = (index) => {
    const { filtro } = this.state;
    const { filtroReducer: { areas } } = this.props;

    if (filtro.area === areas[index].id) {
      filtro.area = null;
    } else {
      filtro.area = areas[index].id;
    }
    this.setState({ filtro });
  }

  selecionarTipoDeOrdenacao = (tipoDeOrdenacao) => {
    const { filtro } = this.state;
    filtro.tipoDeOrdenacao = tipoDeOrdenacao.value;
    this.setState({ filtro });
  }

  fecharToast = () => {
    const { msgDeErro } = this.props;
    msgDeErro(null);
  }

  renderArea = (area, index) => {
    const { filtro } = this.state;
    return (
      <CustomCheckbox
        id={area.id}
        key={area.id}
        itemSelecionado={filtro.area}
        value={area.id}
        index={index}
        label={area.rotulo}
        onPress={this.selecionarArea}
        renderIcon={() => <View style={[{ backgroundColor: area.cor }, styles.area]} />}
      />
    );
  }

  renderToast = msgDeErro => msgDeErro && (
    <Toast fechar={this.fecharToast} timeout={5000} toast="erro" msg={msgDeErro} />
  );

  renderAreas = (areas) => {
    if (areas.length) {
      return (
        <View id="areas" style={styles.filtro}>
          <TextView styleProps={styles.labelFiltro}>
            Área
          </TextView>

          <View style={styles.containerCheckbox}>
            { areas.map((area, index) => this.renderArea(area, index)) }
          </View>
        </View>
      );
    }
    return null;
  }

  render() {
    const { filtro } = this.state;
    const { filtroReducer: { areas, msgDeErro } } = this.props;

    return (
      <View style={styles.container}>
        { this.renderToast(msgDeErro) }

        <ScrollView contentContainerStyle={styles.containerScroll}>
          <View style={styles.containerFiltro}>
            <View style={styles.filtro}>
              <TextView styleProps={styles.labelFiltro}>
                Ordenar por
              </TextView>

              {
                camposDeOrdenacao.map(ordenacao => (
                  <Radio key={ordenacao.id} id={ordenacao.id} item={ordenacao} itemSelecionado={filtro.campoDeOrdenacao} onPress={() => {}} />
                ))
              }
            </View>

            <View style={styles.filtro}>
              {
                tiposDeOrdenacao.map(tipoDeOrdenacao => (
                  <Radio
                    key={tipoDeOrdenacao.id}
                    id={tipoDeOrdenacao.id}
                    item={tipoDeOrdenacao}
                    itemSelecionado={filtro.tipoDeOrdenacao}
                    onPress={this.selecionarTipoDeOrdenacao}
                  />
                ))
              }
            </View>

            { this.renderAreas(areas) }
          </View>
        </ScrollView>

        <Button id="btn-filtrar" positionBottom title="Filtrar" onPress={this.filtrar} styleProps={styles.btnFiltrar} />
      </View>
    );
  }
}

FiltroView.propTypes = {
  filtroReducer: PropTypes.object.isRequired,
  filtrarFazenda: PropTypes.func.isRequired,
  listarAreas: PropTypes.func.isRequired,
  msgDeErro: PropTypes.func.isRequired,
};

export default FiltroView;
