import React, { useState, ChangeEvent, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply, faTimes, faSave, faFolder } from '@fortawesome/free-solid-svg-icons'

import './styles.scss';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../../../services/api';
import { IFolderForm, IFolderList } from '../../../../interfaces/folder';
import { notification } from '../../../../helpers/alerts';

import moment from 'moment';

const FolderDetail: React.FC = () => {

  const { id } = useParams();
  const history = useHistory();
  const [folder, setFolder] = useState<IFolderForm>({
    name: ''
  });

  const [folderDetail, setFolderDetail] = useState<IFolderList>();
  
  useEffect(() => {
    
    if (id !== undefined) {
      // carregad dados da pasta
      api.get<IFolderList>(`folders/${id}`).then(response => {
        setFolder({ name: response.data.name });
        setFolderDetail(response.data);
      })
    }

  }, [id]);

  function back() {
    history.goBack();
  }
  
  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    try {

      await api.post('folders', folder);
      notification("Sucesso", "Pasta criada com sucesso!", "success");
      back();

    } catch(error) {

      if (error.response === undefined) {
        notification("Erro", "Falha no Servidor!", "danger");
      } else if (error.response.status === 404) {
        notification("Alerta", "Credenciais Inválidas!", "warning");
      } else if (error.response.status === 422) {
        notification("Alerta", "Já existe uma pasta com este nome!", "warning");
      } else {
        notification("Erro", "Falha no Servidor!", "danger");
      }
    }

  }

  return(
    <div className="folder-page">
      <div className="folder-header">
        <h2>Pasta{ ' > ' + folder.name }</h2>
        <button className="btn" onClick={back}>
          <FontAwesomeIcon icon={faReply} size="lg" /> Voltar
        </button>
      </div>
      <div className="folder-container">
        <div className="card-detail">
          <div className="card-title">
            <h3>Dados da Pasta</h3>
          </div>
          <div className="card-detail-body">
            <div className="folder-detail-img">
              <FontAwesomeIcon icon={faFolder} size="5x" className="folder-icon" />
            </div>
            <div className="folder-detail">
              <span>Nome: <span className="folder-detail-data">{ folderDetail?.name }</span></span>
              <span>Data de Cadastro: <span className="folder-detail-data">{ moment(folderDetail?.createdAt).format('DD/MM/yyyy') }</span></span>
              <span>Ultima Atualização: <span className="folder-detail-data">{ moment(folderDetail?.updatedAt).format('DD/MM/yyyy') }</span></span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">
            <h3>Dados do formulário</h3>
          </div>
          <form onSubmit={onSubmit}>
            <div className="card-body">
              <label>Nome da Pasta</label>
              <input 
                type="text" 
                required 
                value={folder.name} 
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFolder({ name: e.target.value })}
                maxLength={30}
              />
            </div>
            <div className="card-actions">
              <button className="btn" type="submit">
                <FontAwesomeIcon icon={faSave} /> Salvar
              </button>{' '}
              <button className="btn btn-cancel" type="button" onClick={back}>
                <FontAwesomeIcon icon={faTimes} /> Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FolderDetail;