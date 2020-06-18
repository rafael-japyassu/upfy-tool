import React, { useState, ChangeEvent, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply, faTimes, faSave } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';
import { IFolderForm, IFolderList } from '../../../../interfaces/folder';
import { notification } from '../../../../helpers/alerts';
import { logout } from '../../../../store/auth/actions';
import { useDispatch } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Dropzone from 'react-dropzone';
import filesize from 'filesize';

import api from '../../../../services/api';

import './styles.scss';
import DropContainer from '../../../../components/DropContainer';
import UploadMessage from '../../../../components/UploadMessage';

const UploadFilesForm: React.FC = () => {

  const history = useHistory();
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [folders, setForlders] = useState<IFolderList[]>([]);
  const dispatch = useDispatch();
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const [nameFile, setNameFile] = useState('');
  const [folderFile, setFolderFile] = useState('');

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

  function back() {
    history.goBack();
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    try {

      const data = new FormData();
      data.append('file', uploadedFile[0].file, uploadedFile[0].name);
      data.append('name', nameFile);
      data.append('folder', folderFile);

      await api.post('/uploads', data, {
        onUploadProgress: e => {
          const progress = Math.round((parseInt(e.loaded) * 100) / parseInt(e.total));
          setUploadProgress(progress);
        }
      })

      // await api.post('folders', folder);
      notification("Sucesso", "Upload realizado com sucesso!", "success");
      setTimeout(() => {
        back();
      }, 2000);

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

  function renderDragMessage(isDragActive: boolean, isDragReject: boolean) {
    if (!isDragActive) {
      return <UploadMessage message="Arraste arquivos aqui..." />
    }

    if (isDragReject) {
      return <UploadMessage message="Arquivo não suportado" type="error" />
    }

    return <UploadMessage message="Solte o arquivo aqui" type="success" />
  }

  function onUpload(files: File[]) {
    const uploadFile = files.map(file => ({
      file,
      name: file.name,
      readableSize: filesize(file.size),
      preview : URL.createObjectURL(file),
      progress: 40,
      uploaded: false,
      error: false,
      url: null
    }));

    setUploadedFile(uploadFile);
  }

  function processUpload(uploadedFile: any) {
    



  }

  useEffect(() => {
    console.log(uploadedFile);
  }, [uploadedFile]);

  return(
    <div className="upload-file-page">
      <div className="upload-file-header">
        <h2>Upload de Arquivos</h2>
        <button className="btn btn-secondary" onClick={back}>
          <FontAwesomeIcon icon={faReply} size="lg" /> Voltar
        </button>
      </div>
      <div className="upload-file-container">
        <div className="card">
          <div className="card-title">
            <h3>Dados do formulário</h3>
          </div>
          <form onSubmit={onSubmit}>
            <div className="card-body">

              <div className="upload-form">
                <Dropzone 
                  accept="image/*"
                  multiple={false}
                  onDropAccepted={(files: File[]) => onUpload(files)}
                  children={({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                    <DropContainer 
                      rootProps={getRootProps()} 
                      isDragActive={isDragActive} 
                      isDragReject={isDragReject}
                    >
                      <input {...getInputProps()} />
                      {renderDragMessage(isDragActive, isDragReject)}
                    </DropContainer>
                  )}
                />
                <span>Informações do arquico</span>
                {
                  uploadedFile !== null ?
                  <div className="upload-data">
                    <img src={uploadedFile[0].preview} alt="preview"/>
                    <div className="upload-data-info">
                      <p><strong>Nome do arquivo:</strong> {uploadedFile[0].name}</p>
                      <p><strong>Tamanho:</strong> {uploadedFile[0].readableSize}</p>
                    </div>
                    <div style={{paddingLeft: 10}}>
                      <CircularProgressbar 
                        styles={{
                          root: { width: 70 },
                          path: { 
                            stroke: '#FF4F5A'
                          }
                        }}
                        strokeWidth={12}
                        value={uploadProgress}/>
                    </div>
                  </div>
                  : ''
                }
              </div>

              <div className="upload-form-data">
                <label>Nome do arquivo <span style={{color: '#ff0000'}}>*</span></label>
                <input 
                  type="text" 
                  required 
                  value={nameFile} 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setNameFile(e.target.value)}
                  maxLength={30}
                />

                <label>Pasta <span style={{color: '#ff0000'}}>*</span></label>
                <select className="select-field" required value={folderFile} onChange={(e: ChangeEvent<HTMLSelectElement>) => setFolderFile(e.target.value)}>
                  <option value="">Selecione uma Pasta</option>
                  {
                    folders.map(folder => (
                      <option value={folder.id} key={folder.id}>{ folder.name }</option>
                    ))
                  }
                </select>
              </div>
            
            </div>
            <div className="card-actions">
              <button className="btn btn-primary" type="submit">
                <FontAwesomeIcon icon={faSave} /> Salvar
              </button>{' '}
              <button className="btn btn-default" type="button" onClick={back}>
                <FontAwesomeIcon icon={faTimes} /> Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UploadFilesForm;