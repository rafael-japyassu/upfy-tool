import { AuthActionsType, AUTH_LOGIN, AuthState } from './types';

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
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        token: action.payload.token
      };
    default:
      return state;
  }
}