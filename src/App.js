import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import NoSite from './pages/NoSite';
import NavBar from './pages/NavBar';
import Footer from './pages/FootBar';
import SelectMovies from './pages/SelectMovies';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const App = () => {
    const [primaryColor, setPrimaryColor] = useState('#6F00FF');
    const [secondaryColor, setSecondaryColor] = useState('#6F00FF');
    const [textColor, setTextColor] = useState('#000000');
    const [language, setLanguage] = useState('Deutsch');
    const [user, setUser] = useState(null);

    const handleColorChange = (primary, secondary, text) => {
        setPrimaryColor(primary);
        setSecondaryColor(secondary);
        setTextColor(text);
    };
    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
    }

    useEffect(() => {
      document.documentElement.style.setProperty('--primary-color', primaryColor);
      document.documentElement.style.setProperty('--secondary-color', secondaryColor);
      document.documentElement.style.setProperty('--text-color', textColor);
    }, [primaryColor, secondaryColor, textColor]);

    return (
        <div className="App">
            <Router>
                <NavBar onColorChange={handleColorChange} onLanguageChange={handleLanguageChange} language={language} /> 
                <Routes>
                    <Route exact path="/" element={<SelectMovies user={user} language={language} />} />
                    <Route path="*" element={<NoSite language={language} />} />
                </Routes>
                <Footer language={language} />
            </Router>
        </div>
    );
}

export default App;