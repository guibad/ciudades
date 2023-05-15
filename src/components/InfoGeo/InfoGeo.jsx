import React, { useContext } from 'react'
import './InfoGeo.css';
import banderas from '../../config/banderas.json';
import { InfoHistorialContext } from '../../context/InfoHistorialContext';
import { IdiomaContext } from '../../context/IdiomaContext';
import idiomas from '../../config/idiomas.json';

export const InfoGeo = (props) => {
    const { infoPolitica } = useContext(InfoHistorialContext);
    let abbreviation = infoPolitica.places[0]["state abbreviation"];
    let latitud = infoPolitica.places[0].latitude;
    let longitud = infoPolitica.places[0].longitude;
    const { idioma } = useContext(IdiomaContext);

    const onlickHandler = () => {
        window.open(`https://www.google.com/maps/@${latitud},${longitud},14z`, '_blank');
    }

    return (
        <div className='geo-container'>
            <div className="texto">
                <p><b>{idiomas[idioma].BuscarPage.InfoGeo.latitud}:</b> {latitud}</p>
                <p><b>{idiomas[idioma].BuscarPage.InfoGeo.longitud}:</b> {longitud}</p>
            </div>
            <div className='icono-mapa' onClick={onlickHandler}>
                <img src={'/assets/img/mapa.png'} alt={banderas[`${abbreviation}`].alt} />
                <p>{idiomas[idioma].BuscarPage.InfoGeo.textoMapa}</p>
            </div>
        </div>
    )
}
