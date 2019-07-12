import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Animated } from 'react-native';
import AppStyles from '../../config/styles';

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = { _invalidate: new Animated.Value(0) };
  }

  componentDidMount() {
    const { _invalidate } = this.state;
    Animated.timing(_invalidate, {
      toValue: 1,
      duration: 1000,
    }).start();
  }

  render() {
    const { _invalidate } = this.state;
    _invalidate.interpolate({
      inputRange: [0, 300],
      outputRange: ['rgb(166, 166, 166)', 'rgb(232, 17, 35)'],
    });

    const { size, isInvalid, styleProps } = this.props;

    return (
      <View>
        <TextInput
          placeholderTextColor="#C5C5C5"
          style={{
            fontSize: size,
            borderColor: isInvalid ? '#E81123' : '#A6A6A6',
            color: '#333333',
            borderWidth: 1,
            height: 50,
            ...styleProps,
          }}
          {...this.props}
        />
      </View>
    );
  }
}

Input.propTypes = {
  size: PropTypes.number,
  styleProps: PropTypes.object,
  isInvalid: PropTypes.bool,
};

Input.defaultProps = {
  size: AppStyles.fontSizes.FONT_SIZE_DEFAULT,
  styleProps: {},
  isInvalid: false,
};

export default Input;
