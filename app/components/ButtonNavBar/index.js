import React, { Component } from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { PropTypes } from 'prop-types';
import AppStyles from '../../config/styles';
import TextView from '../TextView';

const {
  headers: { HEADER_DEFAULT },
  fontSizes: { FONT_SIZE_TEXT_SMALL },
} = AppStyles;

const isIos = () => Platform.OS === 'ios';

class ButtonNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { onPress, label } = this.props;

    return (
      <TouchableOpacity onPress={onPress} style={{ paddingVertical: 5, paddingRight: isIos() ? 10 : 15 }}>
        <TextView color={HEADER_DEFAULT.COLOR} size={FONT_SIZE_TEXT_SMALL}>
          {label}
        </TextView>
      </TouchableOpacity>
    );
  }
}

ButtonNavBar.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default ButtonNavBar;
