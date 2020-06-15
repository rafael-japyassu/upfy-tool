export interface Auth {
  email: string;
  password: string;
}

export interface AuthState {
  id: string;
  name: string;
  email: string;
  token: string;
}

export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_LOGGED = 'AUTH_LOGGED';

interface LoginAction {
  type: typeof AUTH_LOGIN;
  payload: Auth;
}

interface LogoutAction {
  type: typeof AUTH_LOGOUT;
}

interface AuthLogged {
  type: typeof AUTH_LOGGED;
  payload: AuthState;
}

export type AuthActionsType = LoginAction | LogoutAction | AuthLogged;
