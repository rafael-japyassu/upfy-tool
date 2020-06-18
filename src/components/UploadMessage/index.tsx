import React from 'react';

import './styles.scss';

interface IProps {
  message: string;
  type?: string;
}

const UploadMessage: React.FC<IProps> = (props) => {
  const { type = 'default', message } = props;
  return(
    <p className={`upload-message message-${type}`} > { message }</p>
  );
}

export default UploadMessage;