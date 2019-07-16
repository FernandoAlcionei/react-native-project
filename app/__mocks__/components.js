import React, { PureComponent } from 'react';

export const mockScrollView = () => {
  jest.mock('ScrollView', () => {
    const MockScrollView = require.requireMock('ScrollViewMock');
    const RealScrollView = require.requireActual('ScrollView');
    class ScrollView extends PureComponent {
      render() {
        return <MockScrollView {...this.props} />;
      }
    }
    ScrollView.propTypes = RealScrollView.propTypes;
    return ScrollView;
  });
};
