import { Actions } from 'react-native-router-flux';
import { put, call } from 'redux-saga/effects';
import { filtrarFazenda, listarAreas } from '../sagas/filtroSaga';
import * as filtroAction from '../actions';
import * as fazendasAction from '../../lista/actions';

const msgServicoIndisponivel = 'Serviço temporariamente indisponível.';

const filtroDeFazenda = { pagina: 1 };
const labelsFiltro = [{ tipoDeFiltro: 'area' }];

const api = { getAreas: jest.fn() };

const getFiltrarFazendaSaga = () => {
  const data = { payload: { filtro: filtroDeFazenda, labelsFiltro } };
  return filtrarFazenda(data);
};

const getListarAreasSaga = () => listarAreas(api);

const putAdicionarFiltro = (filtro, labels) => put(filtroAction.adicionarFiltro(filtro, labels));
const putListarFazendas = (filtro, labels) => put(fazendasAction.listarFazendas(filtro, labels));
const putMsgDeErro = msg => put(filtroAction.msgDeErro(msg));
const putAdicionarAreas = areas => put(filtroAction.adicionarAreas(areas));

const callActionPop = () => call(Actions.pop);

describe('Teste das sagas da feature Filtro de Fazenda', () => {
  describe('Teste da saga "filtrarFazenda"', () => {
    let filtrarFazendaSaga;

    beforeEach(() => {
      filtrarFazendaSaga = getFiltrarFazendaSaga();
    });

    it('Deve executar a saga "filtrarFazenda" corretamente', () => {
      expect(filtrarFazendaSaga.next().value).toEqual(putAdicionarFiltro(filtroDeFazenda, labelsFiltro));
      expect(filtrarFazendaSaga.next(filtroDeFazenda).value).toEqual(putListarFazendas(filtroDeFazenda));
      expect(filtrarFazendaSaga.next().value).toEqual(callActionPop());
    });
  });

  describe('Teste da saga "listarAreas"', () => {
    let listarAreasSaga;

    beforeEach(() => {
      listarAreasSaga = getListarAreasSaga();
    });

    it('Deve executar a action mensagem de erro quando o serviço não retornar os dados corretamente', () => {
      listarAreasSaga.next();
      expect(listarAreasSaga.next().value).toEqual(putMsgDeErro(msgServicoIndisponivel));
    });

    it('deve executar a saga "listarAreas" com sucesso', () => {
      const areas = { id: 'id-1' };
      const response = {
        ok: true,
        data: { areas },
      };

      listarAreasSaga.next();
      expect(listarAreasSaga.next(response).value).toEqual(putAdicionarAreas(areas));
    });
  });
});
