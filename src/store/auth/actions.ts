import { AuthActionsType, AUTH_LOGIN, AuthState, AUTH_LOGOUT } from './types';

export function login(auth: AuthState): AuthActionsType {

  localStorage.setItem('user_id', auth.id);
  localStorage.setItem('user_token', auth.token);

  return {
    type: AUTH_LOGIN,
    payload: auth
  };
}

export function logout(): AuthActionsType {

  localStorage.setItem('user_id', '');
  localStorage.setItem('user_token', '');

  return {
    type: AUTH_LOGOUT
  };
}