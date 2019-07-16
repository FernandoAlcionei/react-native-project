import React from 'react';
import { Text } from 'react-native';
import { mount } from 'enzyme';
import TextView from '../index';

const msgInformativa = 'React Native Project';

const getWrapper = () => {
  jest.useFakeTimers();

  return mount(
    <TextView>
      <Text id="msg-informativa">{msgInformativa}</Text>
    </TextView>,
  );
};

describe('Teste do componente TextView', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('O componente deve montar e renderizar corretamente', () => {
    expect(wrapper).not.toBeNull();
  });

  it('O componente deve exibir o a mensagem corretamente.', () => {
    const result = wrapper.find('#msg-informativa').first().props().children;
    expect(result).toEqual(msgInformativa);
  });
});
