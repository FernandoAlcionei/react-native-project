import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ViewPagerAndroid } from 'react-native';

class CarouselPager extends Component {
  scrollToPage(page) {
    this.viewPager.setPage(page);
    this.onPageSelected(page);
  }

  onPageSelected(page) {
    const { onPageSelected } = this.props;
    onPageSelected(page);
  }

  render() {
    const { children } = this.props;

    return (
      <ViewPagerAndroid
        ref={(reference) => { this.viewPager = reference; }}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollsToTop={false}
        onPageSelected={event => this.onPageSelected(event.nativeEvent.position)}
        style={{ flex: 1 }}
        horizontal
      >
        { children }
      </ViewPagerAndroid>
    );
  }
}

CarouselPager.propTypes = {
  children: PropTypes.array.isRequired,
  onPageSelected: PropTypes.func.isRequired,
};

export default CarouselPager;
