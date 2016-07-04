import React from 'react';
import FILE_UPLOAD from './UploadActions';

const UploadFile = (dispatch) => {
  return (
    <div>
      <input type="file" className="fileinput" id="fileinput" onClick={() => {
        const file = 'Its your name';
        dispatch( {type: FILE_UPLOAD, data: file});
      }}/>
    </div>
  );
};

export default UploadFile;
