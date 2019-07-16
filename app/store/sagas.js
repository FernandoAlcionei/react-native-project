import { all } from 'redux-saga/effects';
import { loginSagas } from '../features/login/sagas';
import { fazendasSaga } from '../features/fazenda/lista/sagas';
import { filtroSagas } from '../features/fazenda/filtro/sagas';

export default function* rootSaga() {
  yield all([...loginSagas, ...fazendasSaga, ...filtroSagas]);
}
