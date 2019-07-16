import React from 'react';
import { mount } from 'enzyme';
import ButtonIcon from '../index';

const props = {
  color: '#FFF',
  icon: 'area',
  onPress: () => {},
  widthIcon: 10,
  heightIcon: 10,
  id: 'button-icon',
};

const getWrapper = () => mount(<ButtonIcon {...props} />);

describe('Teste do componente ButtonIcon', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('O componente deve montar e renderizar corretamente', () => {
    expect(wrapper).not.toBeNull();
    expect(wrapper.exists('#button-icon')).toEqual(true);
  });

  it('Deve executar a prop "onPress" quando for clicado', () => {
    const onPress = jest.fn();

    wrapper.setProps({ onPress });
    wrapper.update();

    wrapper.find('#button-icon').first().props().onPress();

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
