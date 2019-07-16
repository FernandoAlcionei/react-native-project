import { put, call } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import { login, logout } from '../sagas/loginSaga';
import * as loginAction from '../actions';
import * as fazendasActions from '../../fazenda/lista/actions';

const msgServicoIndisponivel = 'Serviço temporariamente indisponível.';
const msgLoginInvalido = 'Usuário ou senha informados estão incorretos.';

const user = {
  usuario: 'admin',
  senha: 'admin1',
};

const { usuario, senha } = user;

const response = { ok: true };

const api = { login: jest.fn() };

const getLoginSaga = () => {
  const data = {
    payload: {
      usuario,
      senha,
    },
  };

  return login(api, data);
};

const getLogoutSaga = () => logout();

const callActionReplace = route => call(Actions.replace, route);

const putLoginSuccess = () => put(loginAction.loginSuccess());
const putLoginError = msgDeErro => put(loginAction.loginError(msgDeErro));
const putRemoverFazendas = () => put(fazendasActions.removerFazendas());

describe('Teste das sagas da feature Login', () => {
  describe('Saga login', () => {
    let loginSaga;

    beforeEach(() => {
      loginSaga = getLoginSaga();
    });

    describe('Teste dos cenários de erro da saga login', () => {
      response.ok = null;

      it('Deve apresentar a mensagem de erro informando que o usuário ou a senha estão inválidos quando o serviço retornar o status "401"', () => {
        response.status = 401;

        loginSaga.next();

        expect(loginSaga.next(response).value).toEqual(putLoginError(msgLoginInvalido));
      });

      it('Deve apresentar a mensagem de serviço indisponível quando o serviço retornar um status diferente de "401"', () => {
        response.status = 404;

        loginSaga.next();

        expect(loginSaga.next(response).value).toEqual(putLoginError(msgServicoIndisponivel));
      });
    });

    describe('Teste do cenário de sucesso da saga login', () => {
      it('deve executar a saga login e retornar a call de sucesso', () => {
        const route = 'onboarding';
        response.ok = true;

        loginSaga.next();

        expect(loginSaga.next(response).value).toEqual(putLoginSuccess());
        expect(loginSaga.next().value).toEqual(callActionReplace(route));
      });
    });
  });

  describe('Saga logout', () => {
    let logoutSaga;

    beforeEach(() => {
      logoutSaga = getLogoutSaga();
    });

    describe('Teste do cenário de sucesso da saga logout', () => {
      it('deve executar a saga logout e redirecionar o usuário para a tela de login', () => {
        expect(logoutSaga.next().value).toEqual(putRemoverFazendas());
        expect(logoutSaga.next().value).toEqual(callActionReplace('login'));
      });
    });
  });
});
