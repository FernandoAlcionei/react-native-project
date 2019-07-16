import React from 'react';
import { mount } from 'enzyme';
import Radio from '../index';
import AppStyles from '../../../../../../config/styles';

const { color: { COLOR_PRIMARY } } = AppStyles;

const props = {
  onPress: () => {},
  item: {
    id: 'item-1',
    icone: 'check',
    value: 'item-1',
  },
  itemSelecionado: '',
};

const getWrapper = () => {
  jest.useFakeTimers();
  return mount(<Radio {...props} />);
};

describe('Teste do componente Radio', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('O componente deve montar e renderizar corretamente', () => {
    expect(wrapper).not.toBeNull();
    expect(wrapper.exists('#item-1')).toEqual(true);
  });

  it('Deve executar a prop "onPress" quando for clicado', () => {
    const onPress = jest.fn();

    wrapper.setProps({ onPress });
    wrapper.update();

    wrapper.find('#item-1').first().props().onPress();

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('Deve alterar o estilo do componente quando estiver selecionado', () => {
    const itemSelecionado = 'item-1';

    wrapper.setProps({ itemSelecionado });
    wrapper.update();

    expect(wrapper.find(`#radio-${props.item.id}`).first().props().style.borderColor).toEqual(COLOR_PRIMARY);
  });
});
