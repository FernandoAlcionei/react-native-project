import * as types from '../actionTypes';
import * as fazendasAction from '../actions';
import { fazendasReducer } from '../reducers';

const initialState = {
  fazendas: [],
  totalDePaginas: null,
  loadingFazendas: false,
  loadingFooter: false,
  loadingOnRefresh: false,
  paginaAtual: 0,
  msgDeErro: null,
  historicoDeBuscas: [],
};

const listaDeFazendas = {
  fazendas: [{ id: 'id-1' }],
  totalDePaginas: 5,
};

describe('Teste das actions da feature Fazendas', () => {
  it('Deve executar a action listar fazendas', () => {
    const expectedAction = {
      type: types.LISTAR_FAZENDAS,
      payload: {
        filtro: {},
        loadingFooter: true,
      },
    };

    expect(fazendasAction.listarFazendas({}, true)).toEqual(expectedAction);
  });

  describe('Testes da action adicionar fazenda', () => {
    it('Deve adicionar as fazendas no reducer', () => {
      const state = fazendasReducer(initialState, fazendasAction.adicionarFazendas(listaDeFazendas));
      expect(state.fazendas.length).toEqual(1);
    });

    it('Deve executar a action adicionar fazendas, quando a paginaAtual for maior que zero, então deve adicionar as fazendas no fim da lista atual', () => {
      initialState.fazendas.push(listaDeFazendas.fazendas);

      const fazendas = {
        fazendas: [{ id: 'id-2' }],
        paginaAtual: 1,
        totalDePaginas: 5,
      };

      const state = fazendasReducer(initialState, fazendasAction.adicionarFazendas(fazendas));
      expect(state.fazendas.length).toEqual(2);
    });

    it('Deve adicionar filtro de fazendas', () => {
      const filtro = {
        busca: { text: 'Eliana' },
        labels: [],
        area: [],
      };

      const reducer = fazendasReducer(initialState, fazendasAction.adicionarFiltroDeFazendas(filtro));

      expect(reducer.historicoDeBuscas.length).toBe(1);
      expect(reducer.historicoDeBuscas[0]).toBe(filtro.busca);
      expect(reducer.filtroDeFazendas.labels.length).toBe(1);
      expect(reducer.filtroDeFazendas.labels[0].text).toBe(filtro.busca.text);
    });

    it('Deve adicionar apenas uma vez o mesmo filtro', () => {
      const filtro = {
        busca: { text: 'Eliana' },
        labels: ['Eliana'],
        area: [],
      };

      const reducer = fazendasReducer(initialState, fazendasAction.adicionarFiltroDeFazendas(filtro));

      expect(reducer.filtroDeFazendas.labels.length).toBe(1);
      expect(reducer.filtroDeFazendas.labels[0]).toBe(filtro.busca.text);
    });
  });

  it('Deve executar a action loading fazendas', () => {
    const expectedState = { loadingFazendas: true };
    expect(fazendasReducer([], fazendasAction.loadingFazendas())).toEqual(expectedState);
  });

  it('Deve executar a action loading footer', () => {
    const expectedState = { loadingFooter: true };
    expect(fazendasReducer([], fazendasAction.loadingFooter())).toEqual(expectedState);
  });

  it('Deve executar a action loading onRefresh', () => {
    const expectedState = { loadingOnRefresh: true };
    expect(fazendasReducer([], fazendasAction.loadingOnRefresh())).toEqual(expectedState);
  });

  it('Deve executar a action mensagem de erro', () => {
    const msgDeErro = 'Erro!';

    const expectedState = {
      msgDeErro,
      loadingFazendas: false,
      loadingFooter: false,
      loadingOnRefresh: false,
    };

    expect(fazendasReducer([], fazendasAction.msgDeErro(msgDeErro))).toEqual(expectedState);
  });

  it('Deve remover a mensagem de erro', () => {
    const expectedState = { msgDeErro: null };
    expect(fazendasReducer([], fazendasAction.removerMsgDeErro())).toEqual(expectedState);
  });

  it('Deve remover as fazendas e reiniciar o estado do reducer', () => {
    const expectedState = {
      fazendas: [],
      totalDePaginas: null,
      loadingFazendas: false,
      loadingFooter: false,
      loadingOnRefresh: false,
      msgDeErro: null,
      filtroDeFazendas: {
        labels: [],
        areas: [],
      },
      historicoDeBuscas: [],
    };

    expect(fazendasReducer([], fazendasAction.removerFazendas())).toEqual(expectedState);
  });

  it('Deve limpar o histórico de buscas', () => {
    const expectedState = {
      ...initialState,
      historicoDeBuscas: [],
    };

    expect(fazendasReducer(initialState, fazendasAction.limparHistoricoDeBuscas())).toEqual(expectedState);
  });
});
