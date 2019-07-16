import mount from '../../../../__mocks__/mount';
import FazendasContainer from '../containers/FazendasContainer';

const props = {};

const initialState = { fazendasReducer: { fazendas: [] }, filtroDeFazendaReducer: { filtro: {}, labelsFiltro: [] } };

const getWrapper = () => mount(FazendasContainer, props, initialState);

describe('Teste da feature FazendasContainer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('O componente deve montar e renderizar corretamente', () => {
    expect(wrapper).not.toBeNull();
    expect(wrapper.exists('FazendasView')).toEqual(true);
  });
});
