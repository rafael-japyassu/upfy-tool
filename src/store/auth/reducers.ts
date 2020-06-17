import { AuthActionsType, AUTH_LOGIN, AuthState } from './types';

const initialState: AuthState = {
  id: localStorage.getItem('user_id') || '',
  name: '',
  email: '',
  token: localStorage.getItem('user_token') || ''
};

export function authReducer (state = initialState, action: AuthActionsType): AuthState {
  switch(action.type) {
    case AUTH_LOGIN:
      console.log('Chamou o Reducer!');
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