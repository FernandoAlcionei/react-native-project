import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { onPress, styleProps, title, heightStyle, widthStyle, positionBottom } = this.props;

    return (
      <TouchableOpacity
        style={[
          {
            width: widthStyle,
            height: heightStyle,
            ...styles.button,
            ...styleProps,
          },
          positionBottom ? styles.positionBottom : null,
        ]}
        onPress={onPress}
      >
        <Text style={styles.title}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
}

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  styleProps: PropTypes.object,
  widthStyle: PropTypes.number,
  heightStyle: PropTypes.number,
  positionBottom: PropTypes.bool,
};

Button.defaultProps = {
  widthStyle: undefined,
  heightStyle: undefined,
  styleProps: {},
  positionBottom: false,
};

export default Button;
