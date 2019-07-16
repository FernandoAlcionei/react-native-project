import { takeLatest } from 'redux-saga/effects';
import * as types from '../actionTypes';
import { listarFazendas } from './fazendasSaga';
import Api from '../../../../api';

const api = Api.create();

export const fazendasSaga = [takeLatest(types.LISTAR_FAZENDAS, listarFazendas, api)];
