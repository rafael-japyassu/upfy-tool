import { Auth, AuthActionsType, AUTH_LOGIN, AUTH_LOGOUT, AUTH_LOGGED, AuthState } from './types';

const initialState: AuthState = {
  id: '',
  name: '',
  email: '',
  token: ''
};

export function authReducer (state = initialState, action: AuthActionsType): AuthState {
  switch(action.type) {
    case AUTH_LOGIN:
      return {
        id: state.id,
        name: state.name,
        email: state.email,
        token: state.token
      };
    default:
      return state;
  }
}