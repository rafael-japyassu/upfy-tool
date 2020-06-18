import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFolderPlus } from '@fortawesome/free-solid-svg-icons';

import './styles.scss';
import api from '../../../services/api';
import { IFolderList } from '../../../interfaces/folder';
import { notification } from '../../../helpers/alerts';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/auth/actions';

const Folder: React.FC = () => {

  const history = useHistory();
  const [folders, setForlders] = useState<IFolderList[]>([]);
  const dispatch = useDispatch();
  
  useEffect(() => {

    async function loadFolders() {
      try {
        const response = await api.get('/folders')
        setForlders(response.data);
      } catch(error) {
        if (error.response === undefined) {
          notification("Erro", "Falha no Servidor!", "danger");
        } else if (error.response.status === 401) {
          notification("Alerta", "Sessão finalizada!", "warning");
          dispatch(logout());
          history.push('/login');
        } else if (error.response.status === 404) {
          notification("Alerta", "Credenciais Inválidas!", "warning");
        } else if (error.response.status === 422) {
          notification("Alerta", "Já existe uma pasta com este nome!", "warning");
        } else {
          notification("Erro", "Falha no Servidor!", "danger");
        }
      }
    }

    loadFolders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function newFolder() {
    history.push('/pastas/cadastro');
  }

  function editFolder(id: string) {

    history.push(`/pastas/${id}/detalhe`);
  }

  return(
    <div className="folder-page">
      <div className="folder-header">
        <h2>Minhas Pastas</h2>
        <button className="btn btn-secondary" onClick={newFolder}>
          <FontAwesomeIcon icon={faFolderPlus} size="lg" /> Nova Pasta
        </button>
      </div>
      <div className="folder-container">
        <div className="cards-foler">

          {
            folders.map(folder => (
              <div className="card-folder card-primary" key={folder.id} onClick={() => editFolder(folder.id)} >
                <span className="folder-tag"></span>
                <div className="folder-body">
                  <span className="folder-title">{ folder.name }</span>
                  <FontAwesomeIcon icon={faFolder} size="3x" className="folder-icon" />
                </div>
              </div>
            ))
          }

        </div>
      </div>
    </div>
  );
}

export default Folder;