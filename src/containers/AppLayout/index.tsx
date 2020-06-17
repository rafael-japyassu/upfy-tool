import React from 'react';

import './styles.scss';
import Header from '../../components/Header';

const AppLayout: React.FC = () => {
  return(
    <div className="app-layout">
      <Header />
    </div>
  );
}

export default AppLayout;