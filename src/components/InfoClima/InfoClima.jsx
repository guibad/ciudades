import React, { useContext, useEffect, useState } from 'react'
import { InfoHistorialContext } from '../../context/InfoHistorialContext';
import { useFetchClima } from '../../services/useFetchClima';
import './InfoClima.css';

export const InfoClima = () => {
    const { infoPolitica } = useContext(InfoHistorialContext);
    let latitud = infoPolitica.places[0].latitude;
    let longitud = infoPolitica.places[0].longitude;
    let { infoClima, loading } = useFetchClima(latitud, longitud);

    if (!loading) {
        let temperaturas = infoClima.hourly.temperature_2m;
        let horas = infoClima.hourly.time;
        console.log('temperaturas.length :>> ', temperaturas.length);
        console.log('horas.length :>> ', horas);

        return (
            <div className='clima-container'>
                <div className="chart">
                    <div className="y-axis">
                        <span>100</span>
                        <span>75</span>
                        <span>50</span>
                        <span>25</span>
                        <span className="axis-label">Medida</span>
                    </div>
                    <div className="bars">
                        {
                            horas.map((item, index) => {
                                return (
                                    <div className="bar" style={{ height: temperaturas[index] + "%" }} key={index}>
                                        <span>{temperaturas[index]}</span>
                                    </div>
                                )
                            })
                        }
                        {/* <div className="bar" style={{ height: "75%" }}>
                            <span>Valor 2</span>
                        </div>
                        <div className="bar" style={{ height: "25%" }}>
                            <span>Valor 3</span>
                        </div>
                        <div className="bar" style={{ height: "60%" }}>
                            <span>Valor 4</span>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>Cargando...</div>
        )
    }

}
