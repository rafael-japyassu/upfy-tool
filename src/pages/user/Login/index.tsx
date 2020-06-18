import React, { useState, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux';
import { Auth, AuthState } from '../../../store/auth/types';
import { store } from 'react-notifications-component';

import { login } from '../../../store/auth/actions';

import logo from '../../../assets/images/logo.png';
import api from '../../../services/api';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [userModel, setUserModel] = useState<Auth>({
    email: '',
    password: ''
  });

  function updateModel(e: ChangeEvent<HTMLInputElement>) {
    setUserModel({
      ...userModel,
      [e.target.name]: e.target.value
    });
  }

  function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    api.post<AuthState>('/session', userModel).then(response => {
      dispatch(login(response.data));
      history.push('/inicio');
      
    }).catch(error => {
      if (error.response === undefined) {
        store.addNotification({
          title: "Erro",
          message: "Falha no Servidor",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000
          }
        });
      } else if (error.response.status === 404) {
        store.addNotification({
          title: "Alerta",
          message: "Credenciais Inválidas!",
          type: "warning",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000
          }
        });
      } else {
        store.addNotification({
          title: "Erro",
          message: "Falha no Servidor",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000
          }
        });
      }
      
    });
  }

  return(
    <form className="card-login" onSubmit={onSubmit}>
      <div className="card-logo">
        <img src={logo} alt="logo"/>
      </div>

      <label>Email</label>
      <div className="input-icon">
        <FontAwesomeIcon icon={faEnvelope} className="icon"/>
        <input 
          type="email" 
          required
          name="email"
          value={userModel.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
        />
      </div>

      <label>Senha</label>
      <div className="input-icon">
        <FontAwesomeIcon icon={faLock} className="icon" />
        <input 
          type="password" 
          required
          name="password"
          value={userModel.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
        />
      </div>
    
      <button type="submit">Entrar</button>
    </form>
  );
}

export default Login;