import React from 'react';
import { mount } from 'enzyme';
import LogoutView from '../containers/LogoutView';

const props = { logout: () => {} };

const getWrapper = () => {
  jest.useFakeTimers();
  return mount(<LogoutView {...props} />);
};

describe('Teste do LogoutView', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('Deve montar e renderizar o componente corretamente', () => {
    expect(wrapper).not.toBeNull();
    expect(wrapper.exists('TouchableOpacity')).toEqual(true);
  });

  it('Deve executar a prop "logout" quando for clicado no botão', () => {
    const logout = jest.fn();

    wrapper.setProps({ logout });
    wrapper.update();

    wrapper.find('TouchableOpacity').first().props().onPress();

    expect(logout).toHaveBeenCalledTimes(1);
  });
});
