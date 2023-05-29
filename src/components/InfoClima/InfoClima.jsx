import React from 'react';
import { useFetchClima } from '../../services/useFetchClima';
import './InfoClima.css';

export const InfoClima = (props) => {
    const { infoPolitica } = props;
    let latitud = infoPolitica.places[0].latitude;
    let longitud = infoPolitica.places[0].longitude;
    let { infoClima, loading1, error } = useFetchClima(latitud, longitud);

    function encontrarMaximo(array) {
        return Math.max(...array);
    }

    if (error) {
        return <div>Error recuperando datos</div>
    } else if (!loading1) {
        let temperaturas = infoClima.hourly.temperature_2m;
        let horas = infoClima.hourly.time;
        const maximaTemperatura = parseInt(encontrarMaximo(temperaturas));

        return (
            <div className='clima-container'>
                <div className="chart">
                    <div className="y-axis">
                        <span>{maximaTemperatura + 2} ºC </span>
                        <span>{parseInt(maximaTemperatura / 2)} ºC</span>
                        <span>0 ºC</span>
                    </div>
                    <div className="bars">
                        {
                            horas.map((item, index) => {
                                const hora = item.substring(item.indexOf("T") + 1);
                                return (
                                    <div className="bar" style={{ height: temperaturas[index] * 100 / (maximaTemperatura + 2) + "%" }} key={index}>
                                        <span>{hora} ({parseInt(temperaturas[index])} ºC)</span>
                                    </div>
                                )
                            })
                        }
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
