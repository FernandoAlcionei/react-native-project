import React from 'react';
import { Text } from 'react-native';
import { shallow } from 'enzyme';
import CarouselPagerIOS from '../CarouselPager.ios';

const slides = [
  {
    nome: 'Project',
    id: 'project',
  },
  {
    nome: 'React Native Project',
    id: 'rn-project',
  },
];

const props = {
  onPageSelected: () => {},
  width: 100,
};

const getWrapper = () => {
  jest.useFakeTimers();

  return shallow(
    <CarouselPagerIOS {...props}>
      { slides.map(item => <Text id={item.id}>{item.nome}</Text>) }
    </CarouselPagerIOS>,
  );
};

describe('Teste do componente CarouselPagerIOS', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('O componente deve montar e renderizar corretamente', () => {
    expect(wrapper).not.toBeNull();
  });

  it('O componente deve renderizar os slides corretamente', () => {
    expect(wrapper.exists('#project')).toEqual(true);
    expect(wrapper.exists('#rn-project')).toEqual(true);
  });

  it('O componente deve  trocar o slide quando a prop "scrollTo" for executada', () => {
    const scrollTo = jest.fn();

    wrapper.instance().scrollView = { scrollTo };
    wrapper.instance().scrollToPage();

    expect(scrollTo).toHaveBeenCalledTimes(1);
  });

  it('O componente deve atualizar o "state" quando o scroll for realizado', () => {
    const onPageSelected = jest.fn();

    wrapper.setProps({ onPageSelected });

    wrapper.instance().onMomentumScrollEnd();

    expect(onPageSelected).toHaveBeenCalledTimes(1);
  });
});
