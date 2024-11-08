import './NavBar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';

const NavBar = ({language, onColorChange, onLanguageChange}) => {
  const handleColorChange = (id) => {
    let primary, secondary, text;
    switch (id) {
        case 'buttonBlau':
            primary = '#6F00FF';
            secondary = '#6F00FF';
            text = '#FFFFFF';
            break;
        case 'buttonBunt':
            primary = '#0000ff';
            secondary = '#00ff00';
            text = '#ff0000';
            break;
        default:
            primary = '#000000';
            secondary = '#000000';
            text = '#ffffff';
    }
    onColorChange(primary, secondary, text);
  };

  const handleLanguageChange = (id) => {
    let newLanguage;
    switch (id) {
      case 'buttonEnglisch':
          newLanguage = 'Englisch';
          break;
      case 'buttonSpanisch':
        newLanguage = 'Spanisch';
        break;
      default:
          newLanguage = 'Deutsch';
  }
    onLanguageChange(newLanguage);  
  };

  return (
    <nav className="navbar navbar-expand-sm txt-color bg-color">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">
            {
                    language === 'Deutsch' ? 'Wellenlänge' :
                    language === 'Englisch' ? 'Wavelength' :
                    language === 'Spanisch' ? 'Sintonía' :
                    'Wellenlänge'
            }
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav me-auto">
                <li className="nav-item item-color dropdown">
                  <button className="nav-link dropdown-toggle" id="navbarDropdownMenuLink1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {
                    language === 'Deutsch' ? 'Sprache' :
                    language === 'Englisch' ? 'Language' :
                    language === 'Spanisch' ? 'Idioma' :
                    'Sprache'
                    }
                  </button>
                  <ul className="dropdown-menu drop-item-color" aria-labelledby="navbarDropdownMenuLink1">
                    <li><button className="dropdown-item" id="buttonDeutsch" onClick={() => handleLanguageChange('buttonDeutsch')}>
                    {
                    language === 'Deutsch' ? 'Deutsch' :
                    language === 'Englisch' ? 'German' :
                    language === 'Spanisch' ? 'Alemán' :
                    'Deutsch'
                    }
                    </button></li>
                    <li><button className="dropdown-item" id="buttonEnglisch" onClick={() => handleLanguageChange('buttonEnglisch')}>
                    {
                    language === 'Deutsch' ? 'Englisch' :
                    language === 'Englisch' ? 'English' :
                    language === 'Spanisch' ? 'Inglés' :
                    'Englisch'
                    }
                    </button></li>
                    <li><button className="dropdown-item" id="buttonBinär" onClick={() => handleLanguageChange('buttonSpanisch')}>
                    {
                    language === 'Deutsch' ? 'Spanisch' :
                    language === 'Englisch' ? 'Spanish' :
                    language === 'Spanisch' ? 'Espanol' :
                    'Spanisch'
                    }
                    </button></li>
                  </ul>
                </li>
                <li className="nav-item item-color dropdown">
                  <button className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {
                    language === 'Deutsch' ? 'Farbe' :
                    language === 'Englisch' ? 'Color' :
                    language === 'Spanisch' ? 'Color' :
                    'Farbe'
                  }
                  </button>
                  <ul className="dropdown-menu drop-item-color" aria-labelledby="navbarDropdownMenuLink2">
                    <li><button className="dropdown-item" id="buttonSchwarz" onClick={() => handleColorChange('buttonSchwarz')}>
                    {
                    language === 'Deutsch' ? 'Schwarz' :
                    language === 'Englisch' ? 'Black' :
                    language === 'Spanisch' ? 'Negro' :
                    'Schwarz'
                    }
                    </button></li>
                    <li><button className="dropdown-item" id="buttonBlau" onClick={() => handleColorChange('buttonBlau')}>
                    {
                    language === 'Deutsch' ? 'Blau' :
                    language === 'Englisch' ? 'Blue' :
                    language === 'Spanisch' ? 'Azul' :
                    'Blau'
                    }
                    </button></li>
                    <li><button className="dropdown-item" id="buttonBunt" onClick={() => handleColorChange('buttonBunt')}>
                    {
                    language === 'Deutsch' ? 'Bunt' :
                    language === 'Englisch' ? 'Rainbow' :
                    language === 'Spanisch' ? 'Multicolor' :
                    'Bunt'
                    }
                    </button></li>
                  </ul>
                </li>
                <li className="nav-item">
                <a className="nav-link item-color" href=""><i className="fa-brands fa-instagram" aria-label="Instagram"></i></a>
                </li>
                <li className="nav-item">
                <a className="nav-link item-color" href=""><i className="fa-brands fa-facebook" aria-label="Facebook"></i></a>
                </li>
                <li className="nav-item">
                <a className="nav-link item-color" href=""><i className="fa-brands fa-x-twitter" aria-label="X-Twitter"></i></a>
                </li>
            </ul>
            <form className="d-flex">
                <input className="form-control me-2" type="text" placeholder={
                    language === 'Deutsch' ? 'Suche' :
                    language === 'Englisch' ? 'Search' :
                    language === 'Spanisch' ? 'Busca' :
                    'Suche'
                    }
                />
                <button className="btn btn-color" type="button">
                <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
            </div>
        </div>
    </nav>
  );
};

export default NavBar;