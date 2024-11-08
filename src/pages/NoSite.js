import './NoSite.css';
import React from 'react';

const NoSite = ({language}) => {
    return (
        <div class="d-flex justify-content-center align-items-center" style={{height: '65vh'}}>
            <div class="text-center item-color">
                <h1>
                {
                language === 'Deutsch' ? '404 - Seite nicht gefunden' :
                language === 'Englisch' ? '404 - Page Not Found' :
                language === 'Spanisch' ? '404 - Página No Encontrada' :
                '404 - Seite nicht gefunden'
                }
                </h1>
                <p>
                {
                language === 'Deutsch' ? 'Ups, da ist was schiefgegangen.' :
                language === 'Englisch' ? 'Oops! It seems like the page you\'re looking for doesn\'t exist.' :
                language === 'Spanisch' ? '¡Ups! Parece que la página que estás buscando no existe.' :
                'Ups, da ist was schiefgegangen.'
                }
                </p>
                <a id="backHome" href="/">
                {
                language === 'Deutsch' ? 'Zurück zur Homepage' :
                language === 'Englisch' ? 'Back to home' :
                language === 'Spanisch' ? 'A la página de inicio' :
                'Zurück zur Homepage'
                }
                </a>
            </div>
        </div>
    );
}

export default NoSite;
