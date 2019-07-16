import React from 'react';
import { Platform } from 'react-native';
import { mount } from 'enzyme';
import ButtonNavBar from '../index';

const props = {
  onPress: () => {},
  label: 'Limpar',
};

const getWrapper = () => {
  jest.useFakeTimers();
  return mount(<ButtonNavBar {...props} />);
};

describe('Teste do componente ButtonNavBar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('O componente deve montar e renderizar corretamente', () => {
    expect(wrapper).not.toBeNull();
    expect(wrapper.exists('TouchableOpacity')).toEqual(true);
  });

  it('Deve executar a prop "onPress" quando for clicado no componente', () => {
    const onPress = jest.fn();

    wrapper.setProps({ onPress });
    wrapper.update();
    wrapper.find('TouchableOpacity').first().props().onPress();

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('Deve alterar o espaçamento do componente quando o dispositivo for IOS', () => {
    expect(wrapper.find('TouchableOpacity').first().props().style.paddingRight).toEqual(10);
  });

  it('Deve alterar o espaçamento do componente quando o dispositivo for android', () => {
    Platform.OS = 'android';
    wrapper = getWrapper();

    expect(wrapper.find('TouchableOpacity').first().props().style.paddingRight).toEqual(15);
  });
});
