import './App.css';
import Header from '../Components/Header';
import Home from '../Components/Home';
import Sidebar from '../Components/Navbar';
import Employees from '../Components/Employees';
import Settings from '../Components/Settings';
import Analytics from '../Components/Analytics';
import Projects from '../Components/Projects';
import AIAssistant from '../Components/AIAssistant';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />

          <main className="p-6 flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
            <AIAssistant />
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;