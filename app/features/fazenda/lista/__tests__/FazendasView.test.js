import React from 'react';
import { Actions } from 'react-native-router-flux';
import { mount, shallow } from 'enzyme';
import FazendasView from '../containers/FazendasView';
import { fazenda as mockFazenda } from '../../../../__mocks__/data';

const routeFazenda = 'fazenda';

const propsDefault = {
  listarFazendas: () => {},
  reiniciarFiltro: () => {},
  removerFiltro: () => {},
  msgDeErro: () => {},
  fazendasReducer: { fazendas: [mockFazenda], paginaAtual: 0, totalDePaginas: 2 },
  filtroReducer: { filtro: {}, labelsFiltro: [] },
};

const getWrapper = (props = propsDefault) => {
  jest.useFakeTimers();
  return mount(<FazendasView {...props} />);
};

describe('Teste da feature FazendasView', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('Deve montar e renderizar o componente corretamente', () => {
    expect(wrapper).not.toBeNull();
    expect(wrapper.exists('FlatListApp')).toBe(true);
  });

  it('Deve executar as actions "reiniciarFiltro" e "listarFazendas" quando o componente for renderizado', async () => {
    const props = { ...propsDefault, listarFazendas: jest.fn(), reiniciarFiltro: jest.fn() };

    wrapper = await getWrapper(props);

    expect(props.listarFazendas).toHaveBeenCalledTimes(1);
    expect(props.reiniciarFiltro).toHaveBeenCalledTimes(1);
  });

  it('Deve carregar a lista de fazendas, quando o componente for renderizado', async () => {
    const filtroExpected = { pagina: 0 };
    let filtro;
    let loaders = {};

    const listarFazendas = (filtroDeBusca, loadingFooter, loadingOnRefresh) => {
      filtro = filtroDeBusca;
      loaders = { loadingFooter, loadingOnRefresh };
    };

    const props = { ...propsDefault, listarFazendas };

    wrapper = await getWrapper(props);

    expect(filtro).toEqual(filtroExpected);
    expect(loaders.loadingFooter).toBe(false);
    expect(loaders.loadingOnRefresh).toBe(false);
  });

  it('Deve atualizar a lista de fazendas quando as props forem atualizadas', () => {
    const fazenda = { id: 'id-01', area: {} };
    const fazendasReducer = { fazendas: [fazenda] };

    wrapper.setProps({ fazendasReducer });
    wrapper.update();

    expect(wrapper.instance().props.fazendasReducer.fazendas[0]).toBe(fazenda);
  });

  describe('Teste do componente "FlatListApp", responsavel por listar as fazendas', () => {
    it('Deve exibir a mensagem informativa "Nenhuma fazenda encontrada" quando não tiver fazendas', () => {
      const msg = 'Nenhuma fazenda encontrada';
      const fazendasReducer = { ...propsDefault.fazendasReducer, fazendas: [] };

      wrapper.setProps({ fazendasReducer });
      wrapper.update();
      expect(wrapper.exists('#msg-sem-resultado')).toEqual(true);
      expect(wrapper.find('#msg-sem-resultado').text()).toEqual(msg);
    });

    it('Deve clicar no card de fazenda', () => {
      let route;
      let fazenda;

      Actions.push = (redirectTo, params) => {
        route = redirectTo;
        fazenda = params.fazenda;
      };

      const wrapperItem = shallow(wrapper.find('FlatListApp').first().instance().props.renderRow({ item: mockFazenda, index: 0 }));
      wrapperItem.find('#card').simulate('press');

      expect(route).toEqual(routeFazenda);
      expect(fazenda).toEqual(mockFazenda);
    });

    it('Deve atualizar a lista de fazendas quando o onRefresh for executado', () => {
      let loaders = {};
      const listarFazendas = (filtro, loadingFooter, loadingOnRefresh) => {
        loaders = { loadingFooter, loadingOnRefresh };
      };

      wrapper.setProps({ listarFazendas });
      wrapper.update();
      wrapper.find('FlatListApp').first().instance().props.onRefresh();

      expect(loaders.loadingFooter).toBeNull();
      expect(loaders.loadingOnRefresh).toBe(true);
    });

    it('Deve atualizar a lista de fazendas quando o onEndReached for executado', () => {
      const filtroReducer = { filtro: { pagina: 0 } };
      let paginaAtual;
      let loading;

      const listarFazendas = (pagina, loadingFooter) => {
        paginaAtual = pagina;
        loading = loadingFooter;
      };

      wrapper.setProps({ listarFazendas, filtroReducer });
      wrapper.update();
      wrapper.find('FlatListApp').first().instance().props.onEndReached();

      expect(paginaAtual).toEqual({ pagina: 1 });
      expect(loading).toBe(true);
    });

    it('Deve exibir o loading no fim da lista de fazendas quando o atributo "loadingFooter" estiver "true" no reducer', () => {
      const fazendasReducer = { ...propsDefault.fazendasReducer, loadingFooter: true };

      wrapper.setProps({ fazendasReducer });
      wrapper.update();

      expect(wrapper.find('FlatListApp').first().instance().props.loadingFooter).toBe(true);
    });

    it('Deve ocultar o loading no fim da lista de fazendas quando o atributo "loadingFooter" estiver "false"', () => {
      const fazendasReducer = { ...propsDefault.fazendasReducer, loadingFooter: false };

      wrapper.setProps({ fazendasReducer });
      wrapper.update();
      expect(wrapper.find('FlatListApp').first().instance().props.loadingFooter).toBe(false);
    });
  });

  describe('Teste do componente "Toast", responsavel por exibir mensagens', () => {
    it('Deve exibir o toast quando tiver alguma mensagem de erro', () => {
      const msgDeErro = 'Mensagem';
      const fazendasReducer = { ...propsDefault.fazendasReducer, msgDeErro };

      wrapper.setProps({ fazendasReducer });
      wrapper.update();
      expect(wrapper.find('FlatListApp').instance().props.msgDeErro).toEqual(msgDeErro);
    });

    it('Deve executar o método "removerMsgDeErro" para fechar o toast', () => {
      const removerMsgDeErro = jest.fn();

      wrapper.setProps({ removerMsgDeErro });
      wrapper.update();

      wrapper.find('FlatListApp').instance().props.removerMsgDeErro();
      expect(removerMsgDeErro).toHaveBeenCalledTimes(1);
    });
  });

  describe('Teste da remoção dos filtros de busca', () => {
    it('Deve executar as actions reiniciar filtro e listar fazendas quando o método "removerFiltroDeFazenda" for executado', async () => {
      const props = { ...propsDefault, listarFazendas: jest.fn(), reiniciarFiltro: jest.fn() };

      wrapper = await getWrapper(props);
      await wrapper.instance().removerFiltroDeFazenda();

      expect(props.listarFazendas).toHaveBeenCalledTimes(2);
      expect(props.reiniciarFiltro).toHaveBeenCalledTimes(2);
    });

    it('Deve executar a action remover filtro quando o método "removerFiltroDeFazenda" for executado e o filtro a ser removido for atribuido como parâmetro', async () => {
      const filtro = { tipoDeFiltro: 'area' };
      let removerFiltro;

      const props = {
        ...propsDefault,
        listarFazendas: jest.fn(),
        removerFiltro: (filtro) => {
          removerFiltro = filtro;
        },
      };

      wrapper = await getWrapper(props);
      await wrapper.instance().removerFiltroDeFazenda(filtro);

      expect(removerFiltro).toEqual(filtro);
      expect(props.listarFazendas).toHaveBeenCalledTimes(2);
    });
  });
});
