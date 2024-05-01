import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import {Auth} from './Auth';
import Home from './Home';

function App() {

  return (
    <Router>
      <div className="App">
        <h1>Firebase App</h1>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
