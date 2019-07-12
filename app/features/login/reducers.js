import { createReducer } from 'reduxsauce';
import * as types from './actionTypes';

const INITIAL_STATE = {
  msgDeErro: '',
  isFormInvalid: false,
};

const loginSuccess = (state = INITIAL_STATE) => ({
  ...state,
  isFormInvalid: false,
});

const loginError = (state = INITIAL_STATE, action) => ({
  ...state,
  msgDeErro: action.payload,
  isFormInvalid: true,
});

export const loginReducer = createReducer(INITIAL_STATE, {
  [types.LOGIN_SUCCESS]: loginSuccess,
  [types.LOGIN_ERROR]: loginError,
});
