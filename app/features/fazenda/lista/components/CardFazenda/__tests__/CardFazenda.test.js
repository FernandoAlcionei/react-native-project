import React from 'react';
import { mount } from 'enzyme';
import CardFazenda from '../index';
import { fazenda } from '../../../../../../__mocks__/data';
import AppStyles from '../../../../../../config/styles';

const { color: { COLOR_BLACK } } = AppStyles;

const props = {
  fazenda,
  index: 0,
};

const getWrapper = () => {
  jest.useFakeTimers();
  return mount(<CardFazenda {...props} />);
};

describe('Teste do componente CardFazenda', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('O componente deve montar e renderizar corretamente', () => {
    expect(wrapper).not.toBeNull();
  });

  it('O componente deve exibir a cor da área da fazenda', () => {
    expect(wrapper.find(`#area-${fazenda.area.id}`).exists()).toBe(true);
    expect(wrapper.find(`#area-${fazenda.area.id}`).first().props().style[0].backgroundColor).toEqual(COLOR_BLACK);
  });

  it('Deve executar a prop "onCardClick" quando o card for clicado', () => {
    const onCardClick = jest.fn();

    wrapper.setProps({ onCardClick });
    wrapper.update();

    wrapper.find('#card').first().props().onPress();

    expect(onCardClick).toHaveBeenCalledTimes(1);
  });
});
