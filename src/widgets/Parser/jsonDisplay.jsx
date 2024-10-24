import React from 'react';

import './parser.css';

const JsonDisplay = ({ jsonData }) => (
  <div className="json-data-container">
    <h2>Parsed JSON Data:</h2>
    <pre>{JSON.stringify(jsonData, null, 2)}</pre>
  </div>
);

export default JsonDisplay;