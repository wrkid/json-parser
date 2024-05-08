import { useState, useEffect } from "react";
import './style.css'

const Structure = ({ value, onChange }) => {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [parsedValue, setParsedValue] = useState(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    try {
      const parsed = JSON.parse(value);
      setParsedValue(parsed);
      setIsValid(true)
    } catch (error) {
      console.error("Ошибка разбора JSON:", error);
      setIsValid(false)
    }
  }, [value]);

  const isFinishValue = (val) => {
    const values = {
      'string': 1,
      'number': 1,
      'boolean': 1
    }

    return !!values[typeof val]
  }

  const handleToggle = (path) => {
    if (expandedKeys.includes(path.join("."))) {
      setExpandedKeys(expandedKeys.filter((item) => item !== path.join(".")));
    } else {
      setExpandedKeys([...expandedKeys, path.join(".")]);
    }
  };

  const handleInputChange = (newValue, path) => {
    if (!parsedValue) return;

    const updatedValue = JSON.parse(JSON.stringify(parsedValue));

    let target = updatedValue;
    for (let i = 0; i < path.length - 1; i++) {
      target = target[path[i]];
    }
    target[path[path.length - 1]] = newValue;

    setParsedValue(updatedValue);

    if (typeof onChange === "function") {
      onChange(JSON.stringify(updatedValue));
    }
  };

  const renderValue = (val, path = []) => {
    if (!val) return null;

    const marginLeft = 10;

    if (Array.isArray(val)) {
      return val.map((item, index) => (
        <div key={index} style={{ marginLeft: marginLeft, display:  isFinishValue(item) ? 'flex' : 'block', marginBottom: isFinishValue(value) ? '5px' : '0' }}>
          {renderValue(item, path.concat(index))}
          {!isFinishValue(item) && <div className="divider"></div>}
        </div>
      ));
    } else if (typeof val === "object") {
      return Object.entries(val).map(([key, value], index) => (
        <div key={index} style={{ marginLeft: marginLeft, display:  isFinishValue(value) ? 'flex' : 'block', justifyContent: 'space-between', marginBottom: '5px'}}>
          <div
            onClick={() => {
              if (!isFinishValue(value)) {
                handleToggle(path.concat(key))
              }
            }}
            className={!isFinishValue(value) ? 'structure' : 'value'}
          >
            {key}:{!isFinishValue(value) && <ExtraText value={'(click to show more)'}/>}
          </div>
          {expandedKeys.includes(path.concat(key).join(".")) && renderValue(value, path.concat(key))}
          {isFinishValue(value) && (
            <div style={{ display: "flex", alignItems: "center"}}>
              <input
                type="text"
                value={value}
                onChange={(e) => handleInputChange(e.target.value, path.concat(key))}
                style={{ marginLeft: 10 }}
              />
            </div>
          )}
        </div>
      ));
    } else {
      return (
        <input
          type="text"
          value={val}
          onChange={(e) => handleInputChange(e.target.value, path)}
          style={{ marginLeft: marginLeft, display: 'flex', flex: '1 1 auto' }}
        />
      );
    }
  };

  return (
    <div>
      {isValid && renderValue(parsedValue, [])}
      {!isValid && <div>Невалидный JSON</div>}
    </div>
  );
};

const ExtraText = ({value}) => {
  return (
    <div className="extra">
      {value}
    </div>
  )
}

export default Structure;