import mount from '../../../../../../../__mocks__/mount';
import LimparFiltroContainer from '../containers/LimparFiltroContainer';

const props = {};

const initialState = { };

const getWrapper = () => mount(LimparFiltroContainer, props, initialState);

describe('Teste da feature LimparFiltroContainer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('O componente deve montar e renderizar corretamente', () => {
    expect(wrapper).not.toBeNull();
    expect(wrapper.exists('ButtonNavBar')).toEqual(true);
  });
});
