import * as types from './actionTypes';

export function listarFazendas(filtro, loadingFooter, loadingOnRefresh) {
  return {
    type: types.LISTAR_FAZENDAS,
    payload: { filtro, loadingFooter, loadingOnRefresh },
  };
}

export function adicionarFazendas(fazendas) {
  return {
    type: types.ADICIONAR_FAZENDAS,
    payload: { ...fazendas },
  };
}

export function removerFazendas() {
  return { type: types.REMOVER_FAZENDAS };
}

export function adicionarFiltroDeFazendas(filtroDeFazendas) {
  return {
    type: types.ADICIONAR_FILTRO_DE_FAZENDAS,
    filtroDeFazendas,
  };
}

export function limparHistoricoDeBuscas() {
  return { type: types.LIMPAR_HISTORICO_DE_BUSCA };
}

export function loadingFazendas() {
  return { type: types.LOADING_FAZENDAS };
}

export function loadingFooter() {
  return { type: types.LOADING_FOOTER };
}

export function loadingOnRefresh() {
  return { type: types.LOADING_ON_REFRESH };
}

export function msgDeErro(msg) {
  return {
    type: types.MSG_DE_ERRO,
    payload: msg,
  };
}

export function removerMsgDeErro() {
  return { type: types.REMOVER_MSG_DE_ERRO };
}
