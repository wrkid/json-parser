import { useState } from "react"
import { ContextMenu } from "../Context-menu/menu"
import Structure from "../Structure/structure"

import './editor.css'

export const Editor = () => {
  const [value, setValue] = useState('{"name": "ordersListView"}')
  const [menu, setMenu] = useState(false)
  const [error, setError] = useState({value: false, title: ''})

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

  const saveHandler = (name) => {
    let prev = null
    let new_
    const item = {[name]: value}
    try {
      prev = JSON.parse(localStorage.getItem('jsons'))
      const isIndex = !!prev[name]
      if (isIndex) {
        setError({value: true, title: ''})
        return
      } else {
        new_ = {...prev, ...item}
      }
    } catch {
      new_ = {...item}
    }
    localStorage.setItem('jsons', JSON.stringify(new_))
  }

  const menuHandler = (type) => {
    setMenu(type)
  }

  return (
    <div>
      <ContextMenu shown={!!menu} menuHandler={menuHandler} saveHandler={saveHandler} type={menu} setSaved={handleInput}/>
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
            <button onClick={(e) => menuHandler('choose', e)}>Menu</button>
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
  )
}