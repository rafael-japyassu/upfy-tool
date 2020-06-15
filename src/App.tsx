import React, { useEffect } from 'react';
import UserLayout from './containers/UserLayout';

import { useSelector } from 'react-redux'
import { ApplicationState } from './store';

function App() {

  const state = useSelector((state: ApplicationState) => state)

  useEffect(() => {
    console.log(state.auth)
  }, [state])

  return (
    <>
      <UserLayout />
    </>
  );
}

export default App;
