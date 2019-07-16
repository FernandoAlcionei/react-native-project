import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import AppStyles from '../../config/styles';
import styles from './styles';
import TextView from '../TextView';

const { fontSizes: { FONT_SIZE_TEXT_SMALL }, color: { COLOR_PRIMARY } } = AppStyles;

class FilterBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderFiltro = (filtro) => {
    const { remover } = this.props;

    return (
      <View key={`filtro-${filtro.id}`} id={`filtro-${filtro.id}`} style={styles.containerFiltro}>
        <TextView size={FONT_SIZE_TEXT_SMALL}>
          {filtro.nome}
        </TextView>

        <TouchableOpacity onPress={() => remover(filtro)} style={styles.btnRemoverFiltro}>
          <Ionicons name="ios-close" size={18} color={COLOR_PRIMARY} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { filtros, limpar } = this.props;

    if (!filtros || !filtros.length) {
      return null;
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity id="btn-limpar" onPress={() => limpar()}>
          <TextView styleProps={styles.limpar} size={FONT_SIZE_TEXT_SMALL}>
            Limpar
          </TextView>
        </TouchableOpacity>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          automaticallyAdjustContentInsets
          horizontal
          scrollEnabled
        >
          {
            filtros.map(filtro => this.renderFiltro(filtro))
          }
        </ScrollView>
      </View>
    );
  }
}

FilterBar.propTypes = {
  filtros: PropTypes.array.isRequired,
  remover: PropTypes.func.isRequired,
  limpar: PropTypes.func.isRequired,
};

export default FilterBar;
