import React from 'react';
import { shallow } from 'enzyme';
import { BuscaView } from '../containers/BuscaView';
import { fazenda } from '../../../__mocks__/data';

const listaDeResultados = [fazenda];

const adicionarFiltroDeBusca = jest.fn();
const limparHistoricoDeBuscas = jest.fn();
const filtrarBusca = jest.fn();

const propsDefault = {
  adicionarFiltroDeBusca,
  limparHistoricoDeBuscas,
  filtrarBusca,
  filtro: {},
  labelsFiltro: [],
  listaDeResultados: [],
  filtroDeBusca: {},
  historicoDeBuscas: [],
};

const getWrapper = (props = propsDefault) => {
  jest.useFakeTimers();
  return shallow(<BuscaView {...props} />);
};

describe('Teste do template BuscaView', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('Deve montar e renderizar o componente corretamente', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Deve executar a prop "limparHistoricoDeBuscas" quando clicar no botão "Limpar histórico"', () => {
    wrapper.setProps({ historicoDeBuscas: [{ texto: 'Suinocultura' }], listaDeResultados });
    wrapper.update();

    wrapper.find('#btn-limpar-historico').first().props().onPress();

    expect(limparHistoricoDeBuscas).toHaveBeenCalledTimes(1);
  });

  it('Deve filtrar os resultados', () => {
    expect(wrapper.exists('#lista-de-busca')).toEqual(false);

    wrapper.setProps({ listaDeResultados });
    wrapper.instance().setState({ filtro: { busca: 'Suinocultura' } });
    wrapper.update();

    expect(wrapper.exists('#lista-de-busca')).toEqual(true);
  });

  it('Deve listar o histórico de buscas', () => {
    expect(wrapper.exists('#historico')).toEqual(false);

    wrapper.setProps({ historicoDeBuscas: [{ texto: 'Suinocultura' }], listaDeResultados });
    wrapper.instance().setState({ filtro: { busca: '' } });
    wrapper.instance().forceUpdate();
    wrapper.update();

    expect(wrapper.exists('#item-0')).toEqual(true);
    expect(wrapper.exists('#historico')).toEqual(true);
  });

  it('Deve executar o filtro de busca quando a busca for valida', () => {
    const spy = jest.spyOn(wrapper.instance(), 'voltar');
    wrapper.instance().adicionarFiltro('Suinocultura');

    expect(filtrarBusca).toHaveBeenCalledTimes(1);
    expect(adicionarFiltroDeBusca).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Deve executar o filtro quando a props "searched" estiver true', () => {
    const spy = jest.spyOn(wrapper.instance(), 'adicionarFiltro');

    expect(wrapper.state('filtered')).toBeFalsy();

    wrapper.setProps({ searched: true });
    wrapper.update();
    wrapper.instance().forceUpdate();

    expect(wrapper.state('filtered')).toBeTruthy();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
