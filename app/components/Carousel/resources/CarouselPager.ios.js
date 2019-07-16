import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';

class CarouselPager extends Component {
  scrollToPage(page) {
    const { width } = this.props;
    this.scrollView.scrollTo({ x: page * width, y: 0 });
  }

  onMomentumScrollEnd(position) {
    const { width, onPageSelected } = this.props;
    const activePage = position / width;
    onPageSelected(activePage);
  }

  render() {
    const { children } = this.props;

    return (
      <ScrollView
        ref={(reference) => { this.scrollView = reference; }}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollsToTop={false}
        onMomentumScrollEnd={event => this.onMomentumScrollEnd(event.nativeEvent.contentOffset.x)}
        horizontal
        pagingEnabled
      >
        {children}
      </ScrollView>
    );
  }
}

CarouselPager.propTypes = {
  children: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  onPageSelected: PropTypes.func.isRequired,
};

export default CarouselPager;
