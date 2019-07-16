import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { mount } from 'enzyme';
import NavBar from '../index';

const leftButtonIcon = {
  icon: 'busca',
  widthIcon: 21,
  heightIcon: 21,
  onPress: () => {},
  id: 'left-button-icon',
};

const rightButtonIcon = {
  ...leftButtonIcon,
  id: 'right-button-icon',
};

const rightButtonText = {
  title: 'Botão',
  id: 'right-button-text',
};

const props = {
  titulo: '',
  rightButtonIcon: null,
  leftButtonIcon: null,
  rightButtonText: null,
};

const getWrapper = () => {
  jest.useFakeTimers();
  return mount(<NavBar {...props} />);
};

describe('Teste do componente NavBar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('O componente deve montar e renderizar corretamente', () => {
    expect(wrapper).not.toBeNull();
    expect(wrapper.find('View').exists()).toBe(true);
  });

  it('Deve exibir o titulo quando for informado', () => {
    props.titulo = 'Titulo!';
    wrapper = getWrapper();
    expect(wrapper.find('#titulo').first().text()).toBe('Titulo!');
  });

  describe('Teste do botão "leftButtonIcon"', () => {
    it('Deve ocultar o botão quando a prop "leftButtonIcon" não for atribuido nas propriedades', () => {
      props.leftButtonIcon = null;
      expect(wrapper.find('#left-button-icon').exists()).toBe(false);
    });

    it('Deve exibir o botão quando a prop "leftButtonIcon" for atribuido nas propriedades', () => {
      props.leftButtonIcon = leftButtonIcon;
      wrapper = getWrapper();

      expect(wrapper.find('#left-button-icon').exists()).toBe(true);
    });

    it('Deve executar a função do "leftButtonIcon" quando o botão for clicado', () => {
      const onPress = jest.fn();
      props.leftButtonIcon = { ...leftButtonIcon, onPress };

      wrapper = getWrapper();
      wrapper.find('#left-button-icon').first().props().onPress();

      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('Teste do botão "rightButtonIcon"', () => {
    it('Deve ocultar o botão quando a prop "rightButtonIcon" não for atribuido nas propriedades', () => {
      props.rightButtonIcon = null;
      expect(wrapper.find('#right-button-icon').exists()).toBe(false);
    });

    it('Deve exibir o botão quando a prop "rightButtonIcon" for atribuido nas propriedades', () => {
      props.rightButtonIcon = rightButtonIcon;
      wrapper = getWrapper();

      expect(wrapper.find('#right-button-icon').exists()).toBe(true);
    });

    it('Deve executar a função do "rightButtonIcon" quando o botão for clicado', () => {
      const onPress = jest.fn();
      props.rightButtonIcon = { ...rightButtonIcon, onPress };

      wrapper = getWrapper();
      wrapper.find('#right-button-icon').first().props().onPress();

      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('Teste dos estilos do componente NavBar', () => {
    it('Deve ajustar a altura do NavBar quando o dispositivo for ios', () => {
      Platform.OS = 'ios';
      StatusBar.currentHeight = null;
      wrapper = getWrapper();

      expect(wrapper.find('#navbar-container').first().props().style[1].height).toBe(44);
      expect(wrapper.find('#navbar-container').first().props().style[1].paddingTop).toBe(0);
    });

    it('Deve ajustar a altura do NavBar quando o dispositivo for android', () => {
      Platform.OS = 'android';
      StatusBar.currentHeight = 40;
      wrapper = getWrapper();

      expect(wrapper.find('#navbar-container').first().props().style[1].height).toBe(98);
      expect(wrapper.find('#navbar-container').first().props().style[1].paddingTop).toBe(44);
    });
  });

  describe('Teste do botão "rightButtonText"', () => {
    it('Deve ocultar o botão quando a prop "rightButtonText" não for atribuido nas propriedades', () => {
      props.rightButtonText = null;
      expect(wrapper.find('#right-button-text').exists()).toBe(false);
    });

    it('Deve exibir o botão quando a prop "rightButtonText" for atribuido nas propriedades', () => {
      props.rightButtonText = rightButtonText;
      wrapper = getWrapper();

      expect(wrapper.find('#right-button-text').exists()).toBe(true);
      expect(wrapper.find('#right-button-text TextView').text()).toEqual('Botão');
    });

    it('Deve executar a função do "rightButtonText" quando o botão for clicado', () => {
      const onPress = jest.fn();
      props.rightButtonText = { ...rightButtonText, onPress };

      wrapper = getWrapper();
      wrapper.find('#right-button-text').first().props().onPress();

      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });
});
