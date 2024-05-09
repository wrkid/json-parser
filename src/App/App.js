import { useState } from "react";
import Structure from "../Structure/structure";
import './App.css'

function App() {
  const [value, setValue] = useState('{"name": "ordersListView"}')

  const handleInput = (e) => {
    setValue(e.target.value)
  }

  const handleInputChange = (newValue) => {
    setValue(newValue);
  };

  const onCopyClickHandle = () => {
    navigator.clipboard.writeText(value)
  }

  const onClearClickHandle = () => {
    setValue('')
  }

  const onPasteClickHandle = () => {
    navigator.clipboard.readText()
      .then((text) => {
        setValue(text);
      })
      .catch((err) => {
        console.error('Ошибка при чтении текста из буфера обмена:', err);
      });
  }

  return (
    <div className="App">
      <div className="top">
        <div className="left">
          <div className="top">
            Edit form here
          </div>
          <div className="bottom">
            <Structure value={value} onChange={handleInputChange} />
            <div className="line"></div>
          </div>
        </div>
        <div className="right">
          <div className="top">
            <div className="com"></div>
            <div className="title">Type JSON here</div>
            <div className="btns">
              <button 
                className="btn btn-copy"
                onClick={onCopyClickHandle}
              >Copy</button>
              <button 
                className="btn btn-paste"
                onClick={onPasteClickHandle}
              >Paste</button>
              <button 
                className="btn btn-delete"
                onClick={onClearClickHandle}
              >Clear</button>
            </div>
          </div>
          <div className="bottom">
          <textarea className="input-json" onChange={handleInput} value={value}></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

