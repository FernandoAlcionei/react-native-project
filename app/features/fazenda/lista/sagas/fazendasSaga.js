import { put, call } from 'redux-saga/effects';
import * as fazendasActions from '../actions';
import { erro } from '../../../../config/messages';
import * as filtroActions from '../../filtro/actions';

const { servicoIndisponivel } = erro;

export function* listarFazendas(api, { payload }) {
  const { filtro, loadingFooter, loadingOnRefresh } = payload;

  if (loadingFooter) {
    yield put(fazendasActions.loadingFooter());
  } else if (loadingOnRefresh) {
    yield put(fazendasActions.loadingOnRefresh());
  } else {
    yield put(fazendasActions.loadingFazendas());
  }

  const response = yield call(api.getFazendas, filtro);

  if (!response || !response.ok) {
    yield put(fazendasActions.msgDeErro(servicoIndisponivel));
  } else if (response.ok && response.data) {
    yield put(filtroActions.adicionarPagina(response.data.paginaAtual));
    yield put(fazendasActions.adicionarFazendas(response.data));
  }
}
