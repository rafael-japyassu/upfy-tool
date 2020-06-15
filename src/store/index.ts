import { combineReducers, Reducer } from 'redux';
import { authReducer } from './auth/reducers';
import { AuthState } from './auth/types';

export interface ApplicationState {
    auth: AuthState;
}

export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;
