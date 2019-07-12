import React from 'react';
import { mount } from 'enzyme';
import Button from '../index';

const props = {
  onPress: () => {},
  title: '',
  id: 'button',
};

const getWrapper = () => mount(<Button {...props} />);

describe('Teste do componente Button', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('O componente deve montar e renderizar corretamente', () => {
    expect(wrapper).not.toBeNull();
  });

  it('O componente deve exibir a label "Entrar"', () => {
    const title = 'Entrar';

    wrapper.setProps({ title });
    wrapper.update();

    const result = wrapper.find('#button').first().text();

    expect(result).toBe(title);
  });

  it('O componente deve executar a função quando for clicado', () => {
    const onPress = jest.fn();

    wrapper.setProps({ onPress });
    wrapper.update();

    wrapper.find('#button').first().props().onPress();

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
