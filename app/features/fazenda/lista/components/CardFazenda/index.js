import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import TextView from '../../../../../components/TextView/index';
import AppStyles from '../../../../../config/styles';
import styles from './styles';

const {
  color: { COLOR_BLACK, COLOR_GREY, COLOR_DARK_GRAY },
  fontSizes: { FONT_SIZE_TEXT_SMALL, FONT_SIZE_TEXT_MEDIUM, FONT_SIZE_TEXT }
} = AppStyles;

class CardFazenda extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onCardPress = (fazenda) => {
    const { onCardClick } = this.props;

    onCardClick(fazenda);
  }

  render() {
    const { fazenda, index } = this.props;

    return (
      <TouchableOpacity
        id="card"
        onPress={() => this.onCardPress(fazenda)}
        style={[styles.card, index === 0 ? styles.primeiroCard : null]}
        key={`fazenda-${fazenda.id}`}
      >
        <View id={`area-${fazenda.area.id}`} style={[{ backgroundColor: fazenda.area.cor }, styles.area]} />

        <TextView size={FONT_SIZE_TEXT_SMALL} color={COLOR_BLACK}>
          Próxima vistoria {'\u2022'} {fazenda.dataVistoria}
        </TextView>

        <TextView size={FONT_SIZE_TEXT} color={COLOR_DARK_GRAY}>
          {fazenda.nome}
        </TextView>

        <View style={styles.infoFazenda}>
          <TextView styleProps={{ color: COLOR_GREY }} size={FONT_SIZE_TEXT_MEDIUM}>
            {fazenda.area.rotulo}
          </TextView>

          <TextView styleProps={styles.cnpj} size={FONT_SIZE_TEXT_SMALL}>
            {fazenda.cnpj}
          </TextView>
        </View>
      </TouchableOpacity>
    );
  }
}

CardFazenda.propTypes = {
  fazenda: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

CardFazenda.defaultProps = {};

export default CardFazenda;
