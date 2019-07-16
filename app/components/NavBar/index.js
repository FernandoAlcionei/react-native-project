import React, { Component } from 'react';
import { View, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';
import TextView from '../TextView';
import ButtonIcon from '../ButtonIcon';
import AppStyles from '../../config/styles';
import styles from './styles';

const { headers: { HEADER_DEFAULT }, fontSizes: { FONT_SIZE_HEADER_ANDROID, FONT_SIZE_DEFAULT, FONT_SIZE_TEXT_MEDIUM } } = AppStyles;
const statusBarHeight = StatusBar.currentHeight + 2;

const isIos = () => Platform.OS === 'ios';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getStyleNavBar = () => {
    const { headerStyle } = this.props;

    return {
      height: isIos() ? 44 : (54 + statusBarHeight),
      paddingTop: StatusBar.currentHeight ? statusBarHeight : 0,
      backgroundColor: headerStyle.BACKGROUND_COLOR,
    };
  }

  renderButtonIcon = (propsButton) => {
    const { headerStyle } = this.props;

    return (
      <ButtonIcon {...propsButton} styleProps={{ marginHorizontal: isIos() ? 0 : 8 }} color={headerStyle.COLOR} width={48} height={35} />
    );
  }

  renderButtonText = (propsButton) => {
    const { headerStyle } = this.props;

    return (
      <TouchableOpacity {...propsButton}>
        <TextView
          styleProps={{ marginHorizontal: 8 }}
          color={headerStyle.COLOR}
          size={FONT_SIZE_TEXT_MEDIUM}
        >
          {propsButton.title}
        </TextView>
      </TouchableOpacity>
    );
  }

  renderTitle = (titulo) => {
    const { headerStyle } = this.props;

    return (
      <View style={styles.titulo}>
        <TextView
          id="titulo"
          numLines={1}
          color={headerStyle.COLOR}
          size={isIos() ? FONT_SIZE_DEFAULT : FONT_SIZE_HEADER_ANDROID}
        >
          {titulo}
        </TextView>
      </View>
    );
  }

  render() {
    const { titulo, rightButtonIcon, leftButtonIcon, rightButtonText, children } = this.props;

    return (
      <View id="navbar-container" style={[styles.container, this.getStyleNavBar()]}>
        {leftButtonIcon && this.renderButtonIcon(leftButtonIcon)}
        {children || this.renderTitle(titulo)}
        {rightButtonIcon && this.renderButtonIcon(rightButtonIcon)}
        {rightButtonText && this.renderButtonText(rightButtonText)}
      </View>
    );
  }
}

NavBar.propTypes = {
  titulo: PropTypes.string,
  rightButtonIcon: PropTypes.object,
  rightButtonText: PropTypes.object,
  leftButtonIcon: PropTypes.object,
  children: PropTypes.object,
  headerStyle: PropTypes.object,
};

NavBar.defaultProps = {
  titulo: '',
  rightButtonIcon: null,
  leftButtonIcon: null,
  rightButtonText: null,
  children: null,
  headerStyle: HEADER_DEFAULT,
};

export default NavBar;
