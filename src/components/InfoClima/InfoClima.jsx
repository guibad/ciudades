import React from 'react'
import './InfoClima.css';

export const InfoClima = (props) => {
    let infoClima = props.datos;

    return (
        <div className='geo-container'>
            {JSON.stringify(infoClima)}
        </div>
    )
}
