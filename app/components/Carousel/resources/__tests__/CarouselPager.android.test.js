import React from 'react';
import { Text } from 'react-native';
import { shallow } from 'enzyme';
import CarouselPagerAndroid from '../CarouselPager.android';

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

const props = { onPageSelected: () => {} };

const getWrapper = () => {
  jest.useFakeTimers();

  return shallow(
    <CarouselPagerAndroid {...props}>
      { slides.map(item => <Text id={item.id}>{item.nome}</Text>) }
    </CarouselPagerAndroid>,
  );
};

describe('Teste do componente CarouselPagerAndroid', () => {
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

  it('O componente deve trocar o slide corretamente', () => {
    const onPageSelected = jest.fn();

    wrapper.setProps({ onPageSelected });

    wrapper.instance().viewPager = { setPage: () => {} };
    wrapper.instance().scrollToPage();

    expect(onPageSelected).toHaveBeenCalledTimes(1);
  });
});
