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
        <div key={index} style={{ marginLeft: marginLeft }}>
          {renderValue(item, path.concat(index))}
          {index !== val.length - 1 && <div className="divider"></div>}
        </div>
      ));
    } else if (typeof val === "object") {
      return Object.entries(val).map(([key, value], index) => (
        <div key={index} style={{ marginLeft: marginLeft }}>
          <div
            onClick={() => {
              if (typeof value !== "string") {
                handleToggle(path.concat(key))
              }
            }}
            style={{ cursor: typeof value !== "string" ? "pointer" : "default" }}
          >
            {key}:
          </div>
          {expandedKeys.includes(path.concat(key).join(".")) && renderValue(value, path.concat(key))}
          {typeof value === "string" && (
            <div style={{ display: "flex", alignItems: "center" }}>
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
          style={{ marginLeft: marginLeft }}
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

export default Structure;