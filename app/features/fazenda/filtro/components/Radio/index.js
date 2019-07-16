import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppStyles from '../../../../../config/styles';
import TextView from '../../../../../components/TextView';
import styles from './styles';

const { color: { COLOR_PRIMARY, COLOR_LIGHT_GRAY, COLOR_GREY } } = AppStyles;

class Radio extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { item, onPress, itemSelecionado } = this.props;

    return (
      <TouchableOpacity id={item.id} onPress={() => onPress(item)} style={styles.container}>
        <View style={styles.containerLabel}>
          <Ionicons name={item.icone} color={COLOR_GREY} size={item.iconSize ? item.iconSize : 25} />

          <TextView styleProps={styles.label}>
            {item.nome}
          </TextView>
        </View>

        <View
          id={`radio-${item.id}`}
          style={{
            ...styles.wrapRadio,
            borderColor: item.value === itemSelecionado ? COLOR_PRIMARY : COLOR_LIGHT_GRAY,
            backgroundColor: item.value !== itemSelecionado ? COLOR_LIGHT_GRAY : '',
          }}
        >
          <View
            style={{
              ...styles.radio,
              backgroundColor: item.value === itemSelecionado ? COLOR_PRIMARY : COLOR_LIGHT_GRAY,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

Radio.propTypes = {
  onPress: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  itemSelecionado: PropTypes.any,
};

Radio.defaultProps = { itemSelecionado: null };

export default Radio;
