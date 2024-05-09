import { useState } from "react";
import Structure from "../Structure/structure";
import './App.css'
import { ContextMenu } from "../menu/menu";

function App() {
  const [value, setValue] = useState('{"name": "ordersListView"}')
  const [menu, setMenu] = useState(false)

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

  const saveHandler = (name, value) => {
    const prev = JSON.parse(localStorage.getItem('jsons'))
    const item = {name: value}
    let new_
    if (prev) {
      !prev.find(el => el.name === name) ? new_ = [...prev, item] : new_ = [...prev, item]
    } else {
      new_ = [item]
    }
    localStorage.setItem('jsons', new_)
  }

  const menuHandler = (type) => {
    setMenu(type)
  }

  return (
    <div className="App">
      <ContextMenu shown={!!menu} menuHandler={menuHandler} saveHandler={saveHandler} type={menu}/>
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
            <div className="title">Type JSON here</div>
            <button onClick={() => menuHandler('choose')}>Menu</button>
          </div>
          <div className="bottom">
            <textarea className="input-json" onChange={handleInput} value={value}></textarea>
            <div className="btns-container">
              <div className="btns btns-left">
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
                <div className="btns btns-right">
                  <button 
                    className="btn btn-save"
                    onClick={() => menuHandler('set')}
                  >Save</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

