import React from 'react';
import { mount } from 'enzyme';
import { Actions } from 'react-native-router-flux';
import FazendaView from '../containers/FazendaView';
import { mockScrollView } from '../../../../__mocks__/components';
import { fazenda } from '../../../../__mocks__/data';

const props = { fazenda };

const getWrapper = () => {
  jest.useFakeTimers();
  return mount(<FazendaView {...props} />);
};

describe('Teste da feature FazendaView', () => {
  let wrapper;

  mockScrollView();

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('Deve montar e renderizar o componente corretamente', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Deve ocultar a lista de vistorias quando não tiver', () => {
    const mockFazenda = { ...fazenda, vistorias: [] };

    expect(wrapper.instance().renderVistorias(mockFazenda)).toBeNull();
  });

  it('Deve direcionar o usuário para a view de animais quando for clicado no botão "Animais"', () => {
    let route;
    let fazendaId;

    Actions.push = (redirectTo, params) => {
      route = redirectTo;
      fazendaId = params.id;
    };

    wrapper.find('#btn-animais').first().props().onPress();

    expect(route).toEqual('animais');
    expect(fazendaId).toEqual(fazenda.id);
  });
});
