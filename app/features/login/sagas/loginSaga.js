import { call, put } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import * as loginActions from '../actions';

const msgLoginInvalido = 'Usuário ou senha informados estão incorretos.';

export function* login(api, { payload }) {
  const { username, password } = payload;

  if (!username.trim() || !password.trim()) {
    yield put(loginActions.loginError(msgLoginInvalido));
    return;
  }

  yield put(loginActions.loginSuccess());
  yield call(Actions.replace, 'onboarding');
}
