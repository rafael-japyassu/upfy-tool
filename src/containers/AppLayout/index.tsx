import React from 'react';

import './styles.scss';
import Header from '../../components/Header';

import AppRoutes from '../../routes/app';

const AppLayout: React.FC = () => {
  return(
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <AppRoutes />
      </main>
    </div>
  );
}

export default AppLayout;