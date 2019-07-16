import React from 'react';
import { mount } from 'enzyme';
import FazendaContainer from '../containers/FazendaContainer';
import { fazenda } from '../../../../__mocks__/data';

const props = { fazenda };

const getWrapper = () => {
  jest.useFakeTimers();
  return mount(<FazendaContainer {...props} />);
};

describe('Teste da feature FazendaContainer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('O componente deve montar e renderizar corretamente', () => {
    expect(wrapper).not.toBeNull();
    expect(wrapper.exists('FazendaView')).toEqual(true);
  });
});
