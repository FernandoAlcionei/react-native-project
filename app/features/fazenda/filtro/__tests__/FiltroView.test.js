import React from 'react';
import { mount } from 'enzyme';
import FiltroView from '../containers/FiltroView';
import { mockScrollView } from '../../../../__mocks__/components';

const area = {
  id: 'id-01',
  rotulo: 'suinocultura',
  cor: '#000000',
};

const props = {
  filtrarFazenda: () => {},
  listarAreas: () => {},
  msgDeErro: () => {},
  filtroReducer: { filtro: {}, areas: [area], msgDeErro: null },
};

const getWrapper = () => {
  jest.useFakeTimers();
  return mount(<FiltroView {...props} />);
};

describe('Teste da feature FiltroView', () => {
  let wrapper;

  mockScrollView();

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('O componente deve montar e renderizar corretamente', () => {
    expect(wrapper).not.toBeNull();
    expect(wrapper.exists('View')).toEqual(true);
  });

  describe('Teste do filtro tipo de ordenação', () => {
    const tipoDeOrdenacao = { value: 1 };

    it('Deve selecionar o tipo de ordenação quando for clicado no botão', () => {
      wrapper.find('#crescente').first().props().onPress(tipoDeOrdenacao);
      expect(wrapper.instance().state.filtro.tipoDeOrdenacao).toEqual(tipoDeOrdenacao.value);
    });
  });

  describe('Teste do filtro', () => {
    it('Deve executar o botão "filtrar" quando for clicado', () => {
      const filtrarFazenda = jest.fn();

      wrapper.setProps({ filtrarFazenda });
      wrapper.update();

      wrapper.find('#btn-filtrar').first().props().onPress();

      expect(filtrarFazenda).toHaveBeenCalledTimes(1);
    });

    it('Deve adicionar as propriedades do reducer no state do componente quando o componente inicializar.', () => {
      const mockFiltro = { tipoDeOrdenacao: 'crescente' };

      props.filtroReducer = { ...props.filtroReducer, filtro: mockFiltro };

      wrapper = getWrapper();

      expect(wrapper.instance().state.filtro).toEqual({ ...mockFiltro, pagina: 0 });
    });

    it('Deve validar os filtros aplicados', () => {
      let filtro;
      let labelsFiltro;

      props.filtroReducer.filtro.area = area.id;

      const filtrarFazenda = (filtroDeFazenda, labels) => {
        filtro = filtroDeFazenda;
        labelsFiltro = labels;
      };

      wrapper.setProps({ filtrarFazenda });
      wrapper.update();
      wrapper.find('#btn-filtrar').first().props().onPress();

      expect(filtro.area).toEqual(area.id);
      expect(labelsFiltro[0].tipoDeFiltro).toEqual('area');
    });
  });

  describe('Teste do filtro de areas', () => {
    const index = 0;

    it('Deve selecionar a area quando for clicado no botão', () => {
      props.filtroReducer.filtro.area = null;

      wrapper = getWrapper();
      wrapper.find(`#${area.id}`).first().props().onPress(index);

      expect(wrapper.instance().state.filtro.area).toEqual(area.id);
    });

    it('Deve desmarcar a area quando for clicado no botão e a area estiver selecionada', () => {
      wrapper.instance().state.filtro.area = area.id;

      wrapper.find(`#${area.id}`).first().props().onPress(index);
      expect(wrapper.instance().state.filtro.area).toBeNull();
    });

    it('Deve ocultar o componente de areas quando não tiver areas.', () => {
      props.filtroReducer.areas = [];
      wrapper = getWrapper();
      expect(wrapper.find('#areas').exists()).toBe(false);
    });
  });

  describe('Teste do componente de Toast', () => {
    it('Deve ocultar o "Toast" quando não tiver mensagem de erro', () => {
      props.filtroReducer.msgDeErro = null;
      wrapper = getWrapper();
      expect(wrapper.exists('Toast')).toEqual(false);
    });

    it('Deve exibir o "Toast" quando tiver mensagem de erro', () => {
      props.filtroReducer.msgDeErro = 'Mensagem.';
      wrapper = getWrapper();
      expect(wrapper.exists('Toast')).toEqual(true);
    });

    it('Deve fechar o "Toast" e executar a action para remover a mensagem de erro quando for clicado no botão fechar', () => {
      props.msgDeErro = jest.fn();

      wrapper = getWrapper();
      wrapper.find('Toast').props().fechar();

      expect(props.msgDeErro).toHaveBeenCalledTimes(1);
    });
  });
});
