import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Login from './Components/Form/Login';
import List from './Components/Listing/List';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path='' element={<Login/>} />
        <Route exact path='/list' element={<List/>} />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
