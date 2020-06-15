import { Auth, AuthActionsType, AUTH_LOGIN } from './types';

export function login(auth: Auth): AuthActionsType {
  return {
    type: AUTH_LOGIN,
    payload: auth
  };
}