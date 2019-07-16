import * as loginReducer from '../features/login/reducers';
import * as fazendasReducer from '../features/fazenda/lista/reducers';
import * as filtroDeFazendaReducer from '../features/fazenda/filtro/reducers';

export default Object.assign({}, loginReducer, fazendasReducer, filtroDeFazendaReducer);
