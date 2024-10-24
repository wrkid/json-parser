import React from 'react';

import './parser.css';


const OsSwitcher = ({ osType, onSwitch, onParse }) => (
  <div className="app-type-container">
    <p>Выберите тип приложения</p>
    <div className="switcher">
      <button
        className={osType === 'web' ? 'switcher_btn switcher_btn-active' : 'switcher_btn'}
        onClick={() => onSwitch('web')}
      >
        Web
      </button>
      <button
        className={osType === 'mobile' ? 'switcher_btn switcher_btn-active' : 'switcher_btn'}
        onClick={() => onSwitch('mobile')}
      >
        Mobile
      </button>
    </div>
    <button className="parse-btn" onClick={onParse}>
      Создать JSON
    </button>
  </div>
);

export default OsSwitcher;