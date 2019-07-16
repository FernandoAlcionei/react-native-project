import mount from '../../../../../../__mocks__/mount';
import LogoutContainer from '../containers/LogoutContainer';

const props = {};

const initialState = {};

const getWrapper = () => mount(LogoutContainer, props, initialState);

describe('Teste do LogoutContainer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('O componente deve montar e renderizar corretamente', () => {
    expect(wrapper).not.toBeNull();
    expect(wrapper.exists('LogoutView')).toEqual(true);
  });
});
