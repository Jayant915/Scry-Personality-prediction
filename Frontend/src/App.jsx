import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from "react";

import Navbar from './components/Navbar';
import About from './components/About';
import Upload from './components/Upload';
import Footer from './components/Footer';
import Home from './components/Home';
import Ocr from './components/ocr';
import NotFoundPage from './components/404page';
import Dashboard from "./components/Dashboard";

function App() {
  const [history, setHistory] = useState([]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-darker text-light">
        
        <Navbar />

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            
            {/* Pass history to Upload */}
            <Route 
              path="/upload" 
              element={<Upload history={history} setHistory={setHistory} />} 
            />

            <Route path="/ocr" element={<Ocr />} />

            {/* Pass history to Dashboard */}
            <Route 
              path="/dashboard" 
              element={<Dashboard history={history} />} 
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;