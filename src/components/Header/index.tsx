import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faFolder, faCloudUploadAlt, faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons'

import './styles.scss';

import profile from '../../assets/images/profile.png';

const Header: React.FC = () => {
  return(
    <header id="header-app">
      <div className="nav-logo">
        {/* <h3>Teste</h3> */}
      </div>

      <div className="nav-actions">
        <ul>
          <li className="menu-item">
            <span className="menu-item-title">
              <FontAwesomeIcon icon={faHome} /> Início
            </span>
            <span className="menu-hover"></span>
          </li>
          <li className="menu-item">
            <span className="menu-item-title">
              <FontAwesomeIcon icon={faFolder} /> Pastas
            </span>
            <span className="menu-hover"></span>
          </li>
          <li className="menu-item">
            <span className="menu-item-title">
              <FontAwesomeIcon icon={faCloudUploadAlt} /> Uploads
            </span>
            <span className="menu-hover"></span>
          </li>
          <li className="menu-item">
            <span className="menu-item-title">
              <FontAwesomeIcon icon={faCloudDownloadAlt} /> Downloads
            </span>
            <span className="menu-hover"></span>
          </li>
        </ul>
        <div className="nav-profile">
          <img src={profile} alt=""/>
          <span>Nome do usuário</span>
        </div>
      </div>
    </header>
  );
}

export default Header;