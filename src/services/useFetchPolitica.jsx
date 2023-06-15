import { useContext, useEffect, useState } from 'react'
import { InfoHistorialContext } from '../context/InfoHistorialContext';
import { useFetch } from './useFetch';

export const useFetchPolitica = (cp) => {
    const { infoPolitica, setInfoPolitica, historial, setHistorial } = useContext(InfoHistorialContext);
    const { call, data, loading, error } = useFetch();
    const [loadingPolitica, setLoadingPolitica] = useState(true)

    useEffect(() => {
        call(`https://api.zippopotam.us/es/${cp}`)
    }, [cp]);

    useEffect(() => {
        if (error) {
            setLoadingPolitica(false)
            return
        } else if (data && data.places && !error) { // Verificar si data y data.places son definidos
            if (cp.slice(0, 2) === "35") {
                data.places[0].latitude = 28.1;
                data.places[0].longitude = -15.5;
            }
            setInfoPolitica(data);
            setHistorial([{ "cp": data["post code"], "ciudad": data.places[0]["place name"], "comunidad": data.places[0].state }, ...historial]);
            setLoadingPolitica(false);
        }
    }, [data, error])


    return { infoPolitica, loadingPolitica, error }
}