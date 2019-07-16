import React from 'react';
import { shallow } from 'enzyme';
import BuscaView from '../containers/BuscaView';
import NavBar from '../../../components/NavBar';
import BuscaContainer from '../containers/BuscaContainer';

const props = {
  id: 'busca-container',
  placeholder: 'Busca...',
};

const getWrapper = () => {
  jest.useFakeTimers();
  return shallow(<BuscaContainer {...props} />);
};

describe('Teste do template BuscaContainer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('Deve montar e renderizar o componente corretamente', () => {
    expect(wrapper).not.toBeNull();
    expect(wrapper.exists(NavBar)).toEqual(true);
    expect(wrapper.exists(BuscaView)).toEqual(true);
  });

  it('Deve validar os atributos de navegação', () => {
    const { leftButtonIcon, rightButtonText } = wrapper.instance();

    expect(rightButtonText).toHaveProperty('title');
    expect(rightButtonText.title).toBe('Cancelar');
    expect(rightButtonText).toHaveProperty('onPress');
    expect(leftButtonIcon).toHaveProperty('icon');
    expect(leftButtonIcon.icon).toBe('ios-search');
  });

  it('Deve passar o valor da busca para o Container', () => {
    expect(wrapper.find(BuscaView).first().props().busca).toBe('');

    const busca = 'Valor busca';
    wrapper.instance().setState({ busca });
    wrapper.instance().forceUpdate();

    expect(wrapper.find(BuscaView).first().props().busca).toBe(busca);
  });
});
