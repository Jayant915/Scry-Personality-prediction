import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About  from './components/About';
import Upload from './components/Upload';
import Footer from './components/Footer';
import Home from './components/Home';
import Ocr from './components/ocr';
import NotFoundPage from './components/404page';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-darker text-light">
        <Navbar />
          <div className="flex-1 ">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/ocr" element={<Ocr />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
       <Footer />
      </div>
    </Router>
        
  );
}

export default App;