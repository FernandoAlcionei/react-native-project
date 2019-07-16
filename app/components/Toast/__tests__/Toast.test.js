import React from 'react';
import { mount } from 'enzyme';
import Toast from '../index';

const props = {
  toast: '',
  msg: '',
  fechar: () => {},
  timeout: 0,
};

const getWrapper = () => {
  jest.useFakeTimers();
  return mount(<Toast {...props} />);
};

describe('Teste do componente Toast', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('O componente deve montar e renderizar corretamente', () => {
    expect(wrapper).not.toBeNull();
  });

  it('O componente deve exibir a modal contendo a mensagem de erro', () => {
    const msg = 'Mensagem';

    wrapper.setProps({ msg, timeout: 8 });
    wrapper.update();

    expect(wrapper.find('#msg').first().text()).toBe(msg);
  });

  it('O componente deve fechar a modal quando for clicado no botão fechar', () => {
    const fechar = jest.fn();

    wrapper.setProps({ fechar, timeout: 1000 });
    wrapper.update();

    wrapper.find('#btn-fechar-toast').first().props().onPress();

    jest.runAllTimers();

    expect(fechar).toHaveBeenCalledTimes(2);
  });

  it('O componente deve fechar a modal quando expirar o timeout', () => {
    const fechar = jest.fn();

    wrapper.setProps({ fechar, timeout: 1000 });
    wrapper.update();

    expect(fechar).toHaveBeenCalledTimes(0);

    jest.runAllTimers();

    expect(fechar).toHaveBeenCalledTimes(1);
  });
});
