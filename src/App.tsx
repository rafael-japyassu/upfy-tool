import React, { useEffect } from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import UserLayout from './containers/UserLayout';
import ReactNotification from 'react-notifications-component'

import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from './store';
import AppLayout from './containers/AppLayout';
import api from './services/api';
import { login } from './store/auth/actions';
import { AuthState } from './store/auth/types';
// import { stat } from 'fs';

function App() {

  const state = useSelector((state: ApplicationState) => state.auth)
  const dispatch = useDispatch();

  function verifyLogin() {
    console.log(state);
    if (state.id !== '' && state.token !== '' && state.name === '') {
      api.get<AuthState>(`/users/${state.id}`).then(response => {
        const userData: AuthState = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          token: localStorage.getItem('user_token') || ''
        };
        dispatch(login(userData))
        console.log('Aqui')
        return(
          <>
            <Redirect to='/inicio' />
            <AppLayout />
          </>
        );
      }).catch(error => {
        return(
          <>
            <Redirect to='/login' />
            <UserLayout />
          </>
        );
      })
    } else {
      return(
        <>
          <Redirect to='/login' />
          <UserLayout />
        </>
      );
    }
  }

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <BrowserRouter>
      <ReactNotification />
      {
        state.id !== "" ? <AppLayout /> : <UserLayout />
      }
    </BrowserRouter>
  );
}

export default App;
