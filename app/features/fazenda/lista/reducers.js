import { createReducer } from 'reduxsauce';
import {
  ADICIONAR_FAZENDAS,
  LOADING_FAZENDAS,
  LOADING_FOOTER,
  MSG_DE_ERRO,
  REMOVER_MSG_DE_ERRO,
  REMOVER_FAZENDAS,
  ADICIONAR_FILTRO_DE_FAZENDAS,
  LIMPAR_HISTORICO_DE_BUSCA,
  LOADING_ON_REFRESH,
} from './actionTypes';

const STATE = {
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

const INITIAL_STATE = { ...STATE };

const adicionarFazendas = (state = INITIAL_STATE, action) => {
  const { fazendas, paginaAtual, totalDePaginas } = action.payload;

  let listaDeFazendas = fazendas;

  if (paginaAtual > 0) {
    listaDeFazendas = state.fazendas.concat(listaDeFazendas);
  }

  return ({ ...state, fazendas: listaDeFazendas, totalDePaginas, loadingFazendas: false, loadingFooter: false, loadingOnRefresh: false });
};

const removerFazendas = () => ({ ...STATE });

const adicionarFiltroDeFazendas = (state = INITIAL_STATE, action) => {
  const filtro = action.filtroDeFazendas;
  const { historicoDeBuscas } = state;

  const buscas = historicoDeBuscas.filter(busca => busca.texto === filtro.busca.texto);
  if (buscas.length === 0) {
    historicoDeBuscas.unshift(filtro.busca);
    filtro.labels.push(filtro.busca);
  }

  return ({ ...state, filtroDeFazendas: filtro, historicoDeBuscas });
};

const limparHistoricoDeBuscas = (state = INITIAL_STATE) => ({ ...state, historicoDeBuscas: [] });

const loadingFazendas = (state = INITIAL_STATE) => ({ ...state, loadingFazendas: true });

const loadingFooter = (state = INITIAL_STATE) => ({ ...state, loadingFooter: true });

const loadingOnRefresh = (state = INITIAL_STATE) => ({ ...state, loadingOnRefresh: true });

const msgDeErro = (state = INITIAL_STATE, action) => ({ ...state, msgDeErro: action.payload, loadingFazendas: false, loadingFooter: false, loadingOnRefresh: false });

const removerMsgDeErro = (state = INITIAL_STATE) => ({ ...state, msgDeErro: null });

export const fazendasReducer = createReducer(INITIAL_STATE, {
  [ADICIONAR_FAZENDAS]: adicionarFazendas,
  [REMOVER_FAZENDAS]: removerFazendas,
  [ADICIONAR_FILTRO_DE_FAZENDAS]: adicionarFiltroDeFazendas,
  [LIMPAR_HISTORICO_DE_BUSCA]: limparHistoricoDeBuscas,
  [LOADING_FAZENDAS]: loadingFazendas,
  [LOADING_FOOTER]: loadingFooter,
  [LOADING_ON_REFRESH]: loadingOnRefresh,
  [MSG_DE_ERRO]: msgDeErro,
  [REMOVER_MSG_DE_ERRO]: removerMsgDeErro,
});
