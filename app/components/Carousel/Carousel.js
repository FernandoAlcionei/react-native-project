import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import CarouselPager from './resources/CarouselPager';
import styles from './styles';
import metrics from '../../config/metrics';

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = { activePage: props.initialPage > 0 ? props.initialPage : 0 };
  }

  componentDidMount() {
    const { initialPage } = this.props;

    if (initialPage > 0) {
      this.scrollToPage(initialPage);
    }
  }

  scrollToPage(activePage) {
    this.setState({ activePage });
    this.carousel.scrollToPage(activePage);
  }

  onPageSelected(activePage) {
    this.setState({ activePage });
  }

  renderNextButton = () => {
    const { nextLabel } = this.props;
    const id = 'btn-next';
    return !this.isLastSlide() && this.renderButton(nextLabel, id, this.onNextPress);
  }

  renderDoneButton = () => {
    const { onDone, doneLabel } = this.props;
    const id = 'btn-done';
    return this.isLastSlide() && this.renderButton(doneLabel, id, onDone);
  }

  onNextPress = () => {
    const { activePage } = this.state;
    return this.scrollToPage(activePage + 1);
  }

  isLastSlide = () => {
    const { activePage } = this.state;
    const { children } = this.props;

    return activePage === (children.length - 1);
  }

  renderPagination = () => {
    const { children, showPagination } = this.props;
    const { activePage } = this.state;

    if (showPagination) {
      return (
        <View id="pagination" style={styles.paginationDots}>
          {children.length > 1 && children.map((item, index) => (
            <TouchableOpacity
              key={`dot-${item.key}`}
              style={[
                styles.dot,
                (index === activePage) ? styles.activeDot : null,
              ]}
              onPress={() => this.scrollToPage(index)}
            />
          ))}
        </View>
      );
    }

    return null;
  }

  renderButton = (name, id, onPress) => {
    if (name && onPress) {
      return (
        <TouchableOpacity id={id} onPress={onPress} style={styles.bottomButton}>
          <Text style={styles.buttonText}>
            {name}
          </Text>
        </TouchableOpacity>
      );
    }

    return null;
  }

  render() {
    const { width, children, styleBullets } = this.props;

    return (
      <View style={styles.container}>
        <CarouselPager
          ref={(reference) => { this.carousel = reference; }}
          width={width}
          onPageSelected={page => this.onPageSelected(page)}
        >
          {children}
        </CarouselPager>

        <View style={[styles.wrapButtons, styleBullets]}>
          {this.renderPagination()}

          {this.renderNextButton()}
          {this.renderDoneButton()}
        </View>
      </View>
    );
  }
}

Carousel.defaultProps = {
  width: metrics.screenWidth,
  showPagination: false,
  initialPage: 0,
  nextLabel: '',
  doneLabel: '',
  onDone: () => {},
  styleBullets: {},
};

Carousel.propTypes = {
  children: PropTypes.array.isRequired,
  doneLabel: PropTypes.string,
  onDone: PropTypes.func,
  showPagination: PropTypes.bool,
  initialPage: PropTypes.number,
  width: PropTypes.number,
  nextLabel: PropTypes.string,
  styleBullets: PropTypes.object,
};

export default Carousel;
