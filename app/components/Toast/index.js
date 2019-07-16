import React, { Component } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import AppStyles from '../../config/styles';
import TextView from '../TextView';

const { color: { COLOR_WHITE } } = AppStyles;

class Toast extends Component {
  constructor(props) {
    super(props);

    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.exibirToast();
  }

  exibirToast() {
    const { timeout } = this.props;

    Animated.timing(
      this.animatedValue,
      { toValue: 1, duration: 800 },
    ).start(() => {
      this.timer = setTimeout(() => {
        this.ocultarToast();
      }, timeout);
    });
  }

  ocultarToast = () => {
    Animated.timing(
      this.animatedValue,
      { toValue: 0, duration: 400 },
    ).start(() => this.fechar());
  }

  fechar = () => {
    const { fechar } = this.props;
    clearTimeout(this.timer);
    fechar();
  }

  render() {
    const { toast, msg } = this.props;
    const animation = this.animatedValue.interpolate({
      inputRange: [0, 0.3, 1],
      outputRange: [-70, -10, 0],
    });

    return (
      <Animated.View
        style={[
          styles.container,
          styles[toast],
          { transform: [{ translateY: animation }] },
        ]}
      >
        <View style={styles.containerMsg}>
          <TextView id="msg" size={13} styleProps={styles.msg}>
            {msg}
          </TextView>
        </View>

        <TouchableOpacity id="btn-fechar-toast" style={styles.btnFechar} onPress={() => this.ocultarToast()}>
          <Ionicons name="ios-close" size={25} color={COLOR_WHITE} />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

Toast.propTypes = {
  toast: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  fechar: PropTypes.func.isRequired,
  timeout: PropTypes.number.isRequired,
};

export default Toast;
