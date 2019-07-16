import React from 'react';
import { mount } from 'enzyme';
import OnboardingContainer from '../containers/OnboardingContainer';

const getWrapper = () => {
  jest.useFakeTimers();
  return mount(<OnboardingContainer />);
};

describe('Teste da feature OnboardingContainer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('O componente deve montar e renderizar corretamente', () => {
    expect(wrapper).not.toBeNull();
    expect(wrapper.exists('OnboardingView')).toEqual(true);
  });
});
