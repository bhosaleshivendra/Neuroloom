import './App.css';
import Header from '../Components/Header';
import Home from '../Components/Home';
import Sidebar from '../Components/Navbar';
import Employees from '../Components/Employees';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Header />

          <main className="p-6 flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/employees" element={<Employees />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;