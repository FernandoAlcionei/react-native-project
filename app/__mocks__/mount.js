import React from 'react';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';

export default function mock(Component, props = {}, initialState = {}) {
  jest.useFakeTimers();
  const store = configureMockStore()(initialState);
  return mount(<Component store={store} {...props} />);
}
