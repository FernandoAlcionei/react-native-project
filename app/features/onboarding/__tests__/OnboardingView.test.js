import React from 'react';
import { shallow } from 'enzyme';
import { Actions } from 'react-native-router-flux';
import OnboardingView from '../containers/OnboardingView';

const keyBemVindo = 'bemVindo';
const keyFiltro = 'filtro';
const keyBusca = 'busca';
const keyDetalhes = 'detalhes';

const routeLogin = 'fazendas';

const getWrapper = () => {
  jest.useFakeTimers();
  return shallow(<OnboardingView />);
};

describe('Teste da feature OnboardingView', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('O componente deve montar e renderizar corretamente', () => {
    expect(wrapper).not.toBeNull();
  });

  it('O componente deve renderizar o carrossel', () => {
    const carousel = wrapper.find('Carousel');
    const itensCarousel = carousel.props().children;

    expect(itensCarousel[0].key).toEqual(keyBemVindo);
    expect(itensCarousel[1].key).toEqual(keyFiltro);
    expect(itensCarousel[2].key).toEqual(keyBusca);
    expect(itensCarousel[3].key).toEqual(keyDetalhes);
  });

  it('O componente deve redirecionar o usuário para a tela de fazendas quando finalizar o onboarding', () => {
    let route;

    Actions.replace = (redirectTo) => { route = redirectTo; };

    wrapper.instance().onDone();

    expect(route).toEqual(routeLogin);
  });
});
