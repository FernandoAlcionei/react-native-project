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
    const { onPress, styleProps, title, height, width, positionBottom } = this.props;

    return (
      <TouchableOpacity
        style={[
          {
            width,
            height,
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
  width: PropTypes.number,
  height: PropTypes.number,
  positionBottom: PropTypes.bool,
};

Button.defaultProps = {
  width: undefined,
  height: undefined,
  styleProps: {},
  positionBottom: false,
};

export default Button;
