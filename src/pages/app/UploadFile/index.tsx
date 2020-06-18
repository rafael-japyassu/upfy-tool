import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';

import './styles.scss';

const UploadFiles: React.FC = () => {

  const history = useHistory();

  function newFolder() {
    history.push('/uploads/cadastro');
  }

  return(
    <div className="upload-file-page">
      <div className="upload-file-header">
        <h2>Meus Uploads</h2>
        <button className="btn btn-secondary" onClick={newFolder}>
          <FontAwesomeIcon icon={faFileUpload} size="lg" /> Novo Upload
        </button>
      </div>
      <div className="upload-file-container">

      </div>
    </div>
  );
}

export default UploadFiles;