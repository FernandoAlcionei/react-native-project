import React from 'react';
import { mount } from 'enzyme';
import Loader from '../index';

const props = { isVisible: false };

const getWrapper = () => mount(<Loader {...props} />);

describe('Teste do componente Loader', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('O componente deve montar e renderizar corretamente', () => {
    expect(wrapper).not.toBeNull();
    expect(wrapper.find('#loader').exists()).toBe(true);
  });

  it('Deve ocultar o loader quando o atributo "isVisible" estiver null ou false', () => {
    expect(wrapper.find('#loader').first().props().isVisible).toBe(false);
  });

  it('Deve exibir o loader quando o atributo "isVisible" estiver true', () => {
    wrapper.setProps({ isVisible: true });
    wrapper.update();

    expect(wrapper.find('#loader').first().props().isVisible).toBe(true);
  });
});
