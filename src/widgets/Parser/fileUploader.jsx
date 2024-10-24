import React from 'react';

import './parser.css';

const FileUploader = ({ onFileChange }) => (
  <div className="file-upload-container">
    <label htmlFor="file-upload" className="custom-file-upload">
      Выберите Excel файл
    </label>
    <input
      id="file-upload"
      className="input_btn"
      type="file"
      accept=".xlsx, .xls"
      onChange={onFileChange}
    />
  </div>
);

export default FileUploader;