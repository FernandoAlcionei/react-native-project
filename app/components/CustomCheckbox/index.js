import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppStyles from '../../config/styles';
import TextView from '../TextView';
import styles from './styles';

const { color: { COLOR_PRIMARY, COLOR_GREY, COLOR_WHITE } } = AppStyles;

class CustomCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  icon = () => {
    const { id, itemSelecionado, value, icon, renderIcon } = this.props;

    if (icon) {
      return (
        <View id="icon-checkbox" style={styles.containerIcon}>
          <Ionicons id={`icon-${id}`} name={icon} size={15} color={value === itemSelecionado ? COLOR_WHITE : COLOR_GREY} />
        </View>
      );
    }

    if (renderIcon) {
      return (
        <View id="icon-checkbox" style={styles.containerIcon}>
          { renderIcon() }
        </View>
      );
    }

    return null;
  }

  render() {
    const { itemSelecionado, id, value, index, label, onPress } = this.props;

    return (
      <TouchableOpacity
        key={id}
        id={id}
        style={{
          ...styles.container,
          backgroundColor: (value === itemSelecionado ? COLOR_PRIMARY : COLOR_WHITE),
        }}
        onPress={() => onPress(index, value)}
      >
        { this.icon() }

        <TextView styleProps={styles.label} color={(value === itemSelecionado ? COLOR_WHITE : COLOR_GREY)}>
          {label}
        </TextView>
      </TouchableOpacity>
    );
  }
}

CustomCheckbox.propTypes = {
  id: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  itemSelecionado: PropTypes.any,
  icon: PropTypes.string,
  renderIcon: PropTypes.func,
};

CustomCheckbox.defaultProps = {
  itemSelecionado: null,
  icon: null,
  renderIcon: null,
};

export default CustomCheckbox;
