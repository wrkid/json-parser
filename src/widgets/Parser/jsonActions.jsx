import React from 'react';

import './parser.css';

const JsonActions = ({ onCopy, onDownload }) => (
  <div className="buttons">
    <button className="save_json_btn" onClick={onCopy}>
      Скопировать JSON
    </button>
    <button className="save_json_btn" onClick={onDownload}>
      Скачать JSON
    </button>
  </div>
);

export default JsonActions;