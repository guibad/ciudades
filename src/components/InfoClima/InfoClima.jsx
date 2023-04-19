import React, { useContext, useEffect, useState } from 'react'
import { InfoPoliticaContext } from '../../context/InfoPoliticaContext';
import { useFetchClima } from '../../services/useFetchClima';
import './InfoClima.css';

export const InfoClima = () => {
    const { infoPolitica } = useContext(InfoPoliticaContext);
    let latitud = infoPolitica.places[0].latitude;
    let longitud = infoPolitica.places[0].longitude;
    let { infoClima } = useFetchClima(latitud, longitud);

    return (
        <div className='geo-container'>
            {JSON.stringify(infoClima)}
        </div>
    )
}
