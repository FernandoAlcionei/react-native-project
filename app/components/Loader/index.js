import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import TextView from '../TextView';
import AppStyles from '../../config/styles';
import styles from './styles';

const { color: { COLOR_DARK_BLUE, COLOR_WHITE }, fontSizes: { FONT_SIZE_TEXT_SMALL } } = AppStyles;

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isVisible } = this.props;

    return (
      <Modal
        id="loader"
        isVisible={isVisible}
        backdropOpacity={0.75}
        backdropColor={COLOR_WHITE}
        backdropTransitionInTiming={0}
        backdropTransitionOutTiming={0}
        animationOut="fadeOut"
        animationIn="fadeIn"
        hideModalContentWhileAnimating
      >
        <View style={styles.container}>
          <ActivityIndicator color={COLOR_DARK_BLUE} style={styles.loader} />
          <TextView size={FONT_SIZE_TEXT_SMALL} color={COLOR_DARK_BLUE} styleProps={styles.labelLoader}>
            Carregando...
          </TextView>
        </View>
      </Modal>
    );
  }
}

Loader.propTypes = { isVisible: PropTypes.bool.isRequired };

export default Loader;
