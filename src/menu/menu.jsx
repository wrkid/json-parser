import { useState } from 'react'
import './menu.css'

export const ContextMenu = ({shown, type, menuHandler, saveHandler, setSaved}) => {
  const [input, setInput] = useState('');

  const handleMenuClick = (e) => {
    e.stopPropagation();
  };

  const handleInputOnChange = (e) => {
    const v = e.currentTarget.value 
    setInput(v)
  }
  
  const handleSet = (v) => {
    setSaved(v)
  }

  const renderSaved = () => {
    const ls = JSON.parse(window.localStorage.getItem('jsons'))
    if (ls) {
      return Object.keys(ls).map((key, i) => {
        return (
          <div
            key={key} 
            className='saved-item'
            onClick={() => handleSet({target: {value: ls[key]}})}
          >{key}</div>
        )
      })
    } else {
      return (
        <div>No JSONS saved</div>
      )
    }
  }

  return (
    <div className={`${shown ? 'bg' : 'bg-hide'}`} onClick={() => menuHandler(false)}>
      {/* SET */}
      {type === 'set' && <div className='menu-conatiner' onClick={handleMenuClick}>
        <h3 className='menu-title'>Save json</h3>
        <input 
          className='input-name' 
          placeholder='Type name' 
          value={input}
          onChange={handleInputOnChange}
        />
        <button 
          className='set-btn'
          onClick={() => saveHandler(input)}
        >Save</button>
      </div>}
      {/* CHOOSE */}
      {type === 'choose' && <div className='menu-conatiner' onClick={handleMenuClick}>
        <h3 className='menu-title'>Choose saved</h3>
        {renderSaved()}
      </div>}
    </div>
  )
}