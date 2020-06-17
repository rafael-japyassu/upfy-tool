import React from 'react';

import './styles.scss';

// import Login from '../../pages/user/Login';
import RoutesUser from '../../routes/user';

const UserLayout: React.FC = () => {
  return(
    <div className="user-layout">
      <div className="container-user-layout">
        <RoutesUser />
      </div>
    </div>
  );
}

export default UserLayout;