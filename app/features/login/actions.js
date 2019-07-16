import * as types from './actionTypes';

export function login(user) {
  return {
    type: types.LOGIN,
    payload: user,
  };
}

export function loginSuccess() {
  return { type: types.LOGIN_SUCCESS };
}

export function loginError(msgDeErro) {
  return {
    type: types.LOGIN_ERROR,
    payload: msgDeErro,
  };
}

export function logout() {
  return { type: types.LOGOUT };
}
