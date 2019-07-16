import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Carousel from '../../../../components/Carousel/Carousel';
import AppStyles from '../../../../config/styles';
import TextView from '../../../../components/TextView';
import styles from './styles';
import TextInfo from '../components/TextInfo';

const {
  fontSizes: { FONT_SIZE_TEXT_MEDIUM },
  color: { COLOR_PRIMARY },
} = AppStyles;

class FazendaView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  visualizarAnimais = (fazenda) => {
    alert('Em desenvolvimento');
    Actions.push('animais', { id: fazenda.id });
  }

  renderVistorias = (fazenda) => {
    if (fazenda.vistorias.length) {
      return (
        <View style={styles.vistorias}>
          <Carousel showPagination styleBullets={styles.bulletsCarousel}>
            { fazenda.vistorias.map((vistoria, index) => this.renderVistoria(vistoria, index)) }
          </Carousel>
        </View>
      );
    }
    return null;
  }

  renderVistoria = (vistoria, index) => (
    <View key={`vistoria-${index}`} style={styles.cardVistoria}>
      <TextView styleProps={styles.dataVistoria} size={FONT_SIZE_TEXT_MEDIUM}>
        Vistoria {'\u2022'} {vistoria.data}
      </TextView>

      <TextInfo label="Laudo da vistoria" info={vistoria.laudo} />
    </View>
  );

  render() {
    const { fazenda } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView>
          { this.renderVistorias(fazenda) }

          <View style={styles.infoFazenda}>
            <TextInfo label="Próxima vistoria" info={fazenda.dataVistoria} />

            <TextView styleProps={styles.descricao} size={FONT_SIZE_TEXT_MEDIUM}>
              {fazenda.descricao}
            </TextView>
          </View>

          <View style={styles.containerBtnAnimais}>
            <TouchableOpacity id="btn-animais" style={styles.btnAnimais} onPress={() => this.visualizarAnimais(fazenda)}>
              <TextView styleProps={styles.labelBtnAnimais}>
                Animais
              </TextView>
            </TouchableOpacity>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.infoFazenda}>
            <TextInfo label="Proprietário" info={fazenda.proprietario} />

            <TextInfo label="Responsável Técnico" info={fazenda.responsavel} />

            <TextInfo label="Contato" info={fazenda.contato} />

            <TextInfo label="CNPJ" info={fazenda.cnpj} infoColor={COLOR_PRIMARY} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

FazendaView.propTypes = { fazenda: PropTypes.object.isRequired };

export default FazendaView;
