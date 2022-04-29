import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './components/Login';
import './style.css';
import Invoice from './components/Invoice';
import Menu from './Menu'
import { useEffect } from 'react';
import NoPermission from './components/NoPermission';
import Logout from './components/Logout';

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/norole" element={<NoPermission />} />
            <Route path='*' element={<Menu />} />
          </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
