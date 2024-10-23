import './App.css'
import { Navigate, Route, Routes } from 'react-router';
import { Navigation } from '../Navigation';
import { Editor } from '../Editor';
import { Parser } from '../Parser';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path='/editor' element={<Editor />}/>
        <Route path='/parser' element={<Parser />}/>
        <Route path='*' element={<Navigate to={'/parser'} />}/>
      </Routes>
    </div>
  );
}

export default App;

