import { useContext, useEffect, useState } from 'react'
import { InfoHistorialContext } from '../context/InfoHistorialContext';
import { useFetchGen } from './useFetchGen';

export const useFetchPolitica = (cp) => {
    const { infoPolitica, setInfoPolitica, historial, setHistorial } = useContext(InfoHistorialContext);
    const { loading, error, data } = useFetchGen(`https://api.zippopotam.us/es/${cp}`);
    const [loading1, setLoading1] = useState(true)

    useEffect(() => {
        (async () => {
            if (cp.slice(0, 2) === "35") {  // Sin esta linea no se puede hacer fetch a los CP de Canarias porque la API no devuelve la latitud y longitud correcta
                data.places[0].latitude = 28.1;
                data.places[0].longitude = -15.5;
            }
            setInfoPolitica(data)
            if (Object.keys(data).length === 0) return;
            else {
                setHistorial([{ "cp": cp, "ciudad": data.places[0]["place name"], "comunidad": data.places[0].state }, ...historial,]);
            }
            setLoading1(false);
        })()
        console.log('loading :>> ', loading);
    }, [cp, data])

    return { infoPolitica, loading1, error }
}
