import React from 'react';
import { Text } from 'react-native';
import { shallow } from 'enzyme';
import Carousel from '../Carousel';

const slides = ['React Native', 'React Native Project'];

const props = {
  doneLabel: 'Começar',
  onDone: () => {},
};

const getWrapper = () => {
  jest.useFakeTimers();

  return shallow(
    <Carousel {...props}>
      { slides.map(item => <Text>{item}</Text>) }
    </Carousel>,
  );
};

describe('Teste do componente Carousel', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('O componente deve montar e renderizar corretamente', () => {
    expect(wrapper).not.toBeNull();
  });

  it('O componente deve selecionar a pagina informada quando a prop "onPageSelected" for executada', () => {
    const pagina = 2;
    wrapper.find('CarouselPager').first().props().onPageSelected(pagina);
    expect(wrapper.instance().state.activePage).toEqual(pagina);
  });

  describe('Teste da paginação do componente', () => {
    beforeEach(() => {
      wrapper.setProps({ showPagination: true });
    });

    it('O componente deve exibir a paginação corretamente', () => {
      expect(wrapper.exists('#pagination')).toEqual(true);
    });

    it('O componente deve exibir a paginação de acordo com o número de slides', () => {
      const pagination = wrapper.find('#pagination').props().children.length;

      expect(pagination).toEqual(slides.length);
    });

    it('O componente deve direcionar o usuário quando clicar na paginação', () => {
      const position = 1;
      const scrollToPage = jest.fn();

      const linksPagination = wrapper.find('#pagination').find('TouchableOpacity');

      wrapper.instance().carousel = { scrollToPage };

      linksPagination.at(position).simulate('press');

      expect(wrapper.instance().state.activePage).toEqual(position);
      expect(scrollToPage).toHaveBeenCalledTimes(1);
    });
  });

  describe('Teste do botão de navegação "Próximo"', () => {
    beforeEach(() => {
      wrapper.setProps({ nextLabel: 'Próximo' });
      wrapper.instance().carousel = { scrollToPage: jest.fn() };
    });

    it('Deve ocultar o botão "Próximo" quando não for atribuido a label do componente', () => {
      wrapper.setProps({ nextLabel: '' });
      expect(wrapper.exists('#btn-next')).toEqual(false);
    });

    it('Deve navegar para o próximo slide quando for clicado no botão "Próximo"', () => {
      expect(wrapper.instance().state.activePage).toEqual(0);

      wrapper.find('#btn-next').simulate('press');

      expect(wrapper.instance().state.activePage).toEqual(1);
    });

    it('Deve ocultar o botão "Próximo" no último slide', () => {
      wrapper.find('#btn-next').simulate('press');
      expect(wrapper.exists('#btn-next')).toEqual(false);
    });
  });

  describe('Teste do botão "Fechar"', () => {
    beforeEach(() => {
      wrapper.setProps({ doneLabel: 'Fechar' });
      wrapper.setProps({ onDone: () => {} });

      wrapper.setProps({ nextLabel: 'Próximo' });
      wrapper.instance().carousel = { scrollToPage: jest.fn() };
    });

    it('Deve ocultar o botão "Fechar" caso não seja o ultimo slide', () => {
      expect(wrapper.instance().state.activePage).toEqual(0);
      expect(wrapper.exists('#btn-done')).toEqual(false);
    });

    it('Deve exibir o botão "Fechar" no ultimo slide', () => {
      wrapper.find('#btn-next').simulate('press');

      expect(wrapper.exists('#btn-done')).toEqual(true);
    });
  });
});
