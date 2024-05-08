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

  return (
    <div className="App">
      <div className="top">
        <div className="left">
          <Structure value={value} onChange={handleInputChange}>

          </Structure>
        </div>
        <div className="right">
          <textarea className="input-json" onChange={handleInput} value={value}></textarea>
        </div>
      </div>
    </div>
  );
}

export default App;

