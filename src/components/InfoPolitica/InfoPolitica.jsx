import React, { useContext } from 'react';
import './InfoPolitica.css';
import banderas from '../../config/banderas.json';
import { InfoPoliticaContext } from '../../context/InfoPoliticaContext';

export const InfoPolitica = (props) => {
    const { infoPolitica } = useContext(InfoPoliticaContext);
    console.log('infoPoliticaCONTEXT :>> ', infoPolitica);
    let abbreviation = infoPolitica.places[0]["state abbreviation"];

    return (
        <div className='politica-container'>
            <img src={banderas[`${abbreviation}`].src} className="imagen" alt={banderas[`${abbreviation}`].alt} />
            <div className="texto">
                <p><b>Ciudad:</b> {infoPolitica.places[0]["place name"]}</p>
                <p><b>Comunidad:</b> {infoPolitica.places[0].state}</p>
            </div>
        </div>
    )
}
