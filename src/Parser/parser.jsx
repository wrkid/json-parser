import { useState } from 'react';
import * as XLSX from 'xlsx';

import './parser.css';

const markets = {
  title: 'Выберите магазин и платите частями',
  subtitle: 'А потом возвращайтесь в приложение и управляйте оплатой',
  levelTop: [],
  levelAll: []
};

export const Parser = () => {
  const [jsonData, setJsonData] = useState(null);
  const [file, setFile] = useState(null);
  const [osType, setOsType] = useState('web');

  const sortLevelTop = (array = []) => {
    const levelTop = [];

    array.forEach((el) => {
      const market = {
        category: el.category ?? '',
        shop: el.shop ?? '',
        pictureFileName: el[`pictureFileName_${osType}`] ?? '',
        iconFileName: el.iconFileName ?? '',
        description: el.description ?? '',
        webLink: el[`webLink_${osType}`] ?? ''
      };

      levelTop.push(market);
    });

    return levelTop;
  };

  const sortLevelAll = (array = []) => {
    const categoriesMap = new Set();
    const levelAll = [];

    array.forEach((el) => categoriesMap.add(el.category));

    categoriesMap.forEach((category) => {
      const filteredMarketsByCategory = array.filter((market) => market.category === category);

      const categoryMarkets = [];

      filteredMarketsByCategory.forEach((el) => {
        const market = {
          category: el.category ?? '',
          shop: el.shop ?? '',
          iconFileName: el.iconFileName ?? '',
          bannerFileName: el.bannerFileName ?? '',
          webLink: el[`webLink_${osType}`] ?? '',
          description: el.description ?? ''
        };

        categoryMarkets.push(market);
      });

      levelAll.push({ category, markets: categoryMarkets });
    });

    return levelAll;
  };

  const sortLevelMiddle = (array = []) => {
    return array.filter(el => (el.category === 'Бытовая техника' || el.category === 'Одежда и обувь'));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setJsonData(null);
  };

  const parseFile = () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const levelTop = workbook.Sheets[workbook.SheetNames[0]];
      const levelAll = workbook.Sheets[workbook.SheetNames[1]];

      const jsonLevelTop = sortLevelTop(XLSX.utils.sheet_to_json(levelTop));
      const jsonLevelAll = sortLevelAll(XLSX.utils.sheet_to_json(levelAll));
      const jsonLevelMiddle = sortLevelMiddle(jsonLevelAll);

      setJsonData({ ...markets, levelTop: jsonLevelTop, levelMiddle: jsonLevelMiddle, levelAll: jsonLevelAll });
    };

    reader.readAsArrayBuffer(file);
  };

  const onCopyClickHandle = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
  };

  const handleOsSwitch = (type = 'web') => {
    setOsType(type);
    setJsonData(null);
  };

  const onDownloadClickHandle = () => {
    const fileName = 'markets.json';
    const json = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  return (
    <div className='container'>
      <h1>BNPL partners Excel to JSON Parser</h1>
      <div className="file-upload-container">
        1. Выберите Excel файл
        <label htmlFor="file-upload" className="custom-file-upload">
          Выбрать файл
        </label>
        <input 
          id="file-upload" 
          className="input_btn" 
          type="file" 
          accept=".xlsx, .xls" 
          onChange={handleFileChange} 
        />
      </div>

      {file && (
        <>
        2. Выберите тип приложения
          <div className="switcher">
            <button
              className={osType === 'web' ? 'switcher_btn switcher_btn-active' : 'switcher_btn'}
              onClick={() => handleOsSwitch('web')}
            >
              Web
            </button>
            <button
              className={osType === 'mobile' ? 'switcher_btn switcher_btn-active' : 'switcher_btn'}
              onClick={() => handleOsSwitch('mobile')}
            >
              Mobile
            </button>
          </div>
          <button className="parse-btn" onClick={parseFile}>
            Создать JSON
          </button>
        </>
      )}

      {jsonData && (
        <>
          <div className="buttons">
            <button className="save_json_btn" onClick={onCopyClickHandle}>
              Скопировать JSON
            </button>
            <button className="save_json_btn" onClick={onDownloadClickHandle}>
              Скачать JSON
            </button>
          </div>
          <div>
            <h2>Parsed JSON Data:</h2>
            <pre>{JSON.stringify(jsonData, null, 2)}</pre>
          </div>
        </>
      )}
    </div>
  );
};