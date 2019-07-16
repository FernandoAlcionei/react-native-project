import * as types from '../actionTypes';
import * as loginAction from '../actions';
import { loginReducer } from '../reducers';

const msgDeErro = 'Ocorreu um erro inesperado.';

const user = {
  usuario: 'admin',
  senha: 'admin1',
};

describe('Teste das actions Login', () => {
  it('Deve executar a action de login', () => {
    const expectedAction = {
      type: types.LOGIN,
      payload: user,
    };

    expect(loginAction.login(user)).toEqual(expectedAction);
  });

  it('Deve executar a action login realizado com sucesso', () => {
    const expectedState = { isFormInvalid: false };
    expect(loginReducer([], loginAction.loginSuccess())).toEqual(expectedState);
  });

  it('Deve executar a action de erro ao realizar o login', () => {
    const expectedState = {
      msgDeErro,
      isFormInvalid: true,
    };

    expect(loginReducer([], loginAction.loginError(msgDeErro))).toEqual(expectedState);
  });

  it('Deve executar a action de logout', () => {
    const expectedAction = { type: types.LOGOUT };
    expect(loginAction.logout()).toEqual(expectedAction);
  });
});
