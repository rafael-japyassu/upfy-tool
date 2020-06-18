import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from '../pages/app/Home';
import Folder from '../pages/app/Folder';
import FolderForm from '../pages/app/Folder/Form';
import FolderDetail from '../pages/app/Folder/Detail';

const routes: React.FC = () => {
  return(
    <Switch>
      <Route path="/inicio" exact component={Home}/>
      <Route path="/pastas" exact component={Folder}/>
      <Route path="/pastas/cadastro" exact component={FolderForm}/>
      <Route path="/pastas/:id/detalhe" exact component={FolderDetail}/>
    </Switch>
  );
}

export default routes;