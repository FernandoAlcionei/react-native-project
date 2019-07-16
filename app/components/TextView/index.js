import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Animated } from 'react-native';
import AppStyles from '../../config/styles';

const { color: { COLOR_GREY }, fontSizes } = AppStyles;

class TextView extends Component {
  constructor(props) {
    super(props);

    this.state = { opacity: new Animated.Value(0) };
  }

  componentDidMount() {
    const { opacity } = this.state;
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
    }).start();
  }

  render() {
    const { opacity } = this.state;
    const { children, styleProps, numLines, size, color } = this.props;

    return (
      <Animated.View style={{ opacity }}>
        <Text
          numberOfLines={numLines}
          style={{
            fontSize: size,
            color,
            ...styleProps,
          }}
        >
          {children}
        </Text>
      </Animated.View>
    );
  }
}

TextView.propTypes = {
  children: PropTypes.any,
  size: PropTypes.number,
  numLines: PropTypes.number,
  styleProps: PropTypes.object,
  color: PropTypes.string,
};

TextView.defaultProps = {
  children: '',
  size: fontSizes.FONT_SIZE_DEFAULT,
  numLines: 0,
  styleProps: {},
  color: COLOR_GREY,
};

export default TextView;
