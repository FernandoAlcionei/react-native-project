import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import TextView from '../../../../../components/TextView';
import AppStyles from '../../../../../config/styles';
import styles from './styles';

const {
  color: { COLOR_DARK_GRAY },
  fontSizes: { FONT_SIZE_TEXT_SMALL, FONT_SIZE_TEXT_MEDIUM },
} = AppStyles;

class TextInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { label, info, infoColor } = this.props;

    return (
      <View style={styles.containerInfo}>
        <TextView styleProps={styles.recebido} size={FONT_SIZE_TEXT_SMALL}>
          {label}
        </TextView>

        <TextView size={FONT_SIZE_TEXT_MEDIUM} color={infoColor} numLines={1}>
          {info}
        </TextView>
      </View>
    );
  }
}

TextInfo.propTypes = {
  label: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  infoColor: PropTypes.string,
};

TextInfo.defaultProps = { infoColor: COLOR_DARK_GRAY };

export default TextInfo;
