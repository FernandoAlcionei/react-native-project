import apisauce from 'apisauce';
import ApiConstants from './ApiConstants';

const { BASE_URL, LOGIN } = ApiConstants;

const create = () => {
  const api = apisauce.create({
    baseURL: BASE_URL,
    headers: {
      'Cache-Control': 'max-age=0, no-cache, no-store, must-revalidate, proxy-revalidate',
      'Content-Type': 'application/json',
      pragma: 'no-cache',
    },
    timeout: 20000,
  });

  const login = (usuario, senha) => (
    api.post(LOGIN, {
      usuario,
      senha,
    })
  );

  return { login };
};

export default { create };
