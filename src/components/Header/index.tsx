import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from '../../store';
import { NavLink, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faFolder, faCloudUploadAlt, faCloudDownloadAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import './styles.scss';

import profile from '../../assets/images/profile.png';
import logo from '../../assets/images/logo.png';
import { logout } from '../../store/auth/actions';

const Header: React.FC = () => {

  const state = useSelector((state: ApplicationState) => state.auth)
  const dispatch = useDispatch();
  const history = useHistory();

  function logoutSystem() {
    dispatch(logout());
    history.push('/login');
  }

  return(

    <header id="header-app">
      <div className="nav-logo">
        <img src={logo} alt="logo" draggable="false"/>
      </div>

      <div className="nav-actions">
        <ul>
          <NavLink to="/inicio" className="menu-item" activeClassName="menu-item-active">
            <span className="menu-item-title">
              <FontAwesomeIcon icon={faHome} /> Início
            </span>
            <span className="menu-hover"></span>
          </NavLink>
          <NavLink to="/pastas" className="menu-item" activeClassName="menu-item-active">
            <span className="menu-item-title">
              <FontAwesomeIcon icon={faFolder} /> Pastas
            </span>
            <span className="menu-hover"></span>
          </NavLink>
          <NavLink to="/uploads" className="menu-item" activeClassName="menu-item-active">
            <span className="menu-item-title">
              <FontAwesomeIcon icon={faCloudUploadAlt} /> Uploads
            </span>
            <span className="menu-hover"></span>
          </NavLink>
          <NavLink to="/downloads" className="menu-item" activeClassName="menu-item-active">
            <span className="menu-item-title">
              <FontAwesomeIcon icon={faCloudDownloadAlt} /> Downloads
            </span>
            <span className="menu-hover"></span>
          </NavLink>
          <li className="menu-item" onClick={logoutSystem}>
            <span className="menu-item-title">
              <FontAwesomeIcon icon={faSignOutAlt} /> Sair
            </span>
            <span className="menu-hover"></span>
          </li>
        </ul>
        <div className="nav-profile">
          <img src={profile} alt=""/>
          <span>{ state.name || 'Usuário' }</span>
        </div>
      </div>
    </header>
  );
}

export default Header;