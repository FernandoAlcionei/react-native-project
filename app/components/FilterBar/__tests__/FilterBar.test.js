import React from 'react';
import { mount } from 'enzyme';
import FilterBar from '../index';
import { mockScrollView } from '../../../__mocks__/components';

const filtro = {
  nome: 'nome-do-filtro',
  id: 'id-filtro',
};

const props = {
  filtros: [filtro],
  remover: () => {},
  limpar: () => {},
};

const getWrapper = () => {
  jest.useFakeTimers();
  return mount(<FilterBar {...props} />);
};

describe('Teste do componente FilterBar', () => {
  let wrapper;

  mockScrollView();

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('O componente deve montar e renderizar corretamente', () => {
    expect(wrapper).not.toBeNull();
    expect(wrapper.find('View').exists()).toBe(true);
  });

  it('Deve ocultar o componente quando não tiver filtros', () => {
    wrapper.setProps({ filtros: [] });
    wrapper.update();

    expect(wrapper.find('View').exists()).toBe(false);
  });

  it('Deve exibir os filtros corretamente', () => {
    expect(wrapper.find(`#filtro-${filtro.id}`).exists()).toBe(true);
  });

  it('Deve limpar o filtro quando for clicado no botão limpar', () => {
    const limpar = jest.fn();

    wrapper.setProps({ limpar });
    wrapper.update();

    wrapper.find('#btn-limpar').first().props().onPress();

    expect(limpar).toHaveBeenCalledTimes(1);
  });

  it('Deve remover o filtro quando for clicado no icone de remoção (X)', () => {
    const remover = jest.fn();

    wrapper.setProps({ remover });
    wrapper.update();

    const wrapperFiltro = wrapper.find(`#filtro-${filtro.id}`);
    wrapperFiltro.find('TouchableOpacity').first().props().onPress();

    expect(remover).toHaveBeenCalledTimes(1);
  });
});
