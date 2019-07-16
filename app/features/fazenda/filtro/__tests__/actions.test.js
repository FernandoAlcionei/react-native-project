import * as types from '../actionTypes';
import * as filtroAction from '../actions';
import { filtroDeFazendaReducer } from '../reducers';

const filtroDeFazenda = {
  pagina: 0,
  busca: null,
  tipoDeOrdenacao: -1,
  campoDeOrdenacao: 'vistoria',
  area: null,
};

const initialState = {
  filtro: { ...filtroDeFazenda },
  labelsFiltro: [],
  areas: [],
  msgDeErro: null,
};

describe('Teste das actions da feature Filtro de Fazenda', () => {
  it('Deve executar a action adicionar pagina', () => {
    const state = filtroDeFazendaReducer(initialState, filtroAction.adicionarPagina(1));
    expect(state.filtro.pagina).toEqual(1);
  });

  it('Deve executar a action adicionar filtro', () => {
    const filtro = { pagina: 1, area: 'suinocultura' };
    const labelsFiltro = [{ nome: 'suinocultura', tipoDeFiltro: 'area' }];

    const state = filtroDeFazendaReducer(initialState, filtroAction.adicionarFiltro(filtro, labelsFiltro));
    expect(state.filtro).toEqual(filtro);
    expect(state.labelsFiltro).toEqual(labelsFiltro);
  });

  it('Deve executar a action filtrar fazenda', () => {
    const filtro = { pagina: 1, area: 'suinocultura' };
    const labelsFiltro = [{ nome: 'suinocultura', tipoDeFiltro: 'area' }];

    const expectedAction = {
      type: types.FILTRAR_FAZENDA,
      payload: { filtro, labelsFiltro },
    };

    expect(filtroAction.filtrarFazenda(filtro, labelsFiltro)).toEqual(expectedAction);
  });

  it('Deve executar a action limpar filtro', () => {
    const state = filtroDeFazendaReducer(initialState, filtroAction.limparFiltro());
    expect(state.filtro).toEqual(filtroDeFazenda);
  });

  it('Deve executar a action reiniciar filtro', () => {
    const state = filtroDeFazendaReducer(initialState, filtroAction.reiniciarFiltro());
    expect(state.filtro).toEqual(filtroDeFazenda);
    expect(state.areas).toEqual([]);
  });

  it('Deve executar a action listar areas', () => {
    const expectedAction = { type: types.LISTAR_AREAS };
    expect(filtroAction.listarAreas()).toEqual(expectedAction);
  });

  it('Deve executar a action adicionar areas', () => {
    const areas = [
      {
        id: 'id-01',
        cor: '#000000',
        rotulo: 'suinocultura',
      },
    ];

    const state = filtroDeFazendaReducer(initialState, filtroAction.adicionarAreas(areas));
    expect(state.areas).toEqual(areas);
  });

  it('Deve executar a action mensagem de erro', () => {
    const msg = 'Ocorreu um erro';

    const state = filtroDeFazendaReducer(initialState, filtroAction.msgDeErro(msg));
    expect(state.msgDeErro).toEqual(msg);
  });

  it('Deve executar a action remover filtro', () => {
    const labelFiltro = { id: 'suinocultura', tipoDeFiltro: 'area' };

    const mockState = initialState;
    mockState.filtro.pagina = 1;
    mockState.filtro.area = 'suinocultura';
    mockState.labelsFiltro = [labelFiltro];

    const state = filtroDeFazendaReducer(mockState, filtroAction.removerFiltro(labelFiltro));
    expect(state.filtro.pagina).toEqual(0);
    expect(state.filtro.area).toBeNull();
    expect(state.labelsFiltro.length).toEqual(0);
  });
});
