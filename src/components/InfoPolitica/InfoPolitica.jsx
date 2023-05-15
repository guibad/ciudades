import React, { useContext } from 'react';
import './InfoPolitica.css';
import banderas from '../../config/banderas.json';
import { InfoHistorialContext } from '../../context/InfoHistorialContext';
import { IdiomaContext } from '../../context/IdiomaContext';
import idiomas from '../../config/idiomas.json';

export const InfoPolitica = () => {
    const { infoPolitica } = useContext(InfoHistorialContext);
    let abbreviation = infoPolitica.places[0]["state abbreviation"];
    const { idioma } = useContext(IdiomaContext);

    return (
        <div className='politica-container'>
            <img src={banderas[`${abbreviation}`].src} className="imagen" alt={banderas[`${abbreviation}`].alt} />
            <div className="texto">
                <p><b>{idiomas[idioma].BuscarPage.InfoPolitica.ciudad}:</b> {infoPolitica.places[0]["place name"]}</p>
                <p><b>{idiomas[idioma].BuscarPage.InfoPolitica.comunidad}:</b> {infoPolitica.places[0].state}</p>
            </div>
        </div>
    )
}
