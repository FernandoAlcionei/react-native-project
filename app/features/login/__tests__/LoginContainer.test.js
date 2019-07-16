import mount from '../../../__mocks__/mount';
import LoginContainer from '../containers/LoginContainer';

const props = {};

const initialState = {
  loginReducer: {
    isFormInvalid: false,
    msgDeErro: '',
  },
};

const getWrapper = () => mount(LoginContainer, props, initialState);

describe('Teste da feature LoginContainer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = getWrapper();
  });

  it('O componente deve montar e renderizar corretamente', () => {
    expect(wrapper).not.toBeNull();
    expect(wrapper.exists('LoginView')).toEqual(true);
  });
});
