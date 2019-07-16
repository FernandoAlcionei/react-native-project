import React from 'react';
import { mount } from 'enzyme';
import FlatListApp from '../index';

const props = {
  lista: [{ nome: 'React Native Project' }],
  onEndReached: () => {},
  renderRow: () => {},
  onRefresh: () => {},
  removerMsgDeErro: () => {},
  msgSemResultado: null,
  removerFiltro: () => {},
  labelsFiltro: [],
  totalDePaginas: 2,
  paginaAtual: 0,
  loadingView: false,
  msgDeErro: null,
  loadingOnRefresh: false,
  loadingFooter: false,
};

const getWrapper = () => {
  jest.useFakeTimers();
  return mount(<FlatListApp {...props} />);
};

describe('Teste do componente FlatListApp', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('Deve montar e renderizar o componente corretamente', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Deve executar o método "renderRow" para renderizar os componentes da lista', () => {
    const renderRow = jest.fn();

    wrapper.setProps({ renderRow });
    wrapper.update();

    wrapper.find('FlatList').first().instance().props.renderItem();

    expect(renderRow).toHaveBeenCalledTimes(2);
  });

  it('Deve exibir a mensagem informativa "Nenhum resultado encontrado." quando não tiver resultados', () => {
    const lista = [];
    const msgSemResultado = 'Nenhum resultado encontrado.';

    wrapper.setProps({ msgSemResultado, lista });
    wrapper.update();

    expect(wrapper.exists('#msg-sem-resultado')).toEqual(true);
    expect(wrapper.find('#msg-sem-resultado').text()).toEqual(msgSemResultado);
  });

  it('Deve atualizar a lista quando o onEndReached for executado', () => {
    const paginaAtual = 0;
    const totalDePaginas = 2;
    let proximaPagina;

    const onEndReached = (pagina) => {
      proximaPagina = pagina;
    };

    wrapper.setProps({ paginaAtual, totalDePaginas, onEndReached });
    wrapper.update();

    wrapper.find('#lista').first().instance().props.onEndReached();

    expect(proximaPagina).toBe(1);
  });

  it('Não deve atualizar a lista quando for a ultima pagina da paginação', () => {
    const onEndReached = jest.fn();
    const paginaAtual = 1;
    const totalDePaginas = 2;

    wrapper.setProps({ onEndReached, paginaAtual, totalDePaginas });
    wrapper.update();

    wrapper.find('#lista').first().instance().props.onEndReached();

    expect(onEndReached).toHaveBeenCalledTimes(0);
  });

  describe('Teste do loadingFooter', () => {
    it('Deve exibir o loading no fim da lista quando o atributo "loadingFooter" estiver "true"', () => {
      const loadingFooter = true;

      wrapper.setProps({ loadingFooter });
      wrapper.update();

      const wrapperFooter = mount(wrapper.find('#lista').first().instance().props.renderFooter());
      const wrapperListFooter = mount(wrapper.find('#lista').first().instance().props.ListFooterComponent());

      expect(wrapperFooter.find('#loading-footer').exists()).toBe(true);
      expect(wrapperListFooter.find('#loading-footer').exists()).toBe(true);
    });

    it('Deve ocultar o loading no fim da lista quando o atributo "loadingFooter" estiver "false"', () => {
      const loadingFooter = false;

      wrapper.setProps({ loadingFooter });
      wrapper.update();

      expect(wrapper.find('#lista').first().instance().props.renderFooter()).toBe(false);
      expect(wrapper.find('#lista').first().instance().props.ListFooterComponent()).toBe(false);
    });
  });

  describe('Teste do componente "Toast"', () => {
    it('Deve exibir o toast quando tiver alguma mensagem de erro', () => {
      const msgDeErro = 'Mensagem';

      wrapper.setProps({ msgDeErro });
      wrapper.update();

      expect(wrapper.find('Toast').exists()).toBe(true);
    });

    it('Deve ocultar o toast quando não tiver mensagem de erro', () => {
      const msgDeErro = null;

      wrapper.setProps({ msgDeErro });
      wrapper.update();

      expect(wrapper.find('Toast').exists()).toBe(false);
    });

    it('Deve executar o método "removerMsgDeErro" quando for clicado no botão fechar do toast', () => {
      const msgDeErro = 'Mensagem';
      const removerMsgDeErro = jest.fn();

      wrapper.setProps({ msgDeErro, removerMsgDeErro });
      wrapper.update();

      wrapper.find('Toast').first().props().fechar();
      expect(removerMsgDeErro).toHaveBeenCalledTimes(1);
    });
  });

  describe('Teste da remoção dos filtros de busca', () => {
    it('Deve executar o método "removerFiltro" quando for clicado no botão limpar na listagem de filtros', () => {
      const removerFiltro = jest.fn();

      wrapper.setProps({ removerFiltro });
      wrapper.update();

      wrapper.find('FilterBar').first().props().limpar();

      expect(removerFiltro).toHaveBeenCalledTimes(1);
    });

    it('Deve executar o método "removerFiltro" quando for clicado no botão remover na listagem de filtros', () => {
      const removerFiltro = jest.fn();

      wrapper.setProps({ removerFiltro });
      wrapper.update();

      wrapper.find('FilterBar').first().props().remover();

      expect(removerFiltro).toHaveBeenCalledTimes(1);
    });
  });

  describe('Teste do Loader', () => {
    it('Deve exibir o componente "Loader" quando o atributo "loadingView" estiver "true"', () => {
      const loadingView = true;

      wrapper.setProps({ loadingView });
      wrapper.update();

      expect(wrapper.find('Loader').first().instance().props.isVisible).toBe(true);
    });

    it('Deve ocultar o componente "Loader" quando o atributo "loadingView" estiver "false"', () => {
      const loadingView = false;

      wrapper.setProps({ loadingView });
      wrapper.update();

      expect(wrapper.find('Loader').first().instance().props.isVisible).toBe(false);
    });
  });
});
