import { createReducer } from 'reduxsauce';
import { ADICIONAR_PAGINA, ADICIONAR_FILTRO, LIMPAR_FILTRO, REINICIAR_FILTRO, ADICIONAR_AREAS, MSG_DE_ERRO_FILTRO, REMOVER_FILTRO } from './actionTypes';

const filtroDeFazenda = {
  pagina: 0,
  busca: null,
  tipoDeOrdenacao: -1,
  campoDeOrdenacao: 'vistoria',
  area: null,
};

const INITIAL_STATE = {
  filtro: { ...filtroDeFazenda },
  labelsFiltro: [],
  areas: [],
  msgDeErro: null,
};

const adicionarPagina = (state = INITIAL_STATE, action) => {
  const { pagina } = action.payload;
  return ({ ...state, filtro: { ...state.filtro, pagina } });
};

const adicionarFiltro = (state = INITIAL_STATE, action) => {
  const { filtro, labelsFiltro } = action.payload;
  return ({ ...state, filtro, labelsFiltro });
};

const limparFiltro = (state = INITIAL_STATE) => ({ ...state, filtro: { ...filtroDeFazenda }, labelsFiltro: [] });

const reiniciarFiltro = (state = INITIAL_STATE) => ({ ...state, filtro: { ...filtroDeFazenda }, areas: [], labelsFiltro: [] });

const adicionarAreas = (state = INITIAL_STATE, action) => {
  const { areas } = action.payload;
  return ({ ...state, areas });
};

const msgDeErro = (state = INITIAL_STATE, action) => ({ ...state, msgDeErro: action.payload });

const removerFiltro = (state = INITIAL_STATE, action) => {
  const { filtroDeBusca: { tipoDeFiltro, id } } = action.payload;
  const { labelsFiltro, filtro } = state;

  filtro[tipoDeFiltro] = filtroDeFazenda[tipoDeFiltro];
  filtro.pagina = 0;

  const index = labelsFiltro.findIndex(label => label.id === id);
  labelsFiltro.splice(index, 1);

  return ({ ...state, filtro, labelsFiltro });
};

export const filtroDeFazendaReducer = createReducer(INITIAL_STATE, {
  [ADICIONAR_PAGINA]: adicionarPagina,
  [ADICIONAR_FILTRO]: adicionarFiltro,
  [LIMPAR_FILTRO]: limparFiltro,
  [ADICIONAR_AREAS]: adicionarAreas,
  [MSG_DE_ERRO_FILTRO]: msgDeErro,
  [REINICIAR_FILTRO]: reiniciarFiltro,
  [REMOVER_FILTRO]: removerFiltro,
});
