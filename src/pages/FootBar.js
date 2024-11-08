import './FootBar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';

const Footer = ({language}) => {
  return (
    <div class="container-fluid">
        <footer class="py-3 my-4 item-color">
            <ul class="nav justify-content-center border-bottom pb-3 mb-3">
                <li class="nav-item"><a href="/" class="nav-link px-2 text-muted">Home</a></li>
                <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">
                {
                language === 'Deutsch' ? 'Kontakt' :
                language === 'Englisch' ? 'Contact' :
                language === 'Spanisch' ? 'Contacto' :
                'Kontakt'
                }
                </a></li>
                <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Impressum</a></li>
                <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">
                {
                language === 'Deutsch' ? 'Hilfe' :
                language === 'Englisch' ? 'Help' :
                language === 'Spanisch' ? 'Ayuda' :
                'Hilfe'
                }
                </a></li>
                <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">
                {
                language === 'Deutsch' ? 'Über Uns' :
                language === 'Englisch' ? 'About Us' :
                language === 'Spanisch' ? 'Sobre Nosotros' :
                'Über Uns'
                }
                </a></li>
            </ul>
            <p class="text-center text-muted">© 2024, Tom Feldhausen</p>
        </footer>
    </div>
  );
};

export default Footer;