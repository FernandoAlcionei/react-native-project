import mount from '../../../../__mocks__/mount';
import FiltroContainer from '../containers/FiltroContainer';

const props = {};

const initialState = { filtroDeFazendaReducer: { filtro: {}, areas: [], msgDeErro: null } };

const getWrapper = () => mount(FiltroContainer, props, initialState);

describe('Teste da feature FiltroContainer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('O componente deve montar e renderizar corretamente', () => {
    expect(wrapper).not.toBeNull();
    expect(wrapper.exists('FiltroView')).toEqual(true);
  });
});
