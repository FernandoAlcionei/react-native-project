import { call, put } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import * as loginActions from '../actions';
import * as fazendasActions from '../../fazenda/lista/actions';
import { erro } from '../../../config/messages';

const { servicoIndisponivel, loginInvalido } = erro;

export function* login(api, { payload }) {
  const user = payload;
  const { usuario, senha } = user;

  const response = yield call(api.login, usuario, senha);

  if (response.ok) {
    yield put(loginActions.loginSuccess());
    yield call(Actions.replace, 'onboarding');
  } else if (response.status === 401) {
    yield put(loginActions.loginError(loginInvalido));
  } else {
    yield put(loginActions.loginError(servicoIndisponivel));
  }
}

export function* logout() {
  yield put(fazendasActions.removerFazendas());
  yield call(Actions.replace, 'login');
}
