import { put, call } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import * as filtroActions from '../actions';
import * as fazendasActions from '../../lista/actions';
import { erro } from '../../../../config/messages';

const { servicoIndisponivel } = erro;

export function* filtrarFazenda({ payload }) {
  const { filtro, labelsFiltro } = payload;

  yield put(filtroActions.adicionarFiltro(filtro, labelsFiltro));
  yield put(fazendasActions.listarFazendas(filtro));

  yield call(Actions.pop);
}

export function* listarAreas(api) {
  const response = yield call(api.getAreas);

  if (!response || !response.ok) {
    yield put(filtroActions.msgDeErro(servicoIndisponivel));
  } else if (response.ok && response.data) {
    yield put(filtroActions.adicionarAreas(response.data.areas));
  }
}
