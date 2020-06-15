import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'


import './styles.scss';
import logo from '../../assets/images/upfy.png';

const UserLayout: React.FC = () => {
  return(
    <div className="user-layout">
      <div>
        <h1>UPFY</h1>
      </div>
      <div className="container-user-layout">
        <form className="card-login">
          <div className="card-logo">
            <img src={logo} alt="logo"/>
          </div>

          <label>Email</label>
          <div className="input-icon">
            <FontAwesomeIcon icon={faEnvelope} className="icon"/>
            <input type="email" required/>
          </div>

          <label>Senha</label>
          <div className="input-icon">
            <FontAwesomeIcon icon={faLock} className="icon" />
            <input type="password" required/>
          </div>
        
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default UserLayout;