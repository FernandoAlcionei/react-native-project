import { takeLatest } from 'redux-saga/effects';
import * as types from '../actionTypes';
import { login } from './loginSaga';
import Api from '../../../api';

const api = Api.create();

export const loginSagas = [takeLatest(types.LOGIN, login, api)];
