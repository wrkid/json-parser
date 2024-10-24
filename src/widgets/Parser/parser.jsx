import { useState } from 'react';
import * as XLSX from 'xlsx';
import './parser.css';

import FileUploader from './fileUploader';
import OsSwitcher from './osSwitcher';
import JsonActions from './jsonActions';
import JsonDisplay from './jsonDisplay';

import { levellAllMarket, levelMediumMarket, levelTopMarket, toSortByCategories } from '../../utils/helpers';

const markets = {
  title: 'Выберите магазин и платите частями',
  subtitle: 'А потом возвращайтесь в приложение и управляйте оплатой',
  levelTop: [],
  levelMedium: [],
  levelAll: []
};

export const Parser = () => {
  const [jsonData, setJsonData] = useState(null);
  const [file, setFile] = useState(null);
  const [osType, setOsType] = useState('web');

  const sortLevelTop = (array = []) => {
    if (!Array.isArray(array)) {
      return [];
    }
    return array.map(el => levelTopMarket(el, osType));
  };

  const sortLevelMedium = (array = []) => {
    const levelMedium = [];
    const categories = array.filter(el => (el.category === 'Бытовая техника' || el.category === 'Одежда и обувь'));

    categories.forEach((category) => {
      const categoryMarkets = category.markets.map((market) => levelMediumMarket(market, osType));
      levelMedium.push({ category: category.category, markets: categoryMarkets });
    });

    return levelMedium;
  };

  const sortLevelAll = (categories = []) => {
    const levelAll = [];

    categories.forEach((category) => {
      const categoryMarkets = category.markets.map((market) => levellAllMarket(market, osType));
      levelAll.push({ category: category.category, markets: categoryMarkets });
    });

    return levelAll;
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

      const levelTop = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
      const levelAll = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[1]]);

      if (!Array.isArray(levelTop) || !Array.isArray(levelAll)) {
        return;
      }

      const sortedCategories = toSortByCategories(levelAll);

      const jsonLevelTop = sortLevelTop(levelTop);
      const jsonLevelMedium = sortLevelMedium(sortedCategories);
      const jsonLevelAll = sortLevelAll(sortedCategories);

      let newJson = osType === 'web'
        ? { ...markets, levelTop: jsonLevelTop, levelAll: jsonLevelAll }
        : { ...markets, levelTop: jsonLevelTop, levelMedium: jsonLevelMedium, levelAll: jsonLevelAll };

      if (osType === 'web') delete newJson.levelMedium;

      setJsonData(newJson);
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
    const fileName = osType === 'web' ? 'markets-web.json' : 'markets.json';
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
      <FileUploader onFileChange={handleFileChange} />
      {file && <OsSwitcher osType={osType} onSwitch={handleOsSwitch} onParse={parseFile} />}
      {jsonData && (
        <>
          <JsonActions jsonData={jsonData} onCopy={onCopyClickHandle} onDownload={onDownloadClickHandle} />
          <JsonDisplay jsonData={jsonData} />
        </>
      )}
    </div>
  );
};