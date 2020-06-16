import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import UserLayout from './containers/UserLayout';
import ReactNotification from 'react-notifications-component'

import { useSelector } from 'react-redux'
import { ApplicationState } from './store';

function App() {

  const state = useSelector((state: ApplicationState) => state)

  useEffect(() => {
    console.log(state.auth)
  }, [state])

  return (
    <BrowserRouter>
      <ReactNotification />
      <UserLayout />
    </BrowserRouter>
  );
}

export default App;
