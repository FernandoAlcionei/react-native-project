import { takeLatest } from 'redux-saga/effects';
import * as types from '../actionTypes';
import { filtrarFazenda, listarAreas } from './filtroSaga';
import Api from '../../../../api';

const api = Api.create();

export const filtroSagas = [
  takeLatest(types.FILTRAR_FAZENDA, filtrarFazenda),
  takeLatest(types.LISTAR_AREAS, listarAreas, api),
];
