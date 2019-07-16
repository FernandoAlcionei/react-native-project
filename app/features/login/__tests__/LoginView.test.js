import React from 'react';
import { mount } from 'enzyme';
import LoginView from '../containers/LoginView';

const usuario = 'admin';
const senha = 'admin1';

const props = {
  login: () => {},
  msgDeErro: '',
  isFormInvalid: false,
};

const getWrapper = () => {
  jest.useFakeTimers();
  return mount(<LoginView {...props} />);
};

const preencherFormLogin = (wrapper, username = usuario, password = senha) => {
  wrapper.find('#usuario').first().props().onChangeText(username);
  wrapper.find('#senha').first().props().onChangeText(password);

  return wrapper.update();
};

describe('Teste da feature Login', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('O componente deve montar e renderizar corretamente', () => {
    expect(wrapper).not.toBeNull();
  });

  describe('Teste do formulário de login', () => {
    it('O componente deve preencher os campos usuario e senha corretamente', () => {
      wrapper = preencherFormLogin(wrapper);

      expect(wrapper.find('#usuario').first().props().value).toBe(usuario);
      expect(wrapper.find('#senha').first().props().value).toBe(senha);
    });

    it('O componente deve preencher os campos corretamente e clicar em "Entrar"', () => {
      const login = jest.fn();

      wrapper.setProps({ login });
      wrapper = preencherFormLogin(wrapper);
      wrapper.find('#btn-entrar').first().props().onPress();

      expect(login).toHaveBeenCalledTimes(1);
    });

    it('O componente deve apresentar a mensagem "Usuário ou senha informados estão incorretos"', () => {
      const msgDeErro = 'Usuário ou senha informados estão incorretos';
      const isFormInvalid = true;

      wrapper.setProps({ msgDeErro, isFormInvalid });

      wrapper.update();

      expect(wrapper.find('#msg-de-erro').first().text()).toBe(msgDeErro);
    });
  });
});
