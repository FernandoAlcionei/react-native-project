import React from 'react';
import { View } from 'react-native';
import { mount } from 'enzyme';
import CustomCheckbox from '../index';
import AppStyles from '../../../config/styles';

const { color: { COLOR_PRIMARY } } = AppStyles;

const idItem = 'id-1';

const props = {
  id: idItem,
  value: 'item-1',
  index: 0,
  label: 'area',
  onPress: () => {},
  icon: 'area',
};

const getWrapper = () => {
  jest.useFakeTimers();
  return mount(<CustomCheckbox {...props} />);
};

describe('Teste do componente CustomCheckbox', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('O componente deve montar e renderizar corretamente', () => {
    expect(wrapper).not.toBeNull();
    expect(wrapper.exists(`#${idItem}`)).toEqual(true);
  });

  it('Deve executar a prop "onPress" quando for o componente for clicado', () => {
    const onPress = jest.fn();

    wrapper.setProps({ onPress });
    wrapper.update();

    wrapper.find(`#${idItem}`).first().props().onPress();

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('Deve alterar o estilo do componente quando estiver selecionado', () => {
    const itemSelecionado = 'item-1';

    wrapper.setProps({ itemSelecionado });
    wrapper.update();

    expect(wrapper.find('TouchableOpacity').first().props().style.backgroundColor).toEqual(COLOR_PRIMARY);
  });

  describe('Teste da exibição dos icones', () => {
    it('Deve exibir o icone correntamente', () => {
      expect(wrapper.exists(`#icon-${idItem}`)).toEqual(true);
    });

    it('Deve exibir o icone customizado quando o atributo renderIcon for informado', () => {
      wrapper.setProps({
        icon: null,
        renderIcon: () => <View id="icone-customizado" />,
      });
      wrapper.update();

      expect(wrapper.exists('#icone-customizado')).toEqual(true);
    });

    it('Deve ocultar o icone quando não for informado', () => {
      wrapper.setProps({ icon: null, renderIcon: null });
      wrapper.update();

      expect(wrapper.exists('#icon-checkbox')).toEqual(false);
    });
  });
});
