import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class ButtonIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { id, color, icon, onPress, sizeIcon, width, height, styleProps } = this.props;

    return (
      <TouchableOpacity id={id} style={{ width, height, justifyContent: 'center', alignItems: 'center', ...styleProps }} onPress={onPress}>
        <Ionicons name={icon} size={sizeIcon} color={color} />
      </TouchableOpacity>
    );
  }
}

ButtonIcon.propTypes = {
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  sizeIcon: PropTypes.number.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  id: PropTypes.string,
  styleProps: PropTypes.object,
};

ButtonIcon.defaultProps = {
  width: 48,
  height: 48,
  id: '',
  styleProps: {},
};

export default ButtonIcon;
