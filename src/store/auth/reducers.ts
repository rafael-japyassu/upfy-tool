import { AuthActionsType, AUTH_LOGIN, AuthState, AUTH_LOGOUT } from './types';

const initialState: AuthState = {
  id: localStorage.getItem('user_id') || '',
  name: '',
  email: '',
  token: localStorage.getItem('user_token') || ''
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
    case AUTH_LOGOUT:
      return {
        id: '',
        name: '',
        email: '',
        token: ''
      };
    default:
      return state;
  }
}