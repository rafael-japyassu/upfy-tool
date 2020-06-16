import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Login from '../pages/user/Login';

const routes: React.FC = () => {
  return(
    <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/login" exact component={Login}/>
    </Switch>
  );
}

export default routes;