import React, { useContext } from 'react'
import './InfoGeo.css';
import banderas from '../../config/banderas.json';
import { InfoPoliticaContext } from '../../context/InfoPoliticaContext';

export const InfoGeo = (props) => {
    const { infoPolitica } = useContext(InfoPoliticaContext);
    console.log('infoPoliticaCONTEXT :>> ', infoPolitica);
    let abbreviation = infoPolitica.places[0]["state abbreviation"];
    console.log('abbreviation :>> ', abbreviation);
    let latitud = infoPolitica.places[0].latitude;
    let longitud = infoPolitica.places[0].longitude;

    const onlickHandler = () => {
        window.open(`https://www.google.com/maps/@${latitud},${longitud},14z`, '_blank');
    }


    return (
        <div className='geo-container'>
            <div className="texto">
                <p><b>Latitud:</b> {latitud}</p>
                <p><b>Longitud:</b> {longitud}</p>
            </div>
            <div className='icono-mapa' onClick={onlickHandler}>
                <img src={'/assets/img/mapa.png'} alt={banderas[`${abbreviation}`].alt} />
                <p>Ver mapa</p>
            </div>
        </div>
    )
}
