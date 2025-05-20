import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import FoodList from './pages/FoodList';
import Recommendation from './pages/Recommendation';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/food-list" element={<FoodList />} />
            <Route path="/recommendation" element={<Recommendation />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;