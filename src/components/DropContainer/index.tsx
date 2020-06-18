import React from 'react';
import { DropzoneRootProps } from 'react-dropzone';

import './styles.scss';

interface IProps {
  rootProps: DropzoneRootProps;
  isDragActive: boolean;
  isDragReject: boolean;
}

const DropContainer: React.FC<IProps> = (props) => {
  const { rootProps, isDragActive, isDragReject, children } = props;

  return(
    <div {...rootProps} className={`drop-container ${isDragActive ? "drag-active" : "" } ${isDragReject ? "drag-reject" : "" }`}>
      { children }
    </div>
  );
}

export default DropContainer;