import { put } from 'redux-saga/effects';
import { listarFazendas } from '../sagas/fazendasSaga';
import * as fazendasAction from '../actions';
import * as filtroAction from '../../filtro/actions';

const msgServicoIndisponivel = 'Serviço temporariamente indisponível.';

const api = { getFazendas: jest.fn() };

const getListarFazendasSaga = (loadingFooter, loadingOnRefresh) => {
  const data = {
    payload: {
      pagina: 0,
      loadingFooter,
      loadingOnRefresh,
      filtro: {},
    },
  };

  return listarFazendas(api, data);
};

const putLoadingFazendas = () => put(fazendasAction.loadingFazendas());
const putLoadingFooter = () => put(fazendasAction.loadingFooter());
const putLoadingOnRefresh = () => put(fazendasAction.loadingOnRefresh());
const putMsgDeErro = msg => put(fazendasAction.msgDeErro(msg));
const putAdicionarFazendas = fazendas => put(fazendasAction.adicionarFazendas(fazendas));
const putAdicionarPagina = pagina => put(filtroAction.adicionarPagina(pagina));

describe('Teste das sagas da feature Fazendas', () => {
  describe('Saga listarFazendas', () => {
    let listarFazendasSaga;

    beforeEach(() => {
      listarFazendasSaga = getListarFazendasSaga();
    });

    describe('Teste dos cenários de erro da saga listarFazendas', () => {
      it('deve executar a action msgDeErro e enviar uma mensagem quando ocorrer um erro', () => {
        listarFazendasSaga.next();
        listarFazendasSaga.next();
        expect(listarFazendasSaga.next().value).toEqual(putMsgDeErro(msgServicoIndisponivel));
      });
    });

    describe('Teste dos cenários de sucesso da saga listarFazendas', () => {
      it('deve executar a saga listarFazendas e retornar a call de sucesso', () => {
        const response = { ok: true, data: { paginaAtual: 1 } };

        expect(listarFazendasSaga.next().value).toEqual(putLoadingFazendas());
        listarFazendasSaga.next();
        expect(listarFazendasSaga.next(response).value).toEqual(putAdicionarPagina(response.data.paginaAtual));
        expect(listarFazendasSaga.next(response).value).toEqual(putAdicionarFazendas(response.data));
      });

      it('deve executar a saga listarFazendas e executar a action de loading footer', () => {
        const loadingFooter = true;

        listarFazendasSaga = getListarFazendasSaga(loadingFooter);
        expect(listarFazendasSaga.next().value).toEqual(putLoadingFooter());
      });

      it('deve executar a saga listarFazendas e executar a action de loading onRefresh', () => {
        const loadingFooter = false;
        const loadingOnRefresh = true;

        listarFazendasSaga = getListarFazendasSaga(loadingFooter, loadingOnRefresh);
        expect(listarFazendasSaga.next().value).toEqual(putLoadingOnRefresh());
      });
    });
  });
});
