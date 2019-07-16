import * as types from './actionTypes';

export function adicionarPagina(pagina) {
  return {
    type: types.ADICIONAR_PAGINA,
    payload: { pagina },
  };
}

export function adicionarFiltro(filtro, labelsFiltro) {
  return {
    type: types.ADICIONAR_FILTRO,
    payload: { filtro, labelsFiltro },
  };
}

export function filtrarFazenda(filtro, labelsFiltro) {
  return {
    type: types.FILTRAR_FAZENDA,
    payload: { filtro, labelsFiltro },
  };
}

export function limparFiltro() {
  return { type: types.LIMPAR_FILTRO };
}

export function reiniciarFiltro() {
  return { type: types.REINICIAR_FILTRO };
}

export function listarAreas() {
  return { type: types.LISTAR_AREAS };
}

export function adicionarAreas(areas) {
  return {
    type: types.ADICIONAR_AREAS,
    payload: { areas },
  };
}

export function msgDeErro(msg) {
  return {
    type: types.MSG_DE_ERRO_FILTRO,
    payload: msg,
  };
}

export function removerFiltro(filtroDeBusca) {
  return {
    type: types.REMOVER_FILTRO,
    payload: { filtroDeBusca },
  };
}
